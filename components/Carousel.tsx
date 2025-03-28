"use client"
import React, { useState } from "react";
import { Button } from "@/components/carousel/Button";
import { Card, CardContent } from "@/components/carousel/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/carousel/Tabs";
import { ChevronLeftIcon, ChevronRightIcon, UserIcon } from "lucide-react";

// Project data for the carousel./carousel/badge
interface ProjectData {
  category: string;
  title: string;
  authors: string[];
  description: string;
  screenshot: string;
}

const projectData: ProjectData[]  = [
  {
    category: "Public Health",
    title: "PROVIDENT",
    authors: ["Brown School of Public Health", "RI Department of Health"],
    description:
      "A web app to support the PROVIDENT research study looking to prevent drug-related deaths in neighborhoods across Rhode Island. The dashboard showcases a predictive analytics model that identifies neighborhoods where future overdose deaths are most likely to occur.",
    screenshot:
      "/test-image.jpg",
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
  "Public Health": "bg-secondary-yellow-500",
  "Education": "bg-secondary-blue-500",
  "Technology": "bg-primary-500",
  "Environment": "bg-red",
  "Healthcare": "bg-primary-500",
};

export const Carousel = (): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projectData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projectData.length) % projectData.length);
  };

    return (
      <div className="flex flex-auto px-6 sm:px-12 md:px-16 lg:px-24 py-[50px] gap-6 w-lg">
        <div className="flex flex-auto relative w-full max-w-[1440px] m-20">
          <div className="flex flex-auto absolute left-0 top-1/2 -translate-y-1/2 z-20">
            <Button
              variant="neutral"
              size="icon"
              className="w-[45px] h-[45px] bg-defaultwhite rounded-[99px] border border-solid border-extendedtrue-gray700"
              onClick={prevSlide}
            >
              <ChevronLeftIcon className="w-8 h-8" />
            </Button>
          </div>
  
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
            <Button
              variant="neutral"
              size="icon"
              className="w-[45px] h-[45px] bg-defaultwhite rounded-[99px] border border-solid border-extendedtrue-gray700"
              onClick={nextSlide}
            >
              <ChevronRightIcon className="w-8 h-8" />
            </Button>
          </div>
  
          <div className="mx-auto flex flex-auto sm:flex-row items-center gap-x-4  bg-white p-6 w-lg">
            <div className="relative bg-defaultwhite w-lg min-h-[688px] p-8">
              <Tabs value={currentSlide.toString()} className="w-lg h-lg">
                <div className="absolute w-lg h-lg">
                  {projectData.map((project, index) => (
                    <TabsContent 
                      key={index} 
                      value={index.toString()} 
                      className="w-full h-full"
                    >
                      <div className="flex flex-col-reverse lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-8 relative">
                        {/* Left Column - Project Details */}
                        <div className="w-full lg:w-1/2 space-y-6 order-2 lg:order-1 z-10 pr-0 lg:pr-8">
                          {/* Category Badge */}
                          <div className={`inline-block ${categoryColors[project.category] || 'bg-gray-400'} text-defaultblack font-['Source_Sans_Pro',Helvetica] font-semibold text-xs rounded-[50px] py-[3px] px-4 cursor-default w-fit`}>
                            {project.category}
                          </div>
      
                          {/* Title */}
                          <h2 className="font-['Source_Sans_Pro',Helvetica] font-semibold text-defaultblack text-[32px] mt-2">
                            {project.title}
                          </h2>
      
                          {/* Authors */}
                          <div className="flex items-center gap-5 mt-4">
                            <UserIcon className="w-7 h-7 flex-shrink-0" />
                            <div className="font-['Source_Sans_Pro',Helvetica] font-normal text-defaultblack text-xl">
                              {project.authors.map((author, index) => (
                                <React.Fragment key={index}>
                                  {author}
                                  {index < project.authors.length - 1 && <br />}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
      
                          {/* Description */}
                          <p className="font-['Source_Sans_Pro',Helvetica] font-normal text-extendedgray-800 text-2xl max-w-[480px] mt-6">
                            {project.description}
                          </p>
      
                          {/* Buttons */}
                          <div className="flex gap-10 mt-6">
                            <Button 
                              variant="default"
                              className="bg-extendedkeppel-700 text-defaultwhite font-['Source_Sans_Pro',Helvetica] font-semibold text-2xl rounded-[50px] h-[65px] w-[175px]"
                             >
                              Website
                            </Button>
                            <Button
                              variant="default"
                              className="text-extendedkeppel-700 border-2 border-extendedkeppel-700 font-['Source_Sans_Pro',Helvetica] font-semibold text-2xl rounded-[50px] h-[65px] w-[175px]"
                            >
                              View More
                            </Button>
                          </div>
                        </div>
  
                        {/* Right Column - Image Card */}
                        <div className="w-full lg:w-1/2 relative order-1 lg:order-2 mb-6 lg:mb-0">
                          <div className="w-[761px] max-w-full mx-auto">
                            <div className="aspect-w-16 aspect-h-10">
                              <Card className="inset-0 rounded-[10px] shadow-[0px_4px_8px_4px_#bbbbbb40] border-none">
                                <div className="h-10 bg-defaultgray-300 rounded-[10px_10px_0px_0px] relative">
                                  <div className="absolute w-[18px] h-[18px] top-[11px] left-[30px] bg-defaultgray-500 rounded-[9px]" />
                                  <div className="absolute w-[18px] h-[18px] top-[11px] left-[58px] bg-extendedsunglow-400 rounded-[9px]" />
                                  <div className="absolute w-[18px] h-[18px] top-[11px] left-[86px] bg-extendedkeppel-700 rounded-[9px]" />
                                </div>
                                <CardContent className="p-0 inset-0">
                                  <img
                                    className="w-full h-full object-cover"
                                    alt={`${project.title} screenshot`}
                                    src={project.screenshot}
                                  />
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
      
                  {/* Tabs Indicator */}
                  <TabsList className="absolute right-1/2 left-1/2 -translate-y-0 z-20 w-[184px] h-[11px] -translate-x-1/2 flex items-center justify-center gap-10 bg-transparent">
                    {projectData.map((_, index) => (
                      <TabsTrigger
                        key={index}
                        value={index.toString()}
                        className={`h-[11px] bg-neutral-300 rounded-[5.5px] ${
                          index === currentSlide ? 'w-5' : 'w-[11px]'
                        } data-[state=active]:bg-neutral-500`}
                        onClick={() => setCurrentSlide(index)}
                      />
                    ))}
                  </TabsList>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  };