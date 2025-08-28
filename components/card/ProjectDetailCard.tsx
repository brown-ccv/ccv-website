import React from "react"
import { PortfolioEntry } from "@/lib/portfolio-types"
import { Badge } from "@/components/ui/Badge"
import { FaGithub, FaUser } from "react-icons/fa"
import { humanize } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/Card"

interface ProjectDetailCardProps {
  entry: PortfolioEntry
}

export function ProjectDetailCard({ entry }: ProjectDetailCardProps) {
  return (
    <Card className="w-full lg:max-w-sm bg-white relative flex flex-col">
      {/* Featured Badge */}
      {entry.starred && (
        <div className="absolute top-4 right-4 z-10">
          <Badge color="sunglow" className="text-black text-md">
            ⭐ Featured
          </Badge>
        </div>
      )}
      
      <CardContent>
        {/* Languages */}
        {entry.languages && entry.languages.length > 0 && (
          <div>
            <h3 className="text-xl lg:text-2xl font-semibold mb-2 mt-4 lg:mt-8 text-neutral-900 pt-2 lg:pt-4">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {entry.languages.map((lang) => (
                <Badge key={lang} color="purple" className="text-md bg-purple-900/20 text-purple-900 border border-purple-900">
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
                <Badge key={tag} color="pink" className="text-md bg-pink-500/20 text-pink-500 border border-pink-500">
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
                <Badge key={group} color="blue" className="text-md bg-blue-500/20 text-blue-500 border border-blue-500">
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
                <Badge key={department} className="text-md bg-red-university/20 text-red-university border border-red-university">
                  {department}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Developers */}
        <div>
          <h3 className="text-xl lg:text-2xl font-semibold mb-2 mt-4 lg:mt-8 text-neutral-900 pt-2 lg:pt-4">Developers</h3>
          <div className="space-y-2">
            {entry.developers.map((developer) => (
              <div key={developer.name} className="flex items-center space-x-2">
                {developer.github_user && (
                  <a 
                    href={`https://github.com/${developer.github_user}`}
                    className="text-neutral-900 hover:text-sunglow-400 active:text-sunglow-400"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${developer.name}'s GitHub Profile`}
                  >
                    <FaGithub className="text-2xl" />
                  </a>
                )}
                <span className="text-neutral-700 text-lg">{developer.name}</span>
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
                  <a 
                    href={investigator.link}
                    className="text-neutral-900 hover:text-sunglow-400 active:text-sunglow-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaUser className="text-2xl" />
                  </a>
                  <span className="text-neutral-700 text-lg">{investigator.name}</span>
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
                <a key={index} href={link.url} className="text-keppel-600 hover:text-keppel-400 active:text-keppel-400 underline text-lg" target="_blank" rel="noopener noreferrer">
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