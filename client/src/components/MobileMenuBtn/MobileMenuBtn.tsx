import './MobileMenuBtn.scss';

type MobileMenuBtnProps = {
  onClick: () => void;
};

const MobileMenuBtn = ({onClick}: MobileMenuBtnProps) => {
  return (
    <button className="btn-mobile-toggle w-[40px] h-[40px] rounded border-0 bg-white inline-block absolute right-4 cursor-pointer z-[500] outline-none md:hidden"
    onClick={onClick}
    >
      <div className="btn-bar1 bg-black my-2 mx-0"></div>
      <div className="btn-bar2 bg-black my-2 mx-0"></div>
      <div className="btn-bar3 bg-black my-2 mx-0"></div>
    </button>
  )
};

export default MobileMenuBtn;