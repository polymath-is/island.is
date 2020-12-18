import React, { FC, useRef } from 'react'
import {
  Button,
  Menu as MenuUI,
  Link,
  ButtonTypes,
  Box,
} from '@island.is/island-ui/core'
import { useI18n } from '@island.is/web/i18n'
import { LinkResolverResponse } from '@island.is/web/hooks/useLinkResolver'
import { SearchInput } from '..'
import { LanguageToggler } from '../LanguageToggler'

interface MegaMenuLink {
  href: LinkResolverResponse
  text: string
  sub?: [MegaMenuLink]
}

interface Props {
  asideTopLinks: MegaMenuLink[]
  asideBottomTitle: string
  asideBottomLinks: MegaMenuLink[]
  mainLinks: MegaMenuLink[]
  buttonColorScheme?: ButtonTypes['colorScheme']
}

export const Menu: FC<Props> = ({
  asideTopLinks,
  asideBottomTitle,
  asideBottomLinks,
  mainLinks,
  buttonColorScheme = 'default',
}) => {
  const searchInput = useRef<HTMLInputElement>()
  const { activeLocale, t } = useI18n()

  return (
    <MenuUI
      baseId="Menu"
      mainLinks={mainLinks}
      asideTopLinks={asideTopLinks}
      asideBottomLinks={asideBottomLinks}
      mainTitle={t.serviceCategories}
      asideBottomTitle={asideBottomTitle}
      myPagesText={t.login}
      renderDisclosure={(
        disclosureDefault,
        { onClick, ...disclosureProps },
      ) => {
        return (
          <Box display="flex">
            <Box marginRight={1} display={['block', 'block', 'block', 'none']}>
              <Button
                {...disclosureProps}
                colorScheme={buttonColorScheme}
                variant="utility"
                icon="search"
                onClick={(e) => {
                  onClick(e)
                  setTimeout(() => {
                    if (searchInput.current) {
                      searchInput.current.focus()
                    }
                  }, 100)
                }}
              />
            </Box>
            {disclosureDefault}
          </Box>
        )
      }}
      renderLogo={(logo, closeModal) => (
        <Link
          href={activeLocale === 'en' ? '/en' : '/'}
          as={activeLocale === 'en' ? '/en' : '/'}
          onClick={() => {
            console.log('click')
            closeModal()
          }}
        >
          <span>{logo}</span>
        </Link>
      )}
      menuButton={
        <Button variant="utility" icon="menu" colorScheme={buttonColorScheme}>
          {t.menuCaption}
        </Button>
      }
      renderLink={({ className, text, href }, closeModal) => {
        return (
          <Link {...href} onClick={closeModal}>
            <span className={className}>{text}</span>
          </Link>
        )
      }}
      renderMyPagesButton={(button) => {
        return <Link href="//minarsidur.island.is/">{button}</Link>
      }}
      renderLanguageSwitch={() => <LanguageToggler />}
      renderSearch={(input, closeModal) => (
        <SearchInput
          id="search_input_menu"
          size="medium"
          ref={searchInput}
          activeLocale={activeLocale}
          placeholder={t.searchPlaceholder}
          autocomplete={true}
          autosuggest={false}
          onRouting={closeModal}
          skipContext
        />
      )}
    />
  )
}
