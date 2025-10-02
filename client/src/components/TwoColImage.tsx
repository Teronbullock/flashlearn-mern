import { SectionTwoCol } from "@components/SectionTwoCol";
import { ContentBlock } from "@components/ContentBlock";

interface TwoColImageProps {
  img: {
    src: string;
    alt: string;
    caption?: string;
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

export const TwoColImage = ({ img, content, ...props }: TwoColImageProps) => {
  const { title, copy } = content;
  const { src, alt, caption } = img;

  return (
    <SectionTwoCol {...props}>
      <div
        className="mb-4 flex flex-col justify-end md:mb-0 md:max-w-[50%] md:flex-1"
        data-js="two-col-img-header"
      >
        <img className="w-full rounded-[20px]" src={src} alt={alt} />
        {caption && (
          <figcaption className="img__caption sr-only mt-2 text-center">
            {caption}
          </figcaption>
        )}
      </div>

      <div
        className="flex flex-col justify-start md:flex-1"
        data-js="two-col-img-content"
      >
        {content && (
          <>
            <ContentBlock title={title} copy={copy} />
          </>
        )}
      </div>
    </SectionTwoCol>
  );
};
