export const truncate = (title: string) => {
    if (title.length > 13) {
        return title.slice(0, 10) + '...';
    }
    return title;
};