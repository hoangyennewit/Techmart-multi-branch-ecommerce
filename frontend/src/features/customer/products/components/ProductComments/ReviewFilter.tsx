type Props = {
    activeFilter: number;
    onFilterChange: (rating: number) => void;
    totalReviews: number;
    counts: Record<number, number>;
};

export default function ReviewFilter({ activeFilter, onFilterChange, totalReviews, counts }: Props) {
    const filters = [
        { label: "Tất cả", value: 0, count: totalReviews },
        { label: "5 Sao", value: 5, count: counts[5] || 0 },
        { label: "4 Sao", value: 4, count: counts[4] || 0 },
        { label: "3 Sao", value: 3, count: counts[3] || 0 },
        { label: "2 Sao", value: 2, count: counts[2] || 0 },
        { label: "1 Sao", value: 1, count: counts[1] || 0 },
    ];

    return (
        <div className="flex flex-wrap gap-2 mb-8">
            <span className="w-full text-sm font-semibold text-gray-700 mb-2">Lọc theo:</span>
            {filters.map((filter) => (
                <button
                    key={filter.value}
                    onClick={() => onFilterChange(filter.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                        ${
                            activeFilter === filter.value
                                ? "bg-purple-50 border-purple-600 text-purple-700 ring-1 ring-purple-600 shadow-sm"
                                : "bg-white border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600"
                        }
                    `}
                >
                    {filter.label} <span className="opacity-70 ml-1">({filter.count})</span>
                </button>
            ))}
        </div>
    );
}

