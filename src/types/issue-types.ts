interface Comment {
  comment: string
  activityItemIdx: number
  id: number
  created_at: Date
  body: string
}

export interface Label {
  name: string
  color?: string
  title: string
}

export interface GitHubIssue {
  id: number
  title: string
  pull_request?: any
  created_at: string
  priority?: number[]
  labels: Label[]
  comments: Comment[]

  [key: string]: any
}
