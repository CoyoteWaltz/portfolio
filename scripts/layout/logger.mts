import { chalk } from 'zx'

function createLogger(fn: (...args: any[]) => void) {
  return (...args: any[]) => {
    console.log(
      fn(...args),
    )
  }
}

export const successLog = createLogger(
  chalk.green,
)

export const errorLog = createLogger(
  chalk.red,
)

export const infoLog = createLogger(
  chalk.bgGreen,
)
