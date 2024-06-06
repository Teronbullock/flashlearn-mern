export interface HeroData {
  type?: string;
  heroClass?: string;
  ariaLabel?: string;
  img?: string;
  title?: string;
  copy?: string;
}

export interface HeaderData {
  headerClass?: string;
  altSection?: boolean;
  ariaLabel?: string;
  title?: string;
  copy?: string;
  headerContainerClass?: string;
  contentClass?: string;
  children?: React.ReactNode;
}

export interface PageHeaderProps {
  headerData: HeaderData;
  children: React.ReactNode;
}

export interface PageHeroProps {
  heroData: HeroData;
}

export interface PageTemplateProps {
  pageData: {
    type: string;
    mainClass: string;
    hero: HeroData;
    header: HeaderData;
  };

  children: React.ReactNode;
}
