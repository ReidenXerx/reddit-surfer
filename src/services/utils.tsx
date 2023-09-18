import { Fragment } from 'react'

export const generateRandomState = (length: number): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

export const getQueryParameter = (paramName: string) =>
  new URLSearchParams(window.location.search).get(paramName)

export const returnObjectAsJSX = (obj: Record<string, any>, level = 0) => {
  const jsxArray: JSX.Element[] = []
  const getIndentStyle = (level: number) => {
    return { marginLeft: `${level * 20}px` }
  }
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      jsxArray.push(
        <Fragment key={key}>
          <div style={getIndentStyle(level)}>
            {key}:<span> </span>
            {typeof obj[key] === 'boolean'
              ? obj[key].toString()
              : typeof obj[key] === 'object'
              ? returnObjectAsJSX(obj[key], level + 1)
              : obj[key]}
          </div>
        </Fragment>,
      )
    }
  }
  return jsxArray
}

export const makeStringFromArray = (arr: Array<string>) =>
  arr.length > 1
    ? arr.reduce((first, second) => `${first}%20${second}`, '')
    : arr[0]
    ? arr[0]
    : ''
