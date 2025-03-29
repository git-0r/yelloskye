import { IMedia, IProject } from "@/app/types";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { X } from "lucide-react";
import { toast } from "sonner";
import { deleteFileReference } from "@/lib/firebase/firestore";
import { Dispatch, SetStateAction, useState } from "react";

interface IProps {
  image: IMedia;
  projectId?: string;
  setProject: Dispatch<SetStateAction<IProject | null>>;
}

export default function ImagePreview({ image, projectId, setProject }: IProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteFile = async (data: IMedia) => {
    setIsDeleting(true);
    try {
      await deleteFileReference(projectId, data);

      setProject((prev) =>
        !prev
          ? prev
          : {
              ...prev,
              media: prev.media?.filter(
                (item) => item.donwloadURL !== data.donwloadURL
              ),
            }
      );

      toast.success("File deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete the file.");
      console.log("Failed to delete the file. " + error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative m-2">
      <div className="w-[300px] border rounded-md">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={image.donwloadURL}
            alt={`Image preview ${image.metaData.name}`}
            fill
            sizes="300px"
            className="rounded-md object-cover"
            loading="lazy"
          />
        </AspectRatio>
      </div>
      {isDeleting && <p className="text-sm text-center my-1">Deleting...</p>}
      {image.isUploading && (
        <p className="text-sm text-center my-1">Uploading...</p>
      )}
      <button
        onClick={() => deleteFile(image)}
        className="absolute top-1 right-1 bg-white text-white rounded-full p-1 border"
        disabled={isDeleting}
      >
        <X stroke="#000" />
      </button>
    </div>
  );
}
