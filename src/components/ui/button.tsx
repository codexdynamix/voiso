import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

// eslint-disable-next-line react-refresh/only-export-components
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-[#0071e3] text-white hover:bg-[#2997ff] shadow-sm shadow-[#0071e3]/20 border border-white/10",
        line:
          "border border-white/12 bg-white/[0.04] text-fg hover:bg-white/[0.08] hover:border-white/20 backdrop-blur-md",
        ghost:
          "bg-transparent text-muted hover:text-fg hover:bg-white/[0.06]",
        call:
          "bg-[#30d158] text-black font-semibold hover:bg-[#34c759] shadow-md shadow-[#30d158]/25",
        hangup:
          "bg-[#ff453a] text-white font-semibold hover:bg-[#ff3b30] shadow-md shadow-[#ff453a]/25",
      },
      size: {
        sm: "min-h-9 px-3.5 text-xs rounded-full",
        md: "min-h-11 px-5 text-sm rounded-full",
        lg: "min-h-12 px-6 text-base rounded-full font-semibold",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
