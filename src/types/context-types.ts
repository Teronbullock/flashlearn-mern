export interface AuthContextValue {
  userId?: string | null;
  setUserID?: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn?: boolean;
  token?: string | null;
  setToken?: React.Dispatch<React.SetStateAction<string | null>>;
  login?: (userId: string, token: string, expirationDate?: Date | null) => void ;
  logout?: () => void;
  tokenExpiration?: Date | null;
}

export interface ContextProviderProps {
  children: React.ReactNode;
}


// export type PageNames = 'indexPage' | 'dashboardPage' | 'setPage' | 'createSetPage' | 'editSetPage' | 'addSetPage' | 'editCardPage' | 'viewCardPage';

// export interface PageContent {
//   {
//     pageType: string;
//     mainClass: string;
//     hero: {
//       heroClass: string;
//       ariaLabel: string;
//       img: string;
//     };
//     header: {
//       title: string;
//       copy: string;
//       headerNav: {
//         className?: string;
//         btnText: string;
//         to: string;
//         elementType: 'anchor' | 'btn';
//         ariaLabel: string;
//         dataType?: string;
//       }[];
//     };
//   }
// }