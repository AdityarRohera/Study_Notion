type HeadingProps = {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg" | "xl";
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** 1-indexed, inclusive word range to accent. */
  highLight?: {
    start: number;
    end: number;
  };
};

const headingvariant = {
  primary: "text-white",
  secondary: "text-ink-900",
};

const headingSize = {
  sm: "text-xl sm:text-2xl font-bold",
  md: "text-2xl sm:text-3xl font-bold",
  lg: "text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.12]",
  xl: "text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05]",
};

function Heading({
  text,
  variant,
  size,
  highLight,
  as: Tag = "h2",
  className,
}: HeadingProps) {
  const words = (text ?? "").split(" ");

  const rendered = words.map((word, i) => {
    const position = i + 1;
    const isAccented =
      highLight && position >= highLight.start && position <= highLight.end;

    return (
      <span key={i} className={isAccented ? "sn-gradient-text" : undefined}>
        {word}
        {i < words.length - 1 ? " " : ""}
      </span>
    );
  });

  return (
    <Tag
      className={`${variant ? headingvariant[variant] : headingvariant.primary} ${
        size ? headingSize[size] : headingSize.md
      } ${className ?? ""}`}
    >
      {rendered}
    </Tag>
  );
}

export default Heading;
