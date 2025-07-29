"use client"

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cardVariants } from "@/components/ui/variants";
import * as Dialog from "@radix-ui/react-dialog";
import { FaGithub, FaInfoCircle, FaTimes } from "react-icons/fa";
import ExternalLink from "@/components/ui/external-link";

interface PeopleCardProps {
  className?: string;
  imagePath: string;
  hoverImagePath?: string;
  name: string;
  title: string;
  personDetails?: {
    name: string;
    title: string;
    team?: string;
    subteam?: string;
    type?: string;
    github_username?: string;
    brown_directory_uuid?: string;
    bio?: string;
    image?: string;
  };
}

export const PeopleCard: React.FC<PeopleCardProps> = ({ className, imagePath, hoverImagePath, name, title, personDetails, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Card
          className={cn("overflow-hidden cursor-pointer", cardVariants({ variant: "people" }), "w-[400px]", "h-[600px]", "flex-shrink-0")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setOpen(true)}
        >
          <CardContent className="flex flex-col h-full">
            <div className="relative overflow-hidden">
              <Image
                src={isHovered && hoverImagePath ? hoverImagePath : imagePath}
                alt={name}
                width="500"
                height="500"
                className="rounded-full transition-opacity duration-300 max-h-[350px] min-h-[350px] max-w-[350px]"
              />
            </div>
            <div>
              <CardTitle className="text-2xl text-center py-4">{name}</CardTitle>
              <CardDescription className="text-xl italic text-center">{title}</CardDescription>
            </div>
          </CardContent>
        </Card>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className="fixed z-50 left-1/2 top-1/2 w-[80vw] h-[80vh] sm:w-[90vw] md:w-[80vw] lg:w-[60vw] sm:h-auto sm:max-h-[95vh] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg flex flex-col gap-4 overflow-y-auto">
          <Dialog.Close asChild>
            <Button
              variant="secondary_filled"
              size="icon"
              className="absolute top-0 right-0 !m-4 p-2"
              aria-label="Close"
            >
              <FaTimes className="h-4 w-4" />
            </Button>
          </Dialog.Close>
          <div className="p-10">
            <div className="flex flex-col items-center gap-2">
              <Image
                src={imagePath}
                alt={name}
                width={180}
                height={180}
                className="rounded-full"
              />
              <Dialog.Title asChild>
                <h2 className="text-3xl font-bold text-center mt-2">{personDetails?.name || name}</h2>
              </Dialog.Title>
              <div className="text-2xl text-neutral-700 text-center mb-2">{personDetails?.title || title}</div>
              {personDetails?.team && (
                <div className="text-lg text-neutral-500 text-center -mb-2">
                  {personDetails.team}
                </div>
              )}
              {personDetails?.subteam && (
                <div className="text-lg text-neutral-500 text-center italic">
                  {personDetails.subteam}
                </div>
              )}
              <div className="flex gap-4 mt-2">
                {personDetails?.github_username && personDetails.github_username !== "" && (
                  <ExternalLink
                    href={`https://github.com/${personDetails.github_username}`}
                    title="GitHub Profile"
                    className="text-black hover:text-keppel-700 text-2xl"
                  >
                    <FaGithub />
                  </ExternalLink>
                )}
                {personDetails?.brown_directory_uuid && personDetails.brown_directory_uuid !== "" && (
                  <ExternalLink
                    href={`https://directory.brown.edu/uuid/${personDetails.brown_directory_uuid}`}
                    title="Brown Directory"
                    className="text-black hover:text-keppel-700 text-2xl"
                  >
                    <FaInfoCircle />
                  </ExternalLink>
                )}
              </div>
            </div>
            {personDetails?.bio && (
              <div className="mt-4 text-lg text-neutral-800">
                {personDetails.bio}
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};