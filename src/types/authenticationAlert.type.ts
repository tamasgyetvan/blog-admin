export type AuthenticationAlert = {
    type: "error" | "warning" | "info" | "success";
    text: string | undefined;
  };