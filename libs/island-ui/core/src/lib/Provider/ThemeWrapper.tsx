import React, { ReactNode } from 'react'
import 'braid-design-system/reset' // <-- Must be first
import jobStreetTheme from 'braid-design-system/themes/jobStreet'
import { BraidProvider } from 'braid-design-system'

/* eslint-disable-next-line */
export interface ThemeWrapperProps {}

export const ThemeWrapper: FC<ProviderProps> = ({ children }) => {
  return <BraidProvider theme={jobStreetTheme}>{children}</BraidProvider>
}
