import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ChevronLeftIcon, ChevronRightIcon, UserIcon } from "lucide-react";

const featuredProjects = [
  {
    title: "PROVIDENT",
    category: "Public Health",
    description: "A web app to support the PROVIDENT research study looking to prevent drug-related deaths in neighborhoods across Rhode Island.",
    image: "https://c.animaapp.com/VOhWj8ET/img/screenshot-2025-01-10-at-2-05-29-pm-1.png",
  },
  {
    title: "PROJECT 2",
    category: "Economics",
    description: "Hello world.",
    image: "https://c.animaapp.com/VOhWj8ET/img/screenshot-2025-01-10-at-2-05-29-pm-1.png",
  },
];

export const FeaturedProjects: React.FC = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const handlePrevProject = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex === 0 ? featuredProjects.length - 1 : prevIndex - 1
    );
  };

  const handleNextProject = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex === featuredProjects.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="w-full mt-[100px]">
      <SectionHeader title="Featured Projects" />

      <div className="w-full h-[588px] bg-defaultwhite relative">
        <div className="flex justify-between px-12">
          <div className="max-w-[440px]">
            <Badge className="bg-extendedsunglow-400 text-defaultblack rounded-[50px] font-semibold text-xs">
              {featuredProjects[currentProjectIndex].category}
            </Badge>

            <h3 className="font-semibold text-defaultblack text-[28px] mt-5">
              {featuredProjects[currentProjectIndex].title}
            </h3>

            <div className="flex items-center mt-6">
              <UserIcon className="w-6 h-6 mr-3" />
              <p className="font-normal text-defaultblack text-lg">
                Brown School of Public Health
                <br />
                RI Department of Health
              </p>
            </div>

            <p className="font-normal text-extendedgray-800 text-xl mt-10">
              {featuredProjects[currentProjectIndex].description}
            </p>

            <div className="flex space-x-4 mt-12">
              <Button className="h-[55px] w-[155px] rounded-[50px] bg-extendedkeppel-700 text-defaultwhite font-semibold text-xl">
                Website
              </Button>

              <Button
                variant="outline"
                className="h-[55px] w-[155px] rounded-[50px] border-2 border-extendedkeppel-700 text-extendedkeppel-700 font-semibold text-xl"
              >
                View More
              </Button>
            </div>
          </div>

          <Card className="w-[721px] h-[443px] rounded-[10px] shadow-[0px_4px_8px_4px_#bbbbbb40] border-none">
            <div className="h-8 bg-defaultgray-300 rounded-[10px_10px_0px_0px] flex items-center px-6 space-x-3">
              <div className="w-[15px] h-[15px] bg-defaultgray-500 rounded-full"></div>
              <div className="w-[15px] h-[15px] bg-extendedsunglow-400 rounded-full"></div>
              <div className="w-[15px] h-[15px] bg-extendedkeppel-700 rounded-full"></div>
            </div>
            <CardContent className="p-0 flex justify-center">
              <img
                className="w-[567px] h-[389px] object-cover"
                alt={`${featuredProjects[currentProjectIndex].title} Screenshot`}
                src={featuredProjects[currentProjectIndex].image}
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mt-10">
          <div className="flex space-x-3">
            {featuredProjects.map((_, index) => (
              <div
                key={index}
                className={`${
                  index === currentProjectIndex ? "w-4" : "w-[9px]"
                } h-[9px] bg-defaultgray-300 rounded-full`}
              />
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-12 top-[277px] w-[35px] h-[35px] rounded-full border-extendedtrue-gray700"
          onClick={handlePrevProject}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-12 top-[277px] w-[35px] h-[35px] rounded-full border-extendedtrue-gray700"
          onClick={handleNextProject}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
};
