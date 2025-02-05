import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Keypair } from "../types/keypair.ts";

interface UserSettings {
    keypair: Keypair | undefined;
    setKeypair: (keypair: Keypair) => void;

    reset: () => void;
}

export const useCryptopadStore = create<UserSettings>()(
    persist(
        (set) => ({
            keypair: undefined,
            setKeypair: (keypair) => set({ keypair }),
            reset: () => set({
                keypair: undefined,
            }),
        }),
        {
            name: "cryptopad-store",
        },
    ),
);