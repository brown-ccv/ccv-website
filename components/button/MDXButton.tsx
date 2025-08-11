import ButtonLink from "./ButtonLink"

export const MDXButton = ({ children, href, ...props }: any) => {
  return (
    <ButtonLink
      href={href}
      variant="primary_filled"
      size="lg"
      className="my-4"
      external
      {...props}
    >
      {children}
    </ButtonLink>
  )
}
