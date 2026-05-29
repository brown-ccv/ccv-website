import { GitHubIssue } from "@/types/issue-types"
import React from "react"
import {
  ChatBubbleLeftEllipsisIcon,
  CheckIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/20/solid"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

// based on https://tailwindui.com/components/application-ui/layout/list-containers#component-338d89d9dfdf34b0f72bf271951ce687
export default function ListContainer({ issues }: { issues: GitHubIssue[] }) {
  return (
    <ul
      role="list"
      className="divide-y-4 divide-gray-200 overflow-hidden rounded-lg bg-white shadow"
    >
      {issues.map((issue) => (
        <li key={issue.id} className="px-4 py-4 sm:px-6">
          <h2 className="py-4 text-xl font-semibold tracking-tight text-gray-900">
            {issue.title}
          </h2>
          <Feed issue={issue} />
        </li>
      ))}
    </ul>
  )
}

function Feed({ issue }: { issue: GitHubIssue }) {
  return (
    <ul role="list" className="-mb-8 flow-root">
      {issue.closed_at && (
        <li>
          <div className="relative pb-8">
            <span
              aria-hidden="true"
              className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
            />
            <div className="relative flex items-start space-x-3">
              <div className="relative">
                <span
                  className="flex size-10 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#22C55E" }}
                />
                <span className="absolute inset-0 flex size-10 items-center justify-center">
                  <CheckIcon aria-hidden="true" className="size-5 text-white" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Resolved {new Date(issue.closed_at).toLocaleString()}
                  </p>
                </div>
                <article className="prose mt-2 text-sm text-gray-700">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    This issue has been resolved
                  </ReactMarkdown>
                </article>
              </div>
            </div>
          </div>
        </li>
      )}

      {issue.comments.map((comment, activityItemIdx) => (
        <li key={comment.id} className="relative pb-8">
          {activityItemIdx !== issue.comments.length ? (
            <span
              aria-hidden="true"
              className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
            />
          ) : null}
          <div className="relative flex items-start space-x-3">
            <div className="relative">
              <span
                className="flex size-10 flex-shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: "#003C71" }}
              />
              <span className="absolute inset-0 flex size-10 items-center justify-center">
                <ChatBubbleLeftEllipsisIcon
                  aria-hidden="true"
                  className="size-5 text-white"
                />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Update {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
              <article className="prose mt-2 text-sm text-gray-700">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {comment.body}
                </ReactMarkdown>
              </article>
            </div>
          </div>
        </li>
      ))}
      <li>
        <div className="relative pb-8">
          <div className="relative flex items-start space-x-3">
            <div className="relative">
              <span
                className="flex size-10 flex-shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor:
                    issue.labels.length !== 0
                      ? `#${issue.labels[0]?.color}`
                      : "#FFC72C",
                }}
              />
              <span className="absolute inset-0 flex size-10 items-center justify-center">
                <WrenchScrewdriverIcon
                  aria-hidden="true"
                  className="size-5 text-white"
                />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div>
                <p className="mt-0.5 text-sm text-gray-500">
                  {issue.labels.length !== 0
                    ? issue.labels[0].title
                    : "Investigating"}{" "}
                  {new Date(issue.created_at).toLocaleString()}
                </p>
              </div>
              <h3>{issue.title}</h3>
              <article className="prose mt-2 text-sm text-gray-700">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {issue.body}
                </ReactMarkdown>
              </article>
            </div>
          </div>
        </div>
      </li>
    </ul>
  )
}
