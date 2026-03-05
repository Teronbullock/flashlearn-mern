import classNames from "classnames";
import { type CTASplitContentProps } from "@components/layout/cta-split";

export const CTASplitContent = ({
  children,
  image,
  title,
  subTitle,
  bottomOfFormSlot,
}: CTASplitContentProps) => {
  const rightColClass = classNames("w-full md:w-[50%]", {
    "md:mt-11": true, // Always apply this class since there's no form
  });

  return (
    <section className="max-w-8xl mb-15 container mx-auto mt-8 flex px-4 py-12">
      <div className="lg:mr-15 hidden md:mr-10 md:block md:w-[50%]">
        <img
          src={image.src}
          alt={image.alt}
          className="w-full rounded-[20px]"
        />
      </div>
      <div className={rightColClass}>
        <div className="max-w-133 mx-auto">
          <div className="mb-7">
            <div className="mb-10">
              <h1 className="font-bold! mb-2 text-3xl">{title}</h1>
              {subTitle && <p className="text-gray-600">{subTitle}</p>}
            </div>
            {children}
          </div>
          {bottomOfFormSlot}
        </div>
      </div>
    </section>
  );
};
