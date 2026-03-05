export interface CTASplitContentBase {
  children: React.ReactNode;
  title: string;
  subTitle?: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface CTASplitContentProps extends CTASplitContentBase {
  bottomOfFormSlot?: React.ReactNode;
}

export interface CTASplitLayoutProps extends CTASplitContentBase {
  rightColSize?: "full" | undefined;
}

export interface CTASplitFormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  ctaBtnSize?: "full" | "md" | undefined;
  cta: string;
  className?: string;
}