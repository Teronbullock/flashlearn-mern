export interface PageHeroData {
  isIndexPage?: boolean;
  heroClass: string;
  containerClass?: string;
  altSection?: boolean;
  ariaLabel?: string;
  title: string;
  subtitle?: string;
  copy?: string;
  contentClass?: string;
  img?: string;
}

export interface PageHeroProps {
  PageHeroData: PageHeroData;
}


export interface PageTemplateProps {
  pageData: {
    mainClass: string;
  };
  PageHeroData: PageHeroData;
  children: React.ReactNode;
}
