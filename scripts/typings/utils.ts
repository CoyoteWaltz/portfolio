export type ValueOf<T extends Record<string, any> | any[] | Readonly<any[]>> = T extends any[] ?
  T[number] : T extends Readonly<any[]> ? T[number] : {
    [k in keyof T]: T[k]
  }[keyof T]

// const ae = ['213', 1] as const

// type ew = ValueOf<[1, 2, 3, 4]>
// type eweee = ValueOf<typeof ae>
// type ewee = ValueOf<{
//   abd: 123
//   dfaef: '123'
// }>
