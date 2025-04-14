// Helper functions

// Big first letter in titles
export const capitalizeLetter = (name: string): string => {
    if (!name) return name;
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// Max 30 chars for titles
export function truncate(text: string, maxLength = 30){
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