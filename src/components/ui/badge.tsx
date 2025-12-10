import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow",
        success:
          "border-transparent bg-success text-success-foreground shadow",
        warning:
          "border-transparent bg-warning text-warning-foreground shadow",
        info:
          "border-transparent bg-info text-info-foreground shadow",
        outline:
          "border-border text-foreground",
        ghost:
          "border-transparent bg-muted text-muted-foreground",
        // Role badges
        superAdmin:
          "border-transparent bg-destructive/10 text-destructive shadow-sm",
        admin:
          "border-transparent bg-primary/10 text-primary shadow-sm",
        manager:
          "border-transparent bg-accent/10 text-accent shadow-sm",
        editor:
          "border-transparent bg-success/10 text-success shadow-sm",
        viewer:
          "border-transparent bg-muted text-muted-foreground shadow-sm",
        // Permission badges
        create:
          "border-transparent bg-success/10 text-success",
        read:
          "border-transparent bg-info/10 text-info",
        update:
          "border-transparent bg-warning/10 text-warning",
        delete:
          "border-transparent bg-destructive/10 text-destructive",
        // Achievement badges
        gold:
          "border-transparent bg-gradient-to-br from-yellow-400 to-amber-500 text-amber-900",
        silver:
          "border-transparent bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800",
        bronze:
          "border-transparent bg-gradient-to-br from-orange-400 to-orange-600 text-orange-900",
        platinum:
          "border-transparent bg-gradient-to-br from-cyan-300 to-cyan-500 text-cyan-900",
        // Status
        online:
          "border-transparent bg-success/20 text-success",
        offline:
          "border-transparent bg-muted text-muted-foreground",
        away:
          "border-transparent bg-warning/20 text-warning",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
