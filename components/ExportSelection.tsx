import {useEffect, useState} from "react";

export const FRAMEWORKS = [
    { label: "JSON", value: "json" },
    { label: "docs", value: "docs" },
    { label: "HTML", value: "html" },
];

// @ts-ignore
export default function ExportSelection({ onSelectedExport }) {
    const [selectedOption, setSelectedOption] = useState("JSON");

    useEffect(() => {
        if (selectedOption) {
            onSelectedExport(selectedOption)
        }
    }, [selectedOption])


    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <select
                id="select-option"
                value={selectedOption}
                onChange={handleChange}
                className="px-10 py-2 text-gray-700 bg-white border border-gray-400 rounded-md focus:outline-none focus:border-purple-500"
            >
                {FRAMEWORKS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
