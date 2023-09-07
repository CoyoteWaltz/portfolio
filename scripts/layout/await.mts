export const awaitPromiseArr = <T extends readonly unknown[] | []>(promiseArr: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }> => Promise.all(promiseArr)
