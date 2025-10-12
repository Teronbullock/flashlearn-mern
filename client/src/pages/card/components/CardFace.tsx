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
    "md:min-w-[650px] md:min-h-[375px] flex justify-center items-center relative p-12 bg-tertiary border-primary rounded-[20px] border",
    className,
  );

  console.log(bgColor, textColor);
  return (
    <div className={cardClass} style={{ backgroundColor: bgColor }}>
      <a className="absolute right-[26px] top-[29px]" onClick={handFlipAction}>
        <img
          className=""
          src="/assets/img/Vector-flip.png"
          alt="ArrowsCounterClockwise"
          height="23px"
          width="23px"
        />
      </a>
      <div className="">
        <p className="text-primary text-lg font-semibold">{cardText}</p>
      </div>
      <div className="">
        {/* <div className="" style={{ borderColor: textColor }}>
          <a
            className="btn btn--secondary btn--large mb-8"
            onClick={handFlipAction}
          >
            {BtnText}
          </a>
        </div> */}
        {children}
      </div>
    </div>
  );
};
