"use client"
import React, { useState } from "react";
import { Button } from "@/components/carousel/Button";
import { Card, CardContent } from "@/components/carousel/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/carousel/Tabs";
import { ChevronLeftIcon, ChevronRightIcon, UserIcon } from "lucide-react";

// Project data for the carousel
const projectData = [
  {
    category: "Public Health",
    title: "PROVIDENT",
    authors: ["Brown School of Public Health", "RI Department of Health"],
    description:
      "A web app to support the PROVIDENT research study looking to prevent drug-related deaths in neighborhoods across Rhode Island. The dashboard showcases a predictive analytics model that identifies neighborhoods where future overdose deaths are most likely to occur.",
    screenshot:
      "https://c.animaapp.com/428GomwI/img/screenshot-2025-01-10-at-2-05-29-pm-1.png",
  },
  {
    category: "Education",
    title: "Project 2",
    authors: ["Author 1", "Author 2"],
    description: "Description for Project 2",
    screenshot: "https://placeholder.com/image2.jpg",
  },
  {
    category: "Technology",
    title: "Project 3",
    authors: ["Author 3", "Author 4"],
    description: "Description for Project 3",
    screenshot: "https://placeholder.com/image3.jpg",
  },
  {
    category: "Environment",
    title: "Project 4",
    authors: ["Author 5", "Author 6"],
    description: "Description for Project 4",
    screenshot: "https://placeholder.com/image4.jpg",
  },
  {
    category: "Healthcare",
    title: "Project 5",
    authors: ["Author 7", "Author 8"],
    description: "Description for Project 5",
    screenshot: "https://placeholder.com/image5.jpg",
  },
];

const categoryColors = {
  "Public Health": "bg-extendedsunglow-400",
  "Education": "bg-blue-400",
  "Technology": "bg-green-400",
  "Environment": "bg-purple-400",
  "Healthcare": "bg-red-400",
};

export const FeaturedCarousel = (): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projectData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projectData.length) % projectData.length);
  };

  return (
    <div className="relative bg-defaultwhite w-full max-w-[1440px] h-[688px] p-8">
      <Tabs value={currentSlide.toString()} className="w-full h-full">
        <div className="absolute w-full h-full">
          {projectData.map((project, index) => (
            <TabsContent key={index} value={index.toString()} className="w-full h-full">
              <div className="flex flex-col px-[122px] py-[50px] gap-6">
                <div className={`inline-block ${categoryColors[project.category] || 'bg-gray-400'} text-defaultblack font-['Source_Sans_Pro',Helvetica] font-semibold text-xs rounded-[50px] py-[3px] px-4 cursor-default w-fit`}>
                  {project.category}
                </div>

                <h2 className="font-['Source_Sans_Pro',Helvetica] font-semibold text-defaultblack text-[32px] mt-2">
                  {project.title}
                </h2>

                <div className="flex items-center gap-5 mt-4">
                  <UserIcon className="w-7 h-7" />
                  <div className="font-['Lato',Helvetica] font-normal text-defaultblack text-xl">
                    {project.authors.map((author, index) => (
                      <React.Fragment key={index}>
                        {author}
                        {index < project.authors.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <p className="font-['Source_Sans_Pro',Helvetica] font-normal text-extendedgray-800 text-2xl max-w-[480px] mt-20">
                  {project.description}
                </p>

                <div className="flex gap-10 mt-20">
                  <Button className="bg-extendedkeppel-700 text-defaultwhite font-['Source_Sans_Pro',Helvetica] font-semibold text-2xl rounded-[50px] h-[65px] w-[175px]">
                    Website
                  </Button>
                  <Button
                    variant="outline"
                    className="text-extendedkeppel-700 border-2 border-extendedkeppel-700 font-['Source_Sans_Pro',Helvetica] font-semibold text-2xl rounded-[50px] h-[65px] w-[175px]"
                  >
                    View More
                  </Button>
                </div>
              </div>

              <Card className="absolute w-[761px] h-[483px] top-[77px] left-[617px] rounded-[10px] shadow-[0px_4px_8px_4px_#bbbbbb40] border-none">
                <div className="h-10 bg-defaultgray-300 rounded-[10px_10px_0px_0px] relative">
                  <div className="absolute w-[18px] h-[18px] top-[11px] left-[30px] bg-defaultgray-500 rounded-[9px]" />
                  <div className="absolute w-[18px] h-[18px] top-[11px] left-[58px] bg-extendedsunglow-400 rounded-[9px]" />
                  <div className="absolute w-[18px] h-[18px] top-[11px] left-[86px] bg-extendedkeppel-700 rounded-[9px]" />
                </div>
                <CardContent className="p-0">
                  <img
                    className="w-[607px] h-[429px] mx-auto mt-[44px] object-cover"
                    alt={`${project.title} screenshot`}
                    src={project.screenshot}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute w-[45px] h-[45px] top-[317px] left-16 bg-defaultwhite rounded-[99px] border border-solid border-extendedtrue-gray700"
          onClick={prevSlide}
        >
          <ChevronLeftIcon className="w-8 h-8" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute w-[45px] h-[45px] top-[317px] right-16 bg-defaultwhite rounded-[99px] border border-solid border-extendedtrue-gray700"
          onClick={nextSlide}
        >
          <ChevronRightIcon className="w-8 h-8" />
        </Button>

        <TabsList className="absolute w-[184px] h-[11px] bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-10 bg-transparent">
          {projectData.map((_, index) => (
            <TabsTrigger
              key={index}
              value={index.toString()}
              className={`h-[11px] bg-defaultgray-300 rounded-[5.5px] ${
                index === currentSlide ? 'w-5' : 'w-[11px]'
              } data-[state=active]:bg-defaultgray-500`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};