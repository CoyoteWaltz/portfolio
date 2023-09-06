export async function awaitPromiseArr<T>(promiseArr: Promise<T>[]) {
  return Promise.all(promiseArr)
}
