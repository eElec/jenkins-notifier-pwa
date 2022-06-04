import '@emotion/react'
import { Theme as MUITheme} from '@mui/system'

declare module '@emotion/react' {
  export interface Theme extends MUITheme {}
}
