
export const random = (min: number, max: number) => Math.random() * (max - min) + min;

export const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
