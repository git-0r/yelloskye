"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Loader2 } from "lucide-react";
import withAuth from "@/components/with-auth";
import Link from "next/link";
import { IProject } from "@/app/types";
import { getProjectById } from "@/lib/firebase/firestore";
import ImageTab from "@/components/project-page/image-tab";
import VideoTab from "@/components/project-page/video-tab";
import { updateProjectMedia } from "@/lib/firebase/storage";
import { toast } from "sonner";

function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<IProject | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProjectById(params.id)
      .then((project) => {
        setProject(project);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch project details.");
      })
      .finally(() => setIsLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadFile = async (file: File) => {
    try {
      // add placeholder when uploading
      setProject((prev) =>
        !prev
          ? prev
          : {
              ...prev,
              media: [
                ...(prev.media ?? []),
                {
                  donwloadURL: "/images/placeholder.png",
                  metaData: {
                    size: 0,
                    contentType: file.type,
                    name: encodeURIComponent(file.name) + "placeholder",
                  },
                  isUploading: true,
                },
              ],
            }
      );
      const result = await updateProjectMedia(project?.id, file);
      setProject((prev) =>
        !prev ? prev : { ...prev, media: [...(prev.media ?? []), result] }
      );
      toast.success("File uploaded successfully.");
    } catch (error) {
      toast.error("File upload failed.");
      console.log("File upload failed. " + error);
    } finally {
      // remove placeholder after uploading
      setProject((prev) =>
        !prev
          ? prev
          : {
              ...prev,
              media: prev.media?.filter(
                (item) =>
                  item.metaData.name !==
                  encodeURIComponent(file.name) + "placeholder"
              ),
            }
      );
    }
  };

  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center gap-4">
        <Loader2 className="animate-spin" />
        Loading...
      </div>
    );

  if (!isLoading && !project) return null;

  return (
    <main className="space-y-4 px-8">
      <Link href="/" className="flex items-center gap-4">
        <ArrowLeft className="stroke-1" /> <p>All projects</p>
      </Link>
      <h1 className="text-2xl font-bold">{project?.title}</h1>
      <Tabs defaultValue="images" className="w-full">
        <TabsList>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        <ImageTab
          project={project}
          uploadFile={uploadFile}
          setProject={setProject}
        />
        <VideoTab
          project={project}
          uploadFile={uploadFile}
          setProject={setProject}
        />
      </Tabs>
    </main>
  );
}

export default withAuth(ProjectPage);
