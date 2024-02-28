import clsx from "clsx";

const dots = "mx-[1px] inline-block h-1 w-1 rounded-md bg-current"; // Assuming 'bg-current' for color

const LoadingDots = ({
  className,
  text,
}: {
  className?: string;
  text?: string;
}) => {
  return (
    <div className={clsx("text-center", className)}>
      {" "}
      {/* Added text-center for alignment */}
      <span className="mx-2 inline-flex items-center">
        <span className={clsx(dots, "animate-blink")} />
        <span
          className={clsx(dots, "animate-blink", "animation-delay-[200ms]")}
        />
        <span
          className={clsx(dots, "animate-blink", "animation-delay-[400ms]")}
        />
      </span>
      {text && <div className="mt-2">{text}</div>}{" "}
      {/* Conditionally render text if provided */}
    </div>
  );
};

export default LoadingDots;
