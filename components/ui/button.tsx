import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm sm:text-base font-bold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none active:scale-[0.98] cursor-pointer",
  {
    variants: {
      variant: {
        default: "btn-theme-primary",
        outline: "btn-theme-outline",
        destructive:
          "h-12 bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-500/20 hover:from-red-700 hover:to-rose-700 hover:shadow-lg hover:shadow-red-600/30 border-0",
        secondary:
          "h-12 bg-blue-50 text-blue-700 hover:bg-gradient-to-r hover:from-blue-600 hover:via-blue-700 hover:to-indigo-600 hover:text-white shadow-xs hover:shadow-md",
        ghost:
          "h-12 hover:bg-blue-50 hover:text-blue-700 transition-colors",
        link: "text-blue-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "px-6",
        full: "w-full px-4",
        action: "w-full sm:w-56 px-6",
        sm: "h-9 rounded-lg gap-1.5 px-4 text-xs font-semibold",
        lg: "px-8 text-base",
        icon: "size-12 rounded-xl p-0",
        "icon-sm": "size-9 rounded-lg p-0",
        "icon-lg": "size-14 rounded-xl p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
