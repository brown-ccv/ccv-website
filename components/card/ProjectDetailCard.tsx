import React from "react"
import { PortfolioEntry } from "@/lib/portfolio-types"
import { Badge } from "@/components/ui/Badge"
import { FaGithub, FaUser } from "react-icons/fa"
import { humanize } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

interface ProjectDetailCardProps {
  entry: PortfolioEntry
}

export function ProjectDetailCard({ entry }: ProjectDetailCardProps) {
  return (
    <Card className="w-full lg:max-w-sm bg-white relative flex flex-col">
      <CardHeader className="lg:pb-4 pb-2">
        <div className="flex items-center justify-between">
          <Badge value={entry['project-type']} autoColor={true}>
            {entry['project-type']}
          </Badge>
          {/* {entry.starred && (
            <Badge color="sunglow" className="text-black">
              ⭐ Featured
            </Badge>
          )} */}
        </div>
        <CardTitle className="text-center text-2xl lg:text-3xl border-b border-gray-300 py-2 lg:py-4">
          {entry.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* Languages */}
        {entry.languages && entry.languages.length > 0 && (
          <div>
            <h3 className="text-xl lg:text-2xl font-semibold mb-2 mt-4 lg:mt-8 text-neutral-900 pt-2 lg:pt-4">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {entry.languages.map((lang) => (
                <Badge key={lang} color="purple" className="bg-purple-900/20 text-purple-900 border border-purple-900">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {entry.tags && entry.tags.length > 0 && (
          <div>
            <h3 className="text-xl lg:text-2xl font-semibold mb-2 mt-4 lg:mt-8 text-neutral-900 pt-2 lg:pt-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <Badge key={tag} color="pink" className="bg-pink-500/20 text-pink-500 border border-pink-500">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Groups */}
        {entry.groups && entry.groups.length > 0 && (
          <div>
            <h3 className="text-xl lg:text-2xl font-semibold mb-2 mt-4 lg:mt-8 text-neutral-900 pt-2 lg:pt-4">Groups</h3>
            <div className="flex flex-wrap gap-2">
              {entry.groups.map((group) => (
                <Badge key={group} color="blue" className="bg-blue-500/20 text-blue-500 border border-blue-500">
                  {group}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Department */}
        {entry.department && entry.department.length > 0 && (
          <div>
            <h3 className="text-xl lg:text-2xl font-semibold mb-2 mt-4 lg:mt-8 text-neutral-900 pt-2 lg:pt-4">Department</h3>
            <div className="flex flex-wrap gap-2">
              {entry.department.map((department) => (
                <Badge key={department} className="bg-red-university/20 text-red-university border border-red-university">
                  {department}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* People */}
        <div>
          <h3 className="text-xl lg:text-2xl font-semibold mb-2 mt-4 lg:mt-8 text-neutral-900 pt-2 lg:pt-4">People</h3>
          <div className="space-y-2">
            {entry.people.map((person) => (
              <div key={person.name} className="flex items-center space-x-2">
                <span className="text-neutral-700">{person.name}</span>
                {person.github_user && (
                  <a 
                    href={`https://github.com/${person.github_user}`}
                    className="text-neutral-900 hover:text-sunglow-400 active:text-sunglow-400"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${person.name}'s GitHub Profile`}
                  >
                    <FaGithub className="text-xl" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Investigators */}
        {entry.investigators && entry.investigators.length > 0 && (
          <div>
            <h3 className="text-xl lg:text-2xl font-semibold mb-2 mt-4 lg:mt-8 text-neutral-900 pt-2 lg:pt-4">Investigators</h3>
            <div className="space-y-2">
              {entry.investigators.map((investigator) => (
                <div key={investigator.name} className="flex items-center space-x-2">
                  <span className="text-neutral-700">{investigator.name}</span>
                  <a 
                    href={investigator.link}
                    className="text-neutral-900 hover:text-sunglow-400 active:text-sunglow-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaUser className="text-xl" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {entry.links && entry.links.length > 0 && (
          <div>
            <h3 className="text-xl lg:text-2xl font-semibold mb-2 mt-4 lg:mt-8 text-neutral-900 pt-2 lg:pt-4">Resources</h3>
            <div className="flex flex-col gap-2">
              {entry.links.map((link, index) => (
                <a key={index} href={link.url} className="text-keppel-500 hover:text-keppel-700 active:text-keppel-700 underline" target="_blank" rel="noopener noreferrer">
                  {humanize(link.category)}
                </a>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}