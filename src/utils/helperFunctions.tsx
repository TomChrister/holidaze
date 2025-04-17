// Helper functions
import { CustomArrowProps } from 'react-slick';

// Big first letter in titles
export const capitalizeLetter = (name: string): string => {
    if (!name) return name;
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// Max 30 chars for titles
export function truncate(text: string, maxLength = 30) {
    return text.length > maxLength ? text.slice(0, maxLength) + '..' : text
}

// Display better date format
export function formatDate(dateSting: string) {
    const data = new Date(dateSting);
    return data.toLocaleDateString('no-NO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

// Custom carousel buttons
export function NextArrow(props: CustomArrowProps) {
    const { onClick } = props;
    return (
        <div
            className='absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer text-white rounded-full p-2'
            onClick={onClick}
        >
            ›
        </div>
    );
}

export function PrevArrow(props: CustomArrowProps) {
    const { onClick } = props;
    return (
        <div
            className='absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer bg-white/70 rounded-full p-2'
            onClick={onClick}
        >
            ‹
        </div>
    );
}
