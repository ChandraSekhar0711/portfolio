const SectionWrapper = ({ id, className = "", children }) => {
  return (
    <section id={id} className={`w-full px-[6%] sm:px-[10%] py-20 sm:py-24 scroll-mt-24 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
};

export default SectionWrapper;
