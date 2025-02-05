import { FC, useEffect } from "react";
import { useCryptopadStore } from "../store/store.ts";
import { generateKeypair } from "../lib/crypto/generateKeypair.ts";

export const CryptoWorker: FC = () => {
    const keypair = useCryptopadStore(state => state.keypair);

    const setKeypair = useCryptopadStore(state => state.setKeypair);

    useEffect(() => {
        const f = async () => {
            const kp = await generateKeypair();

            if (!kp) {return;}

            setKeypair(kp);
        };

        if (keypair === undefined) {
            f().then(() => {});
        }
    }, [keypair, setKeypair]);

    return null;
};