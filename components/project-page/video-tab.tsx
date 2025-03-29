import { TabsContent } from "../ui/tabs";
import { useDropzone } from "react-dropzone";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IMedia, IProject } from "@/app/types";
import { getMediaOfType } from "@/lib/utils";
import VideoPreview from "./video-preview";

interface IProps {
  project: IProject | null;
  uploadFile: (file: File) => Promise<void>;
  setProject: Dispatch<SetStateAction<IProject | null>>;
}

export default function VideoTab({ project, uploadFile, setProject }: IProps) {
  const [videoPreviews, setVideoPreviews] = useState<IMedia[]>([]);

  useEffect(() => {
    setVideoPreviews(getMediaOfType("video", project));
  }, [project]);

  // Handle video file drop
  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } =
    useDropzone({
      accept: { "video/*": [] },
      multiple: false,
      onDrop: async (acceptedFiles) => uploadFile(acceptedFiles[0]),
    });

  return (
    <TabsContent value="videos">
      <div
        {...getVideoRootProps()}
        className="border-dashed border-2 p-6 text-center"
      >
        <input {...getVideoInputProps()} />
        <p>Drag & Drop videos or click to select</p>
      </div>
      <div className="mt-4 flex flex-wrap justify-start">
        {videoPreviews.map((video, idx) => (
          <VideoPreview
            key={video.metaData.name + idx}
            video={video}
            projectId={project?.id}
            setProject={setProject}
          />
        ))}
      </div>
    </TabsContent>
  );
}
