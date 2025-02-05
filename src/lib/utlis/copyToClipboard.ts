import { toast } from "react-toastify";

export const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.info("Copied to clipboard");
};