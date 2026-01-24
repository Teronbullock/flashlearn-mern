import { MobileBtnProps } from "@/types/index/navTypes";
import classNames from "classnames";
import "./mobile-menu-btn.scss";

export const MobileMenuBtn = ({
  onToggle,
  isMobileMenuOpen,
}: MobileBtnProps) => {
  const btnClass = classNames(
    "btn-mobile-toggle absolute right-2 z-[500] inline-flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-full border-0 bg-white outline-none md:hidden",
    { change: isMobileMenuOpen },
  );

  return (
    <button className={btnClass} onClick={onToggle}>
      <div className="btn-bars flex h-6 w-6 flex-col items-center justify-around py-1">
        <div className="btn-bar1 mx-0 bg-black"></div>
        <div className="btn-bar2 mx-0 bg-black"></div>
        <div className="btn-bar3 mx-0 bg-black"></div>
      </div>
    </button>
  );
};
