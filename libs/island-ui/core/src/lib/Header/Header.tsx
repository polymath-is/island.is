import React, { ReactElement } from 'react'

import { Logo } from '../Logo/Logo'

import { Box } from '../Box/Box'
import { Text } from '../Text/Text'
import * as styles from './Header.treat'
import { Button } from '../Button/Button'
import { Hidden } from '../Hidden/Hidden'

export interface HeaderProps {
  authenticated?: boolean
  language?: string
  logoRender?: (ReactElement: ReactElement) => ReactElement
  logoutText?: string
  onLogout?: () => void
  switchLanguage?: () => void
  userLogo?: string
  userName?: string
}

const LogoIcon = (
  <>
    <Hidden above="sm">
      <Logo width={40} iconOnly />
    </Hidden>
    <Hidden below="md">
      <Logo width={160} />
    </Hidden>
  </>
)

export const Header = ({
  authenticated,
  language,
  logoRender,
  logoutText,
  onLogout,
  switchLanguage,
  userLogo,
  userName = '',
}: HeaderProps) => {
  const logo = () => {
    if (logoRender) {
      return logoRender(LogoIcon)
    }
    return LogoIcon
  }
  return (
    <Box
      className={styles.container}
      display="flex"
      alignItems="center"
      justifyContent="spaceBetween"
    >
      {logo()}
      <Box display="flex" alignItems="center">
        {authenticated && (
          <Box
            className={styles.userNameContainer}
            display="flex"
            alignItems="center"
            marginLeft={2}
            marginRight={2}
          >
            {userLogo && (
              <Box marginRight={1} marginBottom={1}>
                <span role="img" aria-label="user">
                  {userLogo}
                </span>
              </Box>
            )}
            <Text variant="eyebrow" truncate>
              {userName}
            </Text>
          </Box>
        )}
        {language && (
          <Button variant="utility" onClick={switchLanguage}>
            {language}
          </Button>
        )}
        {authenticated && (
          <Box marginLeft={2}>
            <Button variant="utility" icon="lockClosed" onClick={onLogout}>
              {logoutText}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}
