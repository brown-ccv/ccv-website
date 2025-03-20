
'use client';
import {
    ChevronLeftCircleIcon,
    ChevronRightCircleIcon,
    User2Icon,
  } from "lucide-react";
  import { Badge } from "./test/anima/ui/badge";
  import { Button } from "./test/anima/ui/button_anima";
  import { Card, CardContent, CardHeader } from "./test/anima/ui/card";
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "./test/anima/ui/carousel";
  
  const projectData = {
    category: "Public Health",
    title: "PROVIDENT",
    organizations: ["Brown School of Public Health", "RI Department of Health"],
    description:
      "A web app to support the PROVIDENT research study looking to prevent drug-related deaths in neighborhoods across Rhode Island. The dashboard showcases a predictive analytics model that identifies neighborhoods where future overdose deaths are most likely to occur.",
    screenshot:
      "https://c.animaapp.com/Q0mvfpWc/img/screenshot-2025-01-10-at-2-05-29-pm-1.png",
  };
  
  export const FeaturedCarousel = (): JSX.Element => {
    return (
      <div className="relative w-full max-w-[1440px] h-[588px] bg-collection-1-white">
        <div className="px-[122px] py-[30px] space-y-4">
          <Badge className="bg-collection-1-yellow text-black hover:bg-collection-1-yellow">
            {projectData.category}
          </Badge>
  
          <h2 className="text-[28px] font-semibold font-['Source_Sans_Pro']">
            {projectData.title}
          </h2>
  
          <div className="flex items-center gap-5">
            <User2Icon className="w-6 h-6" />
            <p className="font-['Lato'] text-lg">
              {projectData.organizations.join("\n")}
            </p>
          </div>
  
          <p className="max-w-[440px] text-xl text-collection-1-darkgray font-['Source_Sans_Pro'] mt-20">
            {projectData.description}
          </p>
  
          <div className="flex gap-8 mt-32">
            <Button className="w-[155px] h-[55px] bg-collection-1-green hover:bg-collection-1-green/90 rounded-[50px] text-xl">
              Website
            </Button>
            <Button
              variant="outline"
              className="w-[155px] h-[55px] border-2 border-collection-1-green text-collection-1-green hover:bg-collection-1-green/10 rounded-[50px] text-xl"
            >
              View More
            </Button>
          </div>
        </div>
  
        <Card className="absolute w-[721px] h-[443px] top-[57px] right-[102px] shadow-[0px_4px_8px_4px_#bbbbbb40]">
          <CardHeader className="h-8 bg-collection-1-offwhite rounded-t-[10px] p-0">
            <div className="flex gap-3 items-center p-2">
              <div className="w-[15px] h-[15px] bg-collection-1-lightgray rounded-full" />
              <div className="w-[15px] h-[15px] bg-collection-1-yellow rounded-full" />
              <div className="w-[15px] h-[15px] bg-collection-1-green rounded-full" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <img
              src={projectData.screenshot}
              alt="Project Screenshot"
              className="w-[567px] h-[389px] mx-auto mt-[14px] object-cover"
            />
          </CardContent>
        </Card>
  
        <Carousel className="w-full">
          <CarouselPrevious className="absolute left-12 top-[277px] w-[35px] h-[35px] bg-collection-1-white border-collection-1-gray">
            <ChevronLeftCircleIcon className="w-6 h-6" />
          </CarouselPrevious>
          <CarouselContent>
            <CarouselItem>
              {/* Current slide content is already shown above */}
            </CarouselItem>
          </CarouselContent>
          <CarouselNext className="absolute right-12 top-[277px] w-[35px] h-[35px] bg-collection-1-white border-collection-1-gray">
            <ChevronRightCircleIcon className="w-6 h-6" />
          </CarouselNext>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`${
                  i === 0 ? "w-4" : "w-[9px]"
                } h-[9px] bg-collection-1-lightestgray rounded-full`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    );
  };
  
  export default FeaturedCarousel;