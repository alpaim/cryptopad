import { FC, useEffect, useState } from "react";
import { useCryptopadStore } from "../store/store.ts";
import { Result } from "./Result.tsx";
import { RefreshCcw } from "lucide-react";
import { encrypt } from "../lib/crypto/encrypt.ts";
import { decrypt } from "../lib/crypto/decrypt.ts";
import { TabToggle } from "./TabToggle.tsx";
import { toast } from "react-toastify";
import { copyToClipboard } from "../lib/utlis/copyToClipboard.ts";

export const Cryptopad: FC = () => {
    const keypair = useCryptopadStore(state => state.keypair);
    const resetKeypair = useCryptopadStore(state => state.reset);

    const [activeTab, setActiveTab] = useState<"encrypt" | "decrypt">("encrypt");
    const [theirPublicKey, setTheirPublicKey] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [result, setResult] = useState<string>("");

    useEffect(() => {
        if (keypair === undefined) {return;}

        if (theirPublicKey === "") {return;}

        if (message === "") {return;}

        const logic = async () => {
            try {
                if (activeTab === "encrypt") {
                    const res = await encrypt(keypair.privateKey, theirPublicKey, message);
                    setResult(res);
                }

                if (activeTab === "decrypt") {
                    const res = await decrypt(keypair.privateKey, theirPublicKey, message);
                    setResult(res);
                }
            } catch (e) {
                toast.error(`${activeTab === "encrypt" ? "Encryption" : "Decryption"} error`);
                console.log("Error", e);
            }
        };

        logic().then(() => {});

    }, [theirPublicKey, message, keypair, activeTab]);

    return (
        <main className={"min-h-screen bg-gray-100 py-8"}>
            <div className="container mx-auto p-4">
                <div className="bg-white shadow-md rounded-lg w-full max-w-2xl mx-auto">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-2">Cryptopad</h2>
                        <p className="text-gray-600 mb-6">Encrypt and decrypt your messages to safely share them using
                            insecure channels</p>

                        <TabToggle activeTab={activeTab} setActiveTab={setActiveTab} />

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="publicKey" className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Public Key
                                </label>
                                <div className="flex gap-2">
                                    <div
                                        id="publicKey"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 truncate cursor-pointer"
                                        onClick={() => {
                                            if (keypair === undefined) {return;}

                                            copyToClipboard(keypair.publicKey);
                                        }}
                                    >
                                        {keypair?.publicKey}
                                    </div>
                                    <button
                                        className="px-3 py-2 border border-gray-300 rounded-md cursor-pointer"
                                        onClick={() => {resetKeypair(); toast.info("New keypair created");}}
                                    >
                                        <RefreshCcw />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="publicKey" className="block text-sm font-medium text-gray-700 mb-1">
                                    Recipient's Public Key
                                </label>
                                <input
                                    id="publicKey"
                                    placeholder="Enter recipient's public key"
                                    value={theirPublicKey}
                                    onChange={(e) => setTheirPublicKey(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    Message to {activeTab === "encrypt" ? "Encrypt" : "Decrypt"}
                                </label>
                                <textarea
                                    id="message"
                                    placeholder={`Enter message to ${activeTab}`}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={4}
                                />
                            </div>
                        </div>

                        {result && <Result value={result} />}
                    </div>
                </div>
            </div>
        </main>
    );
};
