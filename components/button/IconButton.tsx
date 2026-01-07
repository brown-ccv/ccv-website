import { Button, ButtonProps } from "@/components/button/Button"
import Icon from "@/components/ui/RenderIcon"

interface IconButtonProps extends ButtonProps {
  iconName: string
}

export const IconButton = ({
  children,
  iconName,
  ...props
}: IconButtonProps) => {
  return (
    <Button {...props}>
      <Icon aria-hidden="true" iconName={iconName} />
    </Button>
  )
}
