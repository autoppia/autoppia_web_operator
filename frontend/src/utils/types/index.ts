export interface I_Chat {
  role: string;
  content?: string;
  socketId?: string;
  actions?: string[];
  thinking?: string;
  state?: string;
}

export interface I_SideBar {
  open: boolean;
  toggleSideBar: () => void;
}

export interface I_WebsiteItem {
  icon: any;
  title: string;
  url: string;
  onClick?: (url: string) => void;
}

export interface I_WebSiteUrl {
  icon: any;
  title: string;
  url: string;
}

export interface I_IconButton {
  icon: any;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface I_Task {
  task: string; 
  url: string;
}
