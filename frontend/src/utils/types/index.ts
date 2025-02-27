export interface I_O_Res {
  content: string;
  status?: string;
  period?: number;
  action?: string[];
  thinking?: string;
}

export interface I_U_Msg {
  content: string;
}

export interface I_SideBar {
  open: boolean;
  onClick: () => void;
}

export interface I_WebsiteItem {
  icon: any;
  title: string;
  url: string;
  onClick?: (url: string, name: string) => void;
}

export interface I_WebSiteUrl {
  icon: any;
  title: string;
  url: string;
}
