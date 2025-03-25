export interface I_Action {
  name: string;
  icon: any;
}

export interface I_Chat {
  role: string;
  content?: string;
  socketId?: string;
  period?: number;
  actions?: I_Action[];
  thinking?: string;
  state?: string;
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

export interface I_Task {
  task: string; 
  url: string;
}
