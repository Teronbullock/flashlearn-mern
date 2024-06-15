export interface PageTemplateProps {
  currentPage: 'indexPage' | 'dashboardPage' | 'setPage' | 'createSetPage' | 'editSetPage' | 'addCardPage' | 'editCardPage' | 'viewCardsPage';

  children: React.ReactNode;
}

export interface HeroData {
  heroClass?: string;
  ariaLabel?: string;
  img?: string;
  title?: string;
  copy?: string;
  currentPage?: string;
}

export interface HeaderData {
  headerClass?: string;
  altSection?: boolean;
  ariaLabel?: string;
  title?: string;
  copy?: string;
  headerContainerClass?: string;
  contentClass?: string;
  headerNav?: {
    className?: string;
    btnText: string;
    to: string;
    elementType?: 'anchor' | 'btn';
    ariaLabel: string;
    dataType?: string;
  }[];
}

export interface PageHeaderProps {
  headerData: HeaderData;
}

export interface PageHeroProps {
  heroData: HeroData;
}



export interface PageHeaderNavItem {
  className?: string;
  btnText: string;
  to: string;
  elementType: 'anchor' | 'btn'| null;
  ariaLabel: string;
  dataType: string;
}

export type CurrentPageType {
  currentPage: string;
}