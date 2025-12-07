export const DateFormatter = (date: Date) => {
    const newDate = new Date(date);
    const dates = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    return `${String(dates).padStart(2, '0')}/${month}/${year}`
}