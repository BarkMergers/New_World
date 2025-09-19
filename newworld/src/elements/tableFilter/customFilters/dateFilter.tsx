import { useEffect, useRef, useState } from "react";
import type { FilterDefinition } from "../../../models/FilterDefinition";

type DateMode = "before" | "after" | "between";

export default function DateFilter({
    applyFilter,
    filterKey
}: {
    value: FilterDefinition; // kept for compatibility
    applyFilter: (payload: string, filterKey: string) => void;
    filterKey: string;
}) {
    const [mode, setMode] = useState<DateMode>("before");
    const [date1, setDate1] = useState<string>("");
    const [date2, setDate2] = useState<string>("");

    const [isOpen, setIsOpen] = useState(false);
    const [displayValue, setDisplayValue] = useState<string>("");

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleApply = () => {
        let summary = "";
        let payload: Record<string, string> = { mode };

        if (mode === "before" && date1) {
            payload = { mode, date: date1 };
            summary = `Before ${formatDate(date1)}`;
        } else if (mode === "after" && date1) {
            payload = { mode, date: date1 };
            summary = `After ${formatDate(date1)}`;
        } else if (mode === "between" && date1 && date2) {
            payload = { mode, from: date1, to: date2 };
            summary = `Between ${formatDate(date1)} and ${formatDate(date2)}`;
        }

        if (summary) {
            setDisplayValue(summary);
            applyFilter(JSON.stringify(payload), filterKey);
        }

        setIsOpen(false); // close dropdown after apply
    };

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-GB"); // e.g. 19/09/2025
    };

    const buttonText = displayValue || "Filter by date";

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                if (isOpen) handleApply();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, mode, date1, date2]);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            {/* Toggle Button */}
            <button
                className="btn btn-accent h-8 align-top"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {buttonText}
            </button>

            {/* Dropdown Content */}
            {isOpen && (
                <div
                    className="absolute mt-2 bg-base-100 border rounded-lg shadow-lg w-72 p-4 space-y-3"
                    style={{ zIndex: 100000 }}
                >
                    {/* Mode Selector */}
                    <select
                        className="select select-bordered w-full"
                        value={mode}
                        onChange={(e) => setMode(e.target.value as DateMode)}
                    >
                        <option value="before">Before Date</option>
                        <option value="after">After Date</option>
                        <option value="between">Between Dates</option>
                    </select>

                    {/* Date Inputs */}
                    {(mode === "before" || mode === "after") && (
                        <input
                            type="date"
                            className="input input-bordered w-full"
                            value={date1}
                            onChange={(e) => setDate1(e.target.value)}
                        />
                    )}

                    {mode === "between" && (
                        <div className="flex gap-2">
                            <input
                                type="date"
                                className="input input-bordered flex-1"
                                value={date1}
                                onChange={(e) => setDate1(e.target.value)}
                            />
                            <input
                                type="date"
                                className="input input-bordered flex-1"
                                value={date2}
                                onChange={(e) => setDate2(e.target.value)}
                            />
                        </div>
                    )}

                    {/* Apply Button */}
                    <button
                        className="btn btn-accent w-full"
                        onClick={handleApply}
                        disabled={
                            (mode === "between" && (!date1 || !date2)) ||
                            ((mode === "before" || mode === "after") && !date1)
                        }
                    >
                        Apply
                    </button>
                </div>
            )}
        </div>
    );
}
