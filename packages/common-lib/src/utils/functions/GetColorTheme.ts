// Lib
import { overrideColorTheme } from '@shiksha/common-lib'

export interface IGetColors {
  colorTheme: any
}
// uses the override color theme function to return a specified color theme
// parameters: ColorThem to be applied
const GetColorTheme = (colorTheme: IGetColors) => {
  return { colors: overrideColorTheme, colorTheme }
}

export { GetColorTheme }
