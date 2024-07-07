export interface CurrentPage {
  currentPage: 'indexPage' | 'dashboardPage' | 'setPage' | 'createSetPage' | 'editSetPage' | 'addCardPage' | 'editCardPage' | 'viewCardsPage';
}

export interface PageHeaderProps extends CurrentPage {
  headerNav?: {
      className?: string;
      btnText?: string;
      to?: string;
      elementType?: 'anchor' | 'btn';
      ariaLabel?: string;
  }[];
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