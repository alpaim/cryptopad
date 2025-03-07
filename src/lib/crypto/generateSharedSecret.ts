export const generateSharedSecret = async (
    privateKeyRaw: ArrayBuffer,
    otherPublicKeyRaw: ArrayBuffer,
): Promise<ArrayBuffer> => {
    const privateKey = new Uint8Array(privateKeyRaw);
    const otherPublicKey = new Uint8Array(otherPublicKeyRaw);
    const privateKeyObj = await window.crypto.subtle.importKey(
        "pkcs8",
        privateKey,
        {
            name: "ECDH",
            namedCurve: "P-256",
        },
        false,
        ["deriveBits"],
    );

    const publicKeyObj = await window.crypto.subtle.importKey(
        "spki",
        otherPublicKey,
        {
            name: "ECDH",
            namedCurve: "P-256",
        },
        false,
        [],
    );

    const sharedSecret = await window.crypto.subtle.deriveBits(
        {
            name: "ECDH",
            public: publicKeyObj,
        },
        privateKeyObj,
        256,
    );

    return sharedSecret;
};