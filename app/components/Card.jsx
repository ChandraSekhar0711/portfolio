const Card = ({ as: Tag = "div", hover = true, className = "", children, ...props }) => {
  return (
    <Tag
      className={`bg-card border border-border rounded-2xl shadow-card ${
        hover ? "transition-all duration-300 hover:border-accent/40 hover:shadow-glow" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Card;
