const POSITION_CLASSES = {
  bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
  top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
};

const Tooltip = ({ label, position = "bottom", className = "", children }) => {
  const positionClass = /\babsolute\b/.test(className) ? "" : "relative";

  return (
    <span className={`${positionClass} inline-flex group/tooltip ${className}`}>
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute ${POSITION_CLASSES[position]} z-20 whitespace-nowrap rounded-md bg-text text-bg text-xs font-medium px-2.5 py-1.5 opacity-0 scale-95 transition-all duration-150 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:scale-100`}
      >
        {label}
      </span>
    </span>
  );
};

export default Tooltip;
