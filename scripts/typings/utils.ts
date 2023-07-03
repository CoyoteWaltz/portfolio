export type ValueOf<T extends Record<string, any> | any[] | Readonly<any[]>> = T extends any[] ?
  T[number] : T extends Readonly<any[]> ? T[number] : {
    [k in keyof T]: T[k]
  }[keyof T]

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never } // => U without T, 把 T 独有的 key 都变成 never

export type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U // 最终生成的结果还是类似自动加 never
