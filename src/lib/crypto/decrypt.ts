import { importKey } from "./importKeyFromBase64.ts";
import { generateSharedSecret } from "./generateSharedSecret.ts";
import { EncryptedMessage } from "../../types/message.ts";
import { decryptMessage } from "./decryptMessage.ts";

export const decrypt = async (
    myPrivateKey: string, theirPublicKey: string, message: string,
): Promise<string> => {
    const myPrivateKeyBuffer = importKey(myPrivateKey);
    const theirPublicKeyBuffer = importKey(theirPublicKey);
    const sharedSecret = await generateSharedSecret(myPrivateKeyBuffer, theirPublicKeyBuffer);

    const encryptedMessageFromB64 = atob(message);
    const encryptedMessage: EncryptedMessage = JSON.parse(encryptedMessageFromB64);

    const decryptedMessage = await decryptMessage(encryptedMessage, sharedSecret);

    return decryptedMessage;
};