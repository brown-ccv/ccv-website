export const tagColors = [
  "keppel",
  "sunglow",
  "purple",
  "sky",
  "amber",
  "emerald",
  "blue",
  "rose",
  "cyan",
  "lime",
] as const

export type TagColor = typeof tagColors[number]

export const getColorForTag = (tag: string): TagColor => {
  const hash = Array.from(tag).reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return tagColors[hash % tagColors.length]
}
