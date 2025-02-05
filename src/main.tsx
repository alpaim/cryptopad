import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Cryptopad } from "./components/Cryptopad.tsx";
import { CryptoWorker } from "./components/CryptoWorker.tsx";
import { Bounce, ToastContainer } from "react-toastify";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <CryptoWorker />

        <Cryptopad />

        <ToastContainer
            position="bottom-right"
            autoClose={2_500}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
            theme="dark"
            transition={Bounce}
        />
    </StrictMode>,
);
