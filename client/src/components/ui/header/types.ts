export interface BasicHeaderClassName {
  container?: string;
  title?: string;
  subtitle?: string;
}

export interface SectionHeaderClassName extends BasicHeaderClassName {
  section?: string;
}

export interface BasicHeaderTitleProps {
  title: string;
  subTitle?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export interface BasicHeaderProps extends BasicHeaderTitleProps {
  className?: BasicHeaderClassName;
}

export interface SectionHeaderProps extends BasicHeaderTitleProps {
  showIcons?: boolean;
  className?: SectionHeaderClassName;
}
