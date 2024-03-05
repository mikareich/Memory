type CardProps = {
  children: React.ReactNode | React.ReactNode[];
  cols?: number | "auto";
};

export default function CardContainer({ children, cols = "auto" }: CardProps) {
  return (
    <section
      className={`grid gap-4 justify-center ${
        cols === "auto"
          ? "grid-cols-[repeat(auto-fill,150px)]"
          : `grid-cols-${cols}`
      }`}
    >
      {children}
    </section>
  );
}
