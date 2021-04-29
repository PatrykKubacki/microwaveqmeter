export const formatQFactor = (value: number) => {
    if(value >= 1000) {
        return Math.round(value);
    }

    return value < 1000 && value >= 100
        ? Math.round(value * 10) / 10
        : Math.round(value * 100) / 100;
}
