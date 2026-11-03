// Loader used globally
export function Loader() {
    return (
        <div className='flex h-64 items-center justify-center' role='status' aria-label='Loading'>
            <div className='h-10 w-10 animate-spin rounded-full border-[3px] border-mist border-t-accent'/>
        </div>
    );
}
