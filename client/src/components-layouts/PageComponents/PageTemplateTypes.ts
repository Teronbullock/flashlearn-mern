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
  headerNav?: [
    {
      className: string;
      btnText: string;
      to: string;
      elementType: 'anchor' | 'btn';
      ariaLabel: string;
      dataType: string;
    }
  ];
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
    pageType: string;
    mainClass: string;
    hero: HeroData;
    header: HeaderData;
  };

  children: React.ReactNode;
}

export interface PageHeaderNavItem {
  className: string;
  btnText: string;
  to: string;
  elementType: 'anchor' | 'btn';
  ariaLabel: string;
  dataType: string;
}