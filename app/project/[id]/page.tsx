"use client";

import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { ArrowLeft, X } from "lucide-react";
import withAuth from "@/components/with-auth";
import Link from "next/link";
import { getProjectById } from "@/lib/utils";
import { IProject } from "@/app/types";

function ProjectPage({ params }: { params: { id: string } }) {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const [project] = useState<IProject | null>(getProjectById(params.id));

  // Cleanup previews when component is unmounted
  useEffect(() => {
    return () => {
      // Clean up URLs to avoid memory leaks
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
      videoPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle image file drop
  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } =
    useDropzone({
      accept: { "image/*": [] },
      multiple: true,
      onDrop: (acceptedFiles) => {
        const imageUrls = acceptedFiles.map((file) =>
          URL.createObjectURL(file)
        );
        setImagePreviews((prev) => [...prev, ...imageUrls]);
      },
    });

  // Handle video file drop
  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } =
    useDropzone({
      accept: { "video/*": [] },
      multiple: true,
      onDrop: (acceptedFiles) => {
        const videoUrls = acceptedFiles.map((file) =>
          URL.createObjectURL(file)
        );
        setVideoPreviews((prev) => [...prev, ...videoUrls]);
      },
    });

  // Remove individual image preview
  const removeImagePreview = (previewUrl: string) => {
    setImagePreviews((prev) => prev.filter((url) => url !== previewUrl));
    URL.revokeObjectURL(previewUrl); // Revoke object URL to free memory
  };

  // Remove individual video preview
  const removeVideoPreview = (previewUrl: string) => {
    setVideoPreviews((prev) => prev.filter((url) => url !== previewUrl));
    URL.revokeObjectURL(previewUrl); // Revoke object URL to free memory
  };

  return (
    <main className="space-y-4">
      <Link href="/" className="flex items-center gap-4">
        <ArrowLeft className="stroke-1" /> <p>All projects</p>
      </Link>
      <h1 className="text-2xl font-bold">{project?.title}</h1>
      <Tabs defaultValue="images" className="w-full">
        <TabsList>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>

        <TabsContent value="images">
          <div
            {...getImageRootProps()}
            className="border-dashed border-2 p-6 text-center"
          >
            <input {...getImageInputProps()} />
            <p>Drag & Drop images or click to select</p>
          </div>
          <div className="mt-4 flex flex-wrap justify-start">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative m-2">
                <div className="w-[300px] border rounded-md">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={preview}
                      alt={`Image preview ${index}`}
                      fill
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </div>

                <button
                  onClick={() => removeImagePreview(preview)}
                  className="absolute top-1 right-1 bg-white text-white rounded-full p-1 border"
                >
                  <X stroke="#000" />
                </button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos">
          <div
            {...getVideoRootProps()}
            className="border-dashed border-2 p-6 text-center"
          >
            <input {...getVideoInputProps()} />
            <p>Drag & Drop videos or click to select</p>
          </div>
          <div className="mt-4 flex flex-wrap justify-start">
            {videoPreviews.map((preview, index) => (
              <div key={index} className="relative m-2">
                <div className="w-[300px] border rounded-md">
                  <AspectRatio ratio={16 / 9}>
                    <video controls className="w-full h-full">
                      <source src={preview} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </AspectRatio>
                </div>

                <button
                  onClick={() => removeVideoPreview(preview)}
                  className="absolute top-1 right-1 bg-white text-white rounded-full p-1 border"
                >
                  <X stroke="#000" />
                </button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default withAuth(ProjectPage);
