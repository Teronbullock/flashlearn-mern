import { SectionTwoCol } from "@components/layout/sections";
import { ContentBlock } from "@components/ui/ContentBlock";

interface TwoColImageProps {
  img: {
    src: string;
    alt: string;
  };
  content: {
    title: string;
    copy: string;
  };
  isReversed?: boolean;
  className?: {
    main?: string;
    container?: string;
    inner?: string;
  };
}

export const TwoColImage = ({
  img: { src, alt },
  content: { title, copy },
  ...props
}: TwoColImageProps) => {
  return (
    <SectionTwoCol {...props}>
      <div
        className="mb-4 flex flex-col justify-end md:mb-0 md:max-w-[50%] md:flex-1"
        data-name="two-col-img-header"
      >
        <img className="w-full rounded-[20px]" src={src} alt={alt} />
      </div>

      <div
        className="flex flex-col justify-start md:flex-1"
        data-name="two-col-img-content"
      >
        <ContentBlock title={title} copy={copy} />
      </div>
    </SectionTwoCol>
  );
};
