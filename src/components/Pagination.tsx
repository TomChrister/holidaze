type PaginationProps = {
    page: number;
    setPage: (page: number) => void;
    totalItems: number;
    limit: number;
};

export function Pagination({ page, setPage, totalItems, limit }: PaginationProps) {
    const start = (page - 1) * limit;

    return (
        <div className='flex justify-center gap-4 py-12'>
            <button
                onClick={() => setPage(Math.max(page - 1, 1))}
                disabled={page === 1}
                className='rounded bg-gray-200 px-4 py-2 cursor-pointer disabled:opacity-50'
            >
                Previous
            </button>

            <span className='flex items-center'>Page {page}</span>

            <button
                onClick={() => setPage(page + 1)}
                disabled={start + limit >= totalItems}
                className='rounded bg-gray-200 px-4 py-2 cursor-pointer disabled:opacity-50'
            >
                Next
            </button>
        </div>
    );
}
