import React from "react";

export const TextFilter: React.FC<{
    value: string | undefined;
    onChange: (v: string) => void;
    placeholder?: string;
}> = ({ value = "", onChange, placeholder = "Filter..." }) => {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{
                width: "100%",
                padding: "6px 8px",
                borderRadius: 6,
                border: "1px solid #e5e7eb",
                fontSize: 13
            }}
        />
    );
};
