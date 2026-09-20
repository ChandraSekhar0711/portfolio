import Link from "next/link";
import { Loader2 } from "lucide-react";

const VARIANTS = {
  primary:
    "bg-accent text-accent-ink hover:opacity-90 active:opacity-80 shadow-glow",
  outline:
    "border border-border text-text hover:border-accent hover:text-accent",
  ghost: "text-text-secondary hover:text-accent",
};

const SIZES = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-base",
};

const Button = ({
  as,
  href,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = "right",
  className = "",
  children,
  ...props
}) => {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  const content = (
    <>
      {iconPosition === "left" && !loading && Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          <span>{children}</span>
        </>
      ) : (
        <span>{children}</span>
      )}
      {iconPosition === "right" && !loading && Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
    </>
  );

  if (href && !disabled) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={classes} {...props}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" disabled={disabled || loading} className={classes} {...props}>
      {content}
    </button>
  );
};

export default Button;
