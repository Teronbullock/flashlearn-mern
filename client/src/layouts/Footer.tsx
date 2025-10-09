import footerContent from "@content/footer.json";

export default function Footer() {
  const { header, copy, quickLinks, contactUs, copyright } = footerContent;

  return (
    <footer
      className="footer text-color-black bg-color-white mt-auto w-full text-xl"
      data-name="footer"
    >
      <div className="max-w-8xl container mx-auto mb-9 flex flex-col justify-between px-4 md:flex-row">
        <div className="md:flex-3 mb-5 md:mb-0 md:pr-[12%]">
          <h2 className="font-cursive mb-3 text-xl">{header}</h2>
          <p className="text-base">{copy}</p>
        </div>
        <div className="mb-5 w-[233px] md:mb-0 md:mr-14">
          <h3 className="mb-3 text-lg font-semibold md:mb-8">Quick Links</h3>
          {quickLinks.map((item) => (
            <p key={item.key} className="mb-3 text-base md:mb-4">
              {item.text}
            </p>
          ))}
        </div>
        <div className="mb-5 md:mb-0" data-name="footer-right-col">
          <h3 className="mb-3 text-lg font-semibold md:mb-8">Contact Us</h3>
          <p className="text-base">{contactUs.email}</p>
        </div>
      </div>
      <div className="bg-primary h-15 flex items-center justify-center rounded-tl-[20px] rounded-tr-[20px] text-white">
        <p className="text-base">{copyright}</p>
      </div>
    </footer>
  );
}
