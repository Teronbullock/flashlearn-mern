import { SectionHeader } from "@components/ui/header";
import classNames from "classnames";

interface CTASplitLayoutProps {
  children: React.ReactNode;
  rightColSize?: "full" | undefined;
  title: string;
  subTitle?: string;
  image: {
    src: string;
    alt: string;
  };
}

export const CTASplitLayout = ({
  children,
  image,
  rightColSize = "full",
  title,
  subTitle,
}: CTASplitLayoutProps) => {
  const rightColClass = classNames("w-full md:w-[50%]", {
    "md:mt-11": rightColSize == "full",
  });

  return (
    <section className="max-w-8xl mb-15 container mx-auto mt-8 flex px-4 py-12">
      <div className="lg:mr-15 hidden md:mr-10 md:block md:w-[50%]">
        <img
          src={image.src}
          alt={image.alt}
          className="w-[100%] rounded-[20px]"
        />
      </div>
      <div className={rightColClass}>
        {title && (
          <SectionHeader
            showIcons={false}
            title={title}
            subTitle={subTitle ? subTitle : ""}
            className={{ section: "mb-10", title: "!font-medium" }}
          />
        )}
        <div className="mx-auto max-w-[532px]">{children}</div>
      </div>
    </section>
  );
};
