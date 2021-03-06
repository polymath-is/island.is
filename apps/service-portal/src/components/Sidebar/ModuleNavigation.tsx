import React, { FC, useState } from 'react'
import {
  ServicePortalNavigationItem,
  ServicePortalPath,
} from '@island.is/service-portal/core'
import * as styles from './Sidebar.treat'
import { Box, Divider, Stack, Text } from '@island.is/island-ui/core'
import { useLocation } from 'react-router-dom'
import AnimateHeight from 'react-animate-height'
import { useLocale } from '@island.is/localization'
import NavItem from './NavItem/NavItem'
import SubNavItem from './NavItem/SubNavItem'

interface Props {
  nav: ServicePortalNavigationItem
  variant: 'blue' | 'blueberry'
  onItemClick?: () => void
}

const ModuleNavigation: FC<Props> = ({ nav, variant, onItemClick }) => {
  const [expand, setExpand] = useState(false)
  const { pathname } = useLocation()
  const isModuleActive =
    (nav.path &&
      nav.path !== ServicePortalPath.MinarSidurRoot &&
      pathname.includes(nav.path)) ||
    nav.children?.find((x) => x.path && pathname.includes(x.path)) !==
      undefined ||
    expand ||
    nav.path === pathname
  const { formatMessage } = useLocale()

  const handleExpand = () => setExpand(!expand)

  const handleRootItemClick = () => {
    if (nav.path === undefined) handleExpand()
    if (onItemClick) onItemClick()
  }

  return (
    <Box>
      {nav.heading && (
        <Text
          variant="eyebrow"
          color={variant === 'blue' ? 'blue600' : 'blueberry600'}
          fontWeight="semiBold"
          marginBottom={2}
        >
          {formatMessage(nav.heading)}
        </Text>
      )}
      {nav.divider && (
        <Box paddingBottom={3}>
          <Divider />
        </Box>
      )}
      <NavItem
        path={nav.path}
        icon={nav.icon}
        active={isModuleActive}
        external={nav.external}
        onClick={handleRootItemClick}
        variant={variant}
      >
        {formatMessage(nav.name)}
      </NavItem>
      {Array.isArray(nav.children) && nav.children.length > 0 && (
        <AnimateHeight duration={300} height={isModuleActive ? 'auto' : 0}>
          <div>
            <Box className={styles.subnav} marginTop={2}>
              <Stack space={1}>
                {nav.children.map((child, index) => (
                  <SubNavItem
                    path={child.path}
                    key={`child-${index}`}
                    active={
                      child.path && pathname.includes(child.path) ? true : false
                    }
                    external={child.external}
                    variant={variant}
                    onClick={onItemClick}
                  >
                    {formatMessage(child.name)}
                  </SubNavItem>
                ))}
              </Stack>
            </Box>
          </div>
        </AnimateHeight>
      )}
    </Box>
  )
}

export default ModuleNavigation
