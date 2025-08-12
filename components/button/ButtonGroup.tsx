export const ButtonGroup = ({ children, ...props }: any) => {
  return (
    <div
      className="flex flex-col sm:flex-row flex-wrap gap-4 w-full items-start not-prose"
      {...props}
    >
      {children}
    </div>
  )
}
