import classnames from "classnames";

interface CardFaceProps {
  children?: React.ReactNode;
  className?: string;
  bgColor?: string;
  textColor?: string;
  cardText?: string;
  handFlipAction: () => void;
}

export const CardFace = ({
  children,
  className,
  bgColor = "#FAEBE8",
  textColor = "#CA3916",
  cardText,
  handFlipAction,
}: CardFaceProps) => {
  const cardClass = classnames(
    // "md:min-w-[650px] md:min-h-[375px] p-12 bg-tertiary",
    "w-full backface-hidden absolute rounded-[20px] border overflow-hidden md:min-h-[375px] border-primary p-6 flex items-center justify-center",
    className,
  );

  return (
    <div className={cardClass} style={{ backgroundColor: bgColor }}>
      <a className="right-6.5 top-7.25 absolute" onClick={handFlipAction}>
        <img
          className=""
          src="public/assets/img/Vector-flip.png"
          alt="ArrowsCounterClockwise"
          height="23px"
          width="23px"
        />
      </a>
      <div className="">
        <p className="text-primary text-lg font-semibold">{cardText}</p>
      </div>
      <div className="">{children}</div>
    </div>
  );
};
