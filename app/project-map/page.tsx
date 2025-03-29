"use client";

import withAuth from "@/components/with-auth";
import "../../node_modules/ol/ol.css";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js";
import Icon from "ol/style/Icon.js";
import Style from "ol/style/Style.js";
import { useEffect, useState } from "react";
import Feature from "ol/Feature.js";
import Point from "ol/geom/Point.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import { fromLonLat } from "ol/proj";
import { useRouter } from "next/navigation";
import { IProject } from "../types";
import { toast } from "sonner";
import { getProjects } from "@/lib/firebase/firestore";
import Loader from "@/components/loader";

function ProjectMapPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProjects()
      .then((data) => setProjects(data))
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch projects.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  // render map
  useEffect(() => {
    if (!projects || projects.length === 0) return;

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: "https://openlayers.org/en/v4.6.5/examples/data/icon.png",
      }),
    });

    const features = projects.map(
      (project) =>
        new Feature({
          geometry: new Point(fromLonLat(project.coordinates)),
          name: project.title,
          projectId: project.id,
        })
    );

    features.forEach((marker) => marker.setStyle(iconStyle));

    const vectorSource = new VectorSource({
      features,
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      target: "map",
      view: new View({
        center: fromLonLat([77.1025, 28.6139]),
        zoom: 4,
      }),
    });

    // Add click event listener for markers
    map.on("click", (event) => {
      const feature = map.forEachFeatureAtPixel(
        event.pixel,
        (feature) => feature
      );

      if (feature) {
        // Retrieve feature data (like name or projectId)
        const id = feature.get("projectId");
        const title = feature.get("name");
        console.log(`Marker clicked: ${title} (ID: ${id})`);

        // Navigate to a dynamic page based on the marker ID
        router.push(`/project/${id}`);
      }
    });

    return () => {
      map?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  if (isLoading) return <Loader />;

  return (
    <main className="px-8">
      <div id="map" className="map w-full h-[600px]" tabIndex={0}></div>
      <div id="popup"></div>
    </main>
  );
}

export default withAuth(ProjectMapPage);
