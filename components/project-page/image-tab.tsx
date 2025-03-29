import { TabsContent } from "../ui/tabs";
import { useDropzone } from "react-dropzone";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IMedia, IProject } from "@/app/types";
import { getMediaOfType } from "@/lib/utils";
import ImagePreview from "./image-preview";

interface IProps {
  project: IProject | null;
  uploadFile: (file: File) => Promise<void>;
  setProject: Dispatch<SetStateAction<IProject | null>>;
}

export default function ImageTab({ project, uploadFile, setProject }: IProps) {
  const [imagePreviews, setImagePreviews] = useState<IMedia[]>([]);

  useEffect(() => {
    setImagePreviews(getMediaOfType("image", project));
  }, [project]);

  // Handle image file drop
  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } =
    useDropzone({
      accept: { "image/*": [] },
      multiple: false,
      onDrop: async (acceptedFiles) => uploadFile(acceptedFiles[0]),
    });

  return (
    <TabsContent value="images">
      <div
        {...getImageRootProps()}
        className="border-dashed border-2 p-6 text-center"
      >
        <input {...getImageInputProps()} />
        <p>Drag & Drop images or click to select</p>
      </div>
      <div className="mt-4 flex flex-wrap justify-start">
        {imagePreviews.map((image, idx) => (
          <ImagePreview
            key={image.metaData.name + idx}
            image={image}
            projectId={project?.id}
            setProject={setProject}
          />
        ))}
      </div>
    </TabsContent>
  );
}
