import { EncryptedMessage } from "../../types/message.ts";

export const encryptMessage = async (
    message: string,
    sharedSecret: ArrayBuffer,
): Promise<EncryptedMessage> => {
    const iv = window.crypto.getRandomValues(new Uint8Array(16));

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
        ["encrypt"],
    );

    const messageBuffer = new TextEncoder().encode(message);

    const encryptedData = await window.crypto.subtle.encrypt(
        {
            name: "AES-CBC",
            iv: iv,
        },
        key,
        messageBuffer,
    );

    const ivB64 = btoa(String.fromCharCode(...new Uint8Array(iv)));
    const encryptedB64 = btoa(String.fromCharCode(...new Uint8Array(encryptedData)));

    return {
        iv: ivB64,
        encryptedData: encryptedB64,
    };
};