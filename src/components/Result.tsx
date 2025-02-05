import { FC } from "react";
import { copyToClipboard } from "../lib/utlis/copyToClipboard.ts";

interface Props {
    value: string
}

export const Result: FC<Props> = ({ value }) => {
    return (
        <div className="mt-3 pt-4 border-t-2 border-dashed border-gray-200">
            <textarea
                id="result"
                value={value}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-pointer"
                onClick={() => copyToClipboard(value)}
                rows={4}
            />
        </div>
    );
};