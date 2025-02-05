import { EncryptedMessage } from "../../types/message.ts";

export const decryptMessage = async (
    encrypted: EncryptedMessage,
    sharedSecret: ArrayBuffer,
): Promise<string> => {
    const iv = Uint8Array.from(atob(encrypted.iv), c => c.charCodeAt(0));
    const encryptedData = Uint8Array.from(atob(encrypted.encryptedData), c => c.charCodeAt(0));

    const keyMaterial = await window.crypto.subtle.digest(
        "SHA-256",
        sharedSecret,
    );

    const key = await window.crypto.subtle.importKey(
        "raw",
        keyMaterial,
        {
            name: "AES-CBC",
            length: 256,
        },
        false,
        ["decrypt"],
    );

    const decryptedContent = await window.crypto.subtle.decrypt(
        {
            name: "AES-CBC",
            iv: iv,
        },
        key,
        encryptedData,
    );

    return new TextDecoder().decode(decryptedContent);
};