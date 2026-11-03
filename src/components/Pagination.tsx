import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
    page: number;
    setPage: (page: number) => void;
    totalItems: number;
    limit: number;
};

export function Pagination({ page, setPage, totalItems, limit }: PaginationProps) {
    const start = (page - 1) * limit;
    const totalPages = Math.ceil(totalItems / limit);

    return (
        <div className='flex items-center justify-center gap-3 py-12'>
            <button
                onClick={() => setPage(Math.max(page - 1, 1))}
                disabled={page === 1}
                className='btn-secondary px-4'
            >
                <ChevronLeft size={18}/>
                Previous
            </button>

            <span className='px-2 text-sm font-semibold text-graphite'>
                Page {page} of {totalPages}
            </span>

            <button
                onClick={() => setPage(page + 1)}
                disabled={start + limit >= totalItems}
                className='btn-secondary px-4'
            >
                Next
                <ChevronRight size={18}/>
            </button>
        </div>
    );
}
