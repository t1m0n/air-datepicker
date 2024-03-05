export const DAY =  1000 * 60 * 60 * 24;

export function sleep(timeout = 100) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}
