export type GlobalData = {
    SetSpinnerVisible: (value1: boolean) => void;
    ShowMessage: (message: string, title: string, icon: "success" | "warning" | "question" | "error") => void;
}