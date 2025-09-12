/**
 * Enhanced Button component with advanced variants and accessibility
 * Usage: <Button onClick={handleClick} variant="primary" size="md">Click me</Button>
 */

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50 hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 focus-visible:ring-primary/50',
        secondary: 'bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground shadow-md shadow-secondary/20 hover:shadow-lg hover:shadow-secondary/25 focus-visible:ring-secondary/50',
        outline: 'border border-primary/30 bg-background/50 backdrop-blur-sm hover:bg-primary/5 hover:border-primary/50 focus-visible:ring-primary/50',
        ghost: 'hover:bg-primary/10 hover:text-primary focus-visible:ring-primary/50 rounded-xl',
        link: 'text-primary underline-offset-4 hover:underline focus-visible:ring-primary/50',
        destructive: 'bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground shadow-lg shadow-destructive/25 hover:shadow-xl hover:shadow-destructive/30 focus-visible:ring-destructive/50',
      },
      size: {
        sm: 'h-8 rounded-xl px-3 text-xs',
        md: 'h-10 px-6 py-2 rounded-2xl',
        lg: 'h-12 rounded-2xl px-8 text-base',
        icon: 'h-10 w-10 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export default Button
export { buttonVariants }