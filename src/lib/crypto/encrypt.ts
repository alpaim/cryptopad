import { importKey } from "./importKeyFromBase64.ts";
import { generateSharedSecret } from "./generateSharedSecret.ts";
import { encryptMessage } from "./encryptMessage.ts";

export const encrypt = async (
    myPrivateKey: string, theirPublicKey: string, message: string,
): Promise<string> => {
    const myPrivateKeyBuffer = importKey(myPrivateKey);
    const theirPublicKeyBuffer = importKey(theirPublicKey);
    const sharedSecret = await generateSharedSecret(myPrivateKeyBuffer, theirPublicKeyBuffer);

    const encryptedMessage = await encryptMessage(message, sharedSecret);
    const encryptedMessageJSON = JSON.stringify(encryptedMessage);
    const encryptedMessageB64 = btoa(encryptedMessageJSON);

    return encryptedMessageB64;
};