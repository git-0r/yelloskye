"use client";

import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

interface IProps {
  query: string;
  queryHandler: (value: string) => void;
}

export default function Search({ query, queryHandler }: IProps) {
  return (
    <div className="w-full md:w-10/12 lg:w-1/2 mx-auto relative">
      <Input
        type="text"
        placeholder="project name"
        value={query}
        onChange={(e) => queryHandler(e.target.value)}
        className="pr-8"
      />
      <SearchIcon className="absolute right-2 top-1 stroke-gray-500" />
    </div>
  );
}
