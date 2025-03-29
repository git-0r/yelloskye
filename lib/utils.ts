import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import projectsData from "@/lib/data/projects.json";
import { IProject } from "@/app/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProjectById(id: string) {
  if (!id) return null;
  return projectsData.filter((project) => project.id === id)[0];
}

export function getMediaOfType(type: string, project: IProject | null) {
  if (!project || !type) return [];

  return (
    project.media?.filter((file) =>
      file.metaData.contentType?.startsWith(type)
    ) ?? []
  );
}
