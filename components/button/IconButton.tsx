import { Button, ButtonProps } from "@/components/button/Button"
import Icon from "@/components/ui/RenderIcon"

interface IconButtonProps extends ButtonProps {
  iconName: string
}

export function IconButton({ iconName, ...props }: IconButtonProps) {
  return (
    <Button variant={"icon_only"} size={"icon"} {...props}>
      <Icon aria-hidden="true" iconName={iconName} />
    </Button>
  )
}
