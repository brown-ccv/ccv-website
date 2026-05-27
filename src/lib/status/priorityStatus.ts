interface Label {
  name: string
  color?: string
}

interface GitHubIssue {
  id: number
  title: string
  pull_request?: any
  created_at: number
  labels: Label[]
  priority: number[]

  [key: string]: any
}

function convertToPriorityNumber(label: Label): number {
  return Number(label.name.split("-")[0])
}

function getPriority(openIssues: GitHubIssue[]) {
  return openIssues
    .map((issue) => ({
      ...issue,
      priority: Math.max(
        issue.labels.length === 0 ? 0 : convertToPriorityNumber(issue.labels[0])
      ),
    }))
    .sort((a, b) =>
      a.priority - b.priority === 0
        ? a.created_at - b.created_at
        : a.priority - b.priority
    )
}

export default function priorityStatus(openIssues: GitHubIssue[]) {
  if (openIssues.length == 0) {
    return { name: "✔️ operational", color: "#00b398" } // green add transparency - good
  }

  const priority = getPriority(openIssues)[0]

  return priority.labels[0] === undefined
    ? { name: "🔍 investigating", color: "#FDE047", title: priority.title }
    : {
        name: priority.labels[0]?.name.split("-")[1],
        color: `#${priority.labels[0]?.color}` || "#22C55E",
        title: priority.title,
      }
}
