export interface GitHubIssue {
  id: number
  title: string
  pull_request?: any
  created_at: string
  priority?: number[]
  labels: Label[]

  [key: string]: any
}

export interface Label {
  name: string
  color?: string
}
