export interface CurrentPageInterface {
  currentPage: 'indexPage' | 'dashboardPage' | 'setPage' | 'createSetPage' | 'editSetPage' | 'addCardPage' | 'editCardPage' | 'viewCardsPage' | 'profilePage';
  className?: string;
}

export interface PageHeaderProps extends CurrentPageInterface {
  children?: React.ReactNode;
}

export interface HeaderInterface {
  title: string;
  copy: string;
  headerNav?: {
    className?: string;
    btnText: string;
    to: string;
    elementType?: 'anchor' | 'btn';
    ariaLabel: string;
    dataType?: string;
  }[];
}

export interface PageHeaderNavItem {
  className?: string;
  btnText?: string;
  to?: string;
  elementType?: 'anchor' | 'btn'| null;
  ariaLabel?: string;
  dataType?: string;
}