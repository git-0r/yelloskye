import { Dispatch, SetStateAction } from "react";
import AddProject from "./add-project";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { IProject } from "@/app/types";

interface IProps {
  query: string;
  queryHandler: (value: string) => void;
  setAllProjects: Dispatch<SetStateAction<IProject[]>>;
}

export default function Search({
  query,
  queryHandler,
  setAllProjects,
}: IProps) {
  return (
    <div className="w-full md:w-10/12 lg:w-1/2 mx-auto flex flex-row gap-2">
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="project name"
          value={query}
          onChange={(e) => queryHandler(e.target.value)}
          className="pr-8"
        />
        <SearchIcon className="absolute right-2 top-1 stroke-gray-500" />
      </div>
      <AddProject setAllProjects={setAllProjects} />
    </div>
  );
}
