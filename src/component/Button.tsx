import { cn } from "../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={cn(
        "btn-primary disabled:!opacity-20 disabled:cursor-not-allowed disabled:pointer-events-none",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
