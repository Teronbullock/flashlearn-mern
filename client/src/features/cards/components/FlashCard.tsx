import classnames from "classnames";

interface FlashCardProps {
  children?: React.ReactNode;
  className?: string;
  isFlipped?: boolean;
}

export const FlashCard = ({
  children,
  className,
  isFlipped,
}: FlashCardProps) => {
  const flashCardClass = classnames(
    "relative w-full transform-gpu transform-3d transition-transform duration-400 h-[375px]",
    { "rotate-y-180": isFlipped },
    className,
  );

  return (
    <div data-name="flashcard" className={flashCardClass}>
      {children}
    </div>
  );
};
