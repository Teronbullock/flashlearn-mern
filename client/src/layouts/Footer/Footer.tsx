import footerContent from "@content/footer.json";

export default function Footer() {
  const { header, copy, quickLinks, contactUs, copyright } = footerContent;

  return (
    <footer className="footer text-color-black bg-color-white mt-auto w-full p-4 text-xl">
      <div className="max-w-8xl container mx-auto mb-9 flex">
        <div className="flex md:basis-[80%]">
          <div className="md:mr-[3.5rem] md:w-[550px]">
            <h2 className="font-cursive mb-3 text-xl">{header}</h2>
            <p className="text-base">{copy}</p>
          </div>
          <div>
            <h3 className="mb-8 text-lg font-semibold">Quick Links</h3>
            {quickLinks.map((item) => (
              <p className="mb-4 text-base">{item}</p>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-8 text-lg font-semibold">Contact Us</h3>
          <p className="text-base">{contactUs.email}</p>
        </div>
      </div>
      <div className="bg-primary h-15 flex items-center justify-center rounded-tl-[20px] rounded-tr-[20px] text-white">
        <p className="text-base">{copyright}</p>
      </div>
    </footer>
  );
}
