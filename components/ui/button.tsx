import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "tech-button hover:scale-[1.02] active:scale-[0.98] shadow-lg",
        destructive:
          "bg-destructive text-destructive-foreground shadow-lg hover:bg-destructive/90 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0",
        outline:
          "tech-button-secondary hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "tech-button-secondary hover:scale-[1.02] active:scale-[0.98]",
        ghost:
          "hover:bg-secondary hover:text-foreground active:scale-[0.98] hover:scale-[1.02]",
        link:
          "text-primary underline-offset-4 hover:underline hover:text-primary/80 p-0 h-auto",
        gradient:
          "tech-gradient text-white shadow-lg hover:shadow-xl hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-t before:from-black/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        tech:
          "tech-gradient text-white shadow-lg hover:shadow-xl hover:scale-[1.05] hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 relative overflow-hidden before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent hover:before:left-[100%] before:transition-all before:duration-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-6 text-base",
        xl: "h-14 rounded-xl px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }