export interface I_O_Res {
  content: string;
  status?: string;
  period?: number;
  action?: string;
}

export interface I_U_Msg {
  content: string;
}

export interface I_SideBar {
  open: boolean;
  onClick: () => void;
}
