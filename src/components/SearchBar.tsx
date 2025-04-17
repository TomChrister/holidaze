type SearchBarProps = {
    search: string;
    onSearchChange: (value: string) => void;
};

export function SearchBar({ search, onSearchChange }: SearchBarProps) {
    return (
        <input
            type="text"
            placeholder="Search titles and locations..."
            className="w-full max-w-md border p-2 rounded mb-6"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
        />
    );
}
