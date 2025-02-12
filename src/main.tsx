import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Cryptopad } from "./components/Cryptopad.tsx";
import { CryptoWorker } from "./components/CryptoWorker.tsx";
import { Toaster } from "sonner";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <CryptoWorker />

        <Cryptopad />

        <Toaster />
    </StrictMode>,
);
