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

export const getQueryParameter = (paramName: string) => {
  return new URLSearchParams(window.location.search).get(paramName)
}

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
            {key}:{' '}
            {obj[key] === true
              ? 'true'
              : obj[key] === false
              ? 'false'
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
