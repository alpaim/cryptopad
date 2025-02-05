import { FC } from "react";

interface Props {
    activeTab: "encrypt" | "decrypt";
    setActiveTab: (activeTab: "encrypt" | "decrypt") => void;
}

export const TabToggle: FC<Props> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="mb-6">
            <div className="flex border-b border-gray-200">
                <button
                    className={`py-2 px-4 cursor-pointer ${activeTab === "encrypt" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
                    onClick={() => setActiveTab("encrypt")}
                >
                    Encrypt
                </button>
                <button
                    className={`py-2 px-4 cursor-pointer ${activeTab === "decrypt" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
                    onClick={() => setActiveTab("decrypt")}
                >
                    Decrypt
                </button>
            </div>
        </div>
    );
};