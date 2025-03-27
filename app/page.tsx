"use client";

import WithAuth from "@/components/with-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LocateFixedIcon } from "lucide-react";
import projectsData from "@/lib/data/projects.json";
import { useEffect, useState } from "react";
import Image from "next/image";
import Search from "@/components/search";
import Link from "next/link";

function Home() {
  const [projects, setProjects] = useState(projectsData);
  // this can be optimized by debouncing
  const [query, setQuery] = useState("");

  const queryHandler = (value: string) => {
    setQuery(value.toLowerCase());
  };

  useEffect(() => {
    const filteredProjects = projectsData.filter((project) =>
      project.title.toLowerCase().includes(query)
    );
    setProjects(filteredProjects);
  }, [query]);

  return (
    <main className="space-y-8 px-8">
      <Search query={query} queryHandler={queryHandler} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4">
        {projects.map((project) => (
          <Project key={project.id} data={project} />
        ))}
      </div>
      {projects.length === 0 && (
        <p className="text-center text-xl text-slate-500 my-8">
          No projects available.
        </p>
      )}
    </main>
  );
}

function Project({ data }: { data: (typeof projectsData)[0] }) {
  return (
    <Link href={"/project/" + data.id}>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>{data.title}</CardTitle>
            <CardDescription>
              <div className=" flex items-center justify-between w-fit gap-2 mt-2">
                <LocateFixedIcon className="size-4" /> <p>{data.location}</p>
              </div>
            </CardDescription>
          </div>
          <Image
            src="/images/drone-shot.jpg"
            width={50}
            height={50}
            alt="drone shot of city"
            className="size-14 rounded"
          />
        </CardHeader>
        <CardContent>
          <p>Orders: {data.numberOfOrders}</p>
          <p>Last order: {data.lastOrderDate}</p>
        </CardContent>
        <CardFooter className="gap-2 border-t pt-6">
          <p className="rounded bg-slate-200 text-xs p-2">
            <span className="bg-white rounded p-1">{data.imageCount}</span>
            <span> Images</span>
          </p>
          <p className="rounded bg-slate-200 text-xs p-2">
            <span className="bg-white rounded p-1">{data.videoCount}</span>
            <span> Videos</span>
          </p>
          <p className="rounded bg-slate-200 text-xs p-2">
            <span className="bg-white rounded p-1">{data.panoCount}</span>
            <span> Pano</span>
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default WithAuth(Home);
