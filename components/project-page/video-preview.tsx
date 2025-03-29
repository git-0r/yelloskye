import { IMedia, IProject } from "@/app/types";
import { Dispatch, SetStateAction, useState } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { X } from "lucide-react";
import { deleteFileReference } from "@/lib/firebase/firestore";
import { toast } from "sonner";

interface IProps {
  video: IMedia;
  projectId?: string;
  setProject: Dispatch<SetStateAction<IProject | null>>;
}

export default function VideoPreview({ video, projectId, setProject }: IProps) {
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
          <video controls className="w-full h-full">
            <source src={video.donwloadURL} />
            Your browser does not support the video tag.
          </video>
        </AspectRatio>
      </div>
      {isDeleting && <p className="text-sm text-center my-1">Deleting...</p>}
      {video.isUploading && (
        <p className="text-sm text-center my-1">Uploading...</p>
      )}
      <button
        onClick={() => deleteFile(video)}
        className="absolute top-1 right-1 bg-white text-white rounded-full p-1 border"
        disabled={isDeleting}
      >
        <X stroke="#000" />
      </button>
    </div>
  );
}
