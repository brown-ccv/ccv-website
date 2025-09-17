export const ButtonGroup = ({ children, ...props }: any) => {
  return (
    <div
      className="flex w-full flex-col flex-wrap items-center gap-4 sm:flex-row"
      {...props}
    >
      {children}
    </div>
  )
}
