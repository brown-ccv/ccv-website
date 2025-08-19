export const ButtonGroup = ({ children, ...props }: any) => {
  return (
    <div
      className="not-prose flex w-full flex-col flex-wrap items-start gap-4 sm:flex-row"
      {...props}
    >
      {children}
    </div>
  )
}
