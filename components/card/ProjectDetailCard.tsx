import React from "react"
import { PortfolioEntry } from "@/lib/portfolio-types"
import { Badge } from "@/components/ui/Badge"
import { FaGithub, FaUser } from "react-icons/fa"
import { humanize } from "@/lib/utils"
import { CardContent, CardHeader } from "@/components/ui/Card"
import { StyledCard } from "@/components/card/StyledCard"
import { TechnicalExpertiseHeader } from "@/components/TechnicalExpertiseHeader"

interface ProjectDetailCardProps {
  entry: PortfolioEntry
}

export function ProjectDetailCard({ entry }: ProjectDetailCardProps) {
  return (
    <StyledCard size="sm">
      <CardHeader className="px-0 pb-0">
        <div className="flex items-center justify-between">
          <TechnicalExpertiseHeader expertiseType={entry['project-type']} />
          {entry.starred && (
            <Badge color="sunglow">
              ⭐ Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent>

        {/* Dynamic Array Fields */}
        {Object.entries(entry)
          .filter(([key, value]) => 
            Array.isArray(value) && 
            value.length > 0 && 
            !['developers', 'links', 'investigators'].includes(key)
          )
          .map(([key, value]) => {
            const fieldName = key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, ' ')
            
            // Generate a consistent color for each field type using a simple hash
            const colors = ['purple', 'pink', 'blue', 'red']
            const hash = key.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
            const colorIndex = hash % colors.length
            
            return (
              <div key={key}>
                <h2>
                  {fieldName}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {(value as string[]).map((item) => (
                    <Badge 
                      key={item} 
                      color={colors[colorIndex] as any}
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )
          })}

        {/* Developers */}
        {entry.developers && entry.developers.length > 0 && (
          <div>
            <h2>Developers</h2>
            <div>
              {entry.developers.map((developer) => (
              <div key={developer.name} className="flex items-center">
                {developer.github_user ? (
                  <a 
                    href={`https://github.com/${developer.github_user}`}
                    className="flex items-center space-x-2 text-neutral-900 hover:text-keppel-500 active:text-keppel-500"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${developer.name}'s GitHub Profile`}
                  >
                    <FaGithub />
                    <span>{developer.name}</span>
                  </a>
                ) : (
                  <span className="text-neutral-700">{developer.name}</span>
                )}
              </div>
            ))}
            </div>
          </div>
        )}

        {/* Investigators */}
        {entry.investigators && entry.investigators.length > 0 && (
          <div>
            <h2>Investigators</h2>
            <div>
              {entry.investigators.map((investigator) => (
                <div key={investigator.name} className="flex items-center">
                  <a 
                    href={investigator.link}
                    className="flex items-center space-x-2 text-neutral-900 hover:text-keppel-500 active:text-keppel-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaUser />
                    <span>{investigator.name}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {entry.links && entry.links.length > 0 && (
          <div>
            <h2>Resources</h2>
            <div className="flex flex-col">
              {entry.links.map((link, index) => (
                <a key={index} href={link.url} className="text-keppel-800 hover:text-keppel-400 active:text-keppel-400 underline" target="_blank" rel="noopener noreferrer">
                  {humanize(link.display_text)}
                </a>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </StyledCard>
  )
}