/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { LinkProps } from 'next/link'
import { Screen } from '../../types'
import {
  Sidebar,
  SearchInput,
  Card,
  CardTagsProps,
} from '@island.is/web/components'
import {
  Box,
  Text,
  Stack,
  Breadcrumbs,
  Hidden,
  Select,
  Option,
  SidebarAccordion,
  Pagination,
  Link,
} from '@island.is/island-ui/core'
import { useI18n } from '@island.is/web/i18n'
import { useNamespace } from '@island.is/web/hooks'
import {
  GET_NAMESPACE_QUERY,
  GET_SEARCH_RESULTS_QUERY_DETAILED,
  GET_SEARCH_COUNT_QUERY,
} from '../queries'
import { SidebarLayout } from '../Layouts/SidebarLayout'
import { CustomNextError } from '@island.is/web/units/errors'
import { withMainLayout } from '@island.is/web/layouts/main'
import {
  GetSearchResultsDetailedQuery,
  GetSearchResultsNewsQuery,
  GetSearchCountTagsQuery,
  QuerySearchResultsArgs,
  ContentLanguage,
  QueryGetNamespaceArgs,
  GetNamespaceQuery,
  Article,
  LifeEventPage,
  AboutPage,
  News,
  SearchableContentTypes,
  SearchableTags,
  AdgerdirPage,
} from '../../graphql/schema'
import { Image } from '@island.is/web/graphql/schema'
import * as styles from './Search.treat'
import { useLinkResolver } from '@island.is/web/hooks/useLinkResolver'

const PERPAGE = 10

type SearchQueryFilters = {
  category: string
  type: string
}

interface CategoryProps {
  q: string
  page: number
  searchResults: GetSearchResultsDetailedQuery['searchResults']
  countResults: GetSearchCountTagsQuery['searchResults']
  namespace: GetNamespaceQuery['getNamespace']
}

interface SidebarTagMap {
  [key: string]: {
    title: string
    total: number
  }
}

interface SidebarData {
  totalTagCount: number
  tags: SidebarTagMap
  types: SidebarTagMap
}

const Search: Screen<CategoryProps> = ({
  q,
  page,
  searchResults,
  countResults,
  namespace,
}) => {
  const { activeLocale } = useI18n()
  const searchRef = useRef<HTMLInputElement | null>(null)
  const Router = useRouter()
  const n = useNamespace(namespace)
  const { linkResolver } = useLinkResolver()
  const [sidebarData, setSidebarData] = useState<SidebarData>({
    totalTagCount: 0,
    tags: {},
    types: {},
  })

  const filters: SearchQueryFilters = {
    category: Router.query.category as string,
    type: Router.query.type as string,
  }

  useEffect(() => {
    // we get the tag count manually since the total includes uncategorised data and the type count
    let totalTagCount = 0
    // create a map of sidebar tag data for easier lookup later
    const tagCountResults = countResults.tagCounts.reduce(
      (tagList: SidebarTagMap, { key, count: total, value: title }) => {
        // in some rare cases a tag might be empty we skip counting and rendering it
        if (key && title) {
          totalTagCount = totalTagCount + total

          tagList[key] = {
            title,
            total,
          }
        }

        return tagList
      },
      {},
    )

    // create a map of sidebar type data for easier lookup later
    const typeNames = {
      webNews: n('newsTitle'),
    }
    const typeCountResults = countResults.typesCount.reduce(
      (typeList: SidebarTagMap, { key, count: total }) => {
        if (Object.keys(typeNames).includes(key)) {
          typeList[key] = {
            title: typeNames[key],
            total,
          }
        }
        return typeList
      },
      {},
    )
    setSidebarData({
      totalTagCount,
      tags: tagCountResults,
      types: typeCountResults,
    })
  }, [countResults])

  const getLabels = (item) => {
    const labels = []
    switch (
      item.__typename as LifeEventPage['__typename'] &
        News['__typename'] &
        AboutPage['__typename']
    ) {
      case 'LifeEventPage':
        labels.push(n('lifeEvent'))
        break
      case 'AboutPage':
        labels.push(n('aboutPageTitle'))
        break
      case 'News':
        labels.push(n('newsTitle'))
        break
      case 'AdgerdirPage':
        labels.push(n('adgerdirTitle'))
        break
      default:
        break
    }

    if (item.processEntry) {
      labels.push(n('applicationForm'))
    }

    if (item.group) {
      labels.push(item.group.title)
    }

    if (item.organization?.length) {
      labels.push(item.organization[0].title)
    }

    return labels
  }

  const searchResultsItems = (searchResults.items as Array<
    Article & LifeEventPage & AboutPage & News & AdgerdirPage
  >).map((item) => ({
    title: item.title,
    description: item.intro ?? item.seoDescription ?? item.description,
    ...linkResolver(item.__typename, [item.slug]),
    categorySlug: item.category?.slug,
    category: item.category,
    group: item.group,
    ...(item.image && { image: item.image as Image }),
    ...(item.thumbnail && { thumbnail: item.thumbnail as Image }),
    labels: getLabels(item),
  }))

  const onRemoveFilters = () => {
    Router.replace({
      pathname: linkResolver('search').as,
      query: { q },
    })
  }

  const onSelectSidebarTag = (type: 'category' | 'type', key: string) => {
    Router.replace({
      pathname: linkResolver('search').as,
      query: { q, [type]: key },
    })
  }

  const byCategory = (item) => {
    if (!item.category && filters.category === 'uncategorized') {
      return true
    }

    return !filters.category || filters.category === item.categorySlug
  }

  const filteredItems = searchResultsItems.filter(byCategory)
  const totalSearchResults = searchResults.total
  const totalPages = Math.ceil(totalSearchResults / PERPAGE)
  const sidebarDataTypes = Object.entries(sidebarData.types)
  const sidebarDataTags = Object.entries(sidebarData.tags)

  const categorySelectOptions = sidebarDataTags.map(
    ([key, { title, total }]) => ({
      label: `${title} (${total})`,
      value: key,
    }),
  )

  categorySelectOptions.unshift({
    label: n('allCategories', 'Allir flokkar'),
    value: '',
  })

  const defaultSelectedCategory = {
    label:
      sidebarData.tags[filters.category]?.title ??
      n('allCategories', 'Allir flokkar'),
    value: filters.category ?? '',
  }

  return (
    <>
      <Head>
        <title>{n('searchResults', 'Leitarniðurstöður')} | Ísland.is</title>
      </Head>
      <SidebarLayout
        sidebarContent={
          <Stack space={3}>
            {!!sidebarDataTags.length && (
              <Sidebar title={n('sidebarHeader')}>
                <Box width="full" position="relative" paddingTop={2}>
                  {totalSearchResults > 0 && (
                    <>
                      <Filter
                        truncate
                        selected={!filters.category && !filters.type}
                        onClick={() => onRemoveFilters()}
                        text={`${n('allCategories', 'Allir flokkar')} (${
                          sidebarData.totalTagCount
                        })`}
                        className={styles.allCategoriesLink}
                      />
                      <SidebarAccordion
                        id="sidebar_accordion_categories"
                        label={''}
                      >
                        <Stack space={[1, 1, 2]}>
                          {sidebarDataTags.map(([key, { title, total }]) => {
                            const selected = key === filters.category
                            const text = `${title} (${total})`

                            if (key === 'uncategorized') {
                              return null
                            }

                            return (
                              <Filter
                                key={key}
                                selected={selected}
                                onClick={() =>
                                  onSelectSidebarTag('category', key)
                                }
                                text={text}
                              />
                            )
                          })}
                        </Stack>
                      </SidebarAccordion>
                    </>
                  )}
                </Box>
              </Sidebar>
            )}
            {!!sidebarDataTypes.length && (
              <Sidebar bullet="none" title={n('otherCategories')}>
                <Stack space={[1, 1, 2]}>
                  {sidebarDataTypes.map(([key, { title, total }]) => (
                    <Filter
                      key={key}
                      selected={filters.type === key}
                      onClick={() => onSelectSidebarTag('type', key)}
                      text={`${title} (${total})`}
                    />
                  ))}
                </Stack>
              </Sidebar>
            )}
          </Stack>
        }
      >
        <Stack space={[3, 3, 4]}>
          <Breadcrumbs>
            <Link {...linkResolver('homepage')} passHref>
              Ísland.is
            </Link>
          </Breadcrumbs>
          <SearchInput
            id="search_input_search_page"
            ref={searchRef}
            size="large"
            activeLocale={activeLocale}
            initialInputValue={q}
          />
          <Hidden above="sm">
            {totalSearchResults > 0 && (
              <Select
                label={n('sidebarHeader')}
                placeholder={n('sidebarHeader', 'Flokkar')}
                defaultValue={defaultSelectedCategory}
                options={categorySelectOptions}
                name="content-overview"
                isSearchable={false}
                onChange={({ value }: Option) => {
                  onSelectSidebarTag('category', value as string)
                }}
              />
            )}
          </Hidden>

          {filteredItems.length === 0 ? (
            <>
              <Text variant="intro" as="p">
                {n('nothingFoundWhenSearchingFor', 'Ekkert fannst við leit á')}
                <strong>{q}</strong>
              </Text>

              <Text variant="intro" as="p">
                {n('nothingFoundExtendedExplanation')}
              </Text>
            </>
          ) : (
            <Text variant="intro" as="p">
              {totalSearchResults}
              {totalSearchResults === 1
                ? n('searchResult', 'leitarniðurstaða')
                : n('searchResults', 'leitarniðurstöður')}
              {(filters.category || filters.type) && (
                <>
                  {n('inCategory', 'í flokki')}
                  {
                    <>
                      :
                      <strong>
                        {sidebarData.tags[filters.category]?.title ??
                          sidebarData.types[filters.type]?.title}
                      </strong>
                    </>
                  }
                </>
              )}
            </Text>
          )}
        </Stack>
        <Stack space={2}>
          {filteredItems.map(({ image, thumbnail, labels, ...rest }, index) => {
            const tags: Array<CardTagsProps> = []

            labels.forEach((label) => {
              tags.push({
                title: label,
                tagProps: {
                  outlined: true,
                },
              })
            })

            return (
              <Card
                key={index}
                tags={tags}
                image={thumbnail ? thumbnail : image}
                {...rest}
              />
            )
          })}{' '}
          {totalSearchResults > 0 && (
            <Box paddingTop={8}>
              <Pagination
                page={page}
                totalPages={totalPages}
                renderLink={(page, className, children) => (
                  <Link
                    href={{
                      pathname: linkResolver('search').as,
                      query: { ...Router.query, page },
                    }}
                  >
                    <span className={className}>{children}</span>
                  </Link>
                )}
              />
            </Box>
          )}
        </Stack>
      </SidebarLayout>
    </>
  )
}

const single = <T,>(x: T | T[]): T => (Array.isArray(x) ? x[0] : x)

Search.getInitialProps = async ({ apolloClient, locale, query }) => {
  const queryString = single(query.q) || ''
  const category = single(query.category) || ''
  const type = single(query.type) || ''
  const page = Number(single(query.page)) || 1

  let tags = {}
  let countTag = {}
  if (category) {
    tags = { tags: [{ key: category, type: 'category' as SearchableTags }] }
  } else {
    countTag = { countTag: 'category' as SearchableTags }
  }

  let types
  if (type) {
    types = [type as SearchableContentTypes]
  } else {
    types = [
      'webArticle' as SearchableContentTypes,
      'webLifeEventPage' as SearchableContentTypes,
      'webAboutPage' as SearchableContentTypes,
      'webAdgerdirPage' as SearchableContentTypes,
    ]
  }

  const [
    {
      data: { searchResults },
    },
    {
      data: { searchResults: countResults },
    },
    namespace,
  ] = await Promise.all([
    apolloClient.query<GetSearchResultsDetailedQuery, QuerySearchResultsArgs>({
      query: GET_SEARCH_RESULTS_QUERY_DETAILED,
      variables: {
        query: {
          language: locale as ContentLanguage,
          queryString,
          types,
          ...tags,
          ...countTag,
          size: PERPAGE,
          page,
        },
      },
    }),
    apolloClient.query<GetSearchResultsNewsQuery, QuerySearchResultsArgs>({
      query: GET_SEARCH_COUNT_QUERY,
      variables: {
        query: {
          language: locale as ContentLanguage,
          queryString,
          countTag: 'category' as SearchableTags,
          countTypes: true,
        },
      },
    }),
    apolloClient
      .query<GetNamespaceQuery, QueryGetNamespaceArgs>({
        query: GET_NAMESPACE_QUERY,
        variables: {
          input: {
            namespace: 'Search',
            lang: locale,
          },
        },
      })
      .then((variables) => {
        // map data here to reduce data processing in component
        return JSON.parse(variables.data.getNamespace.fields)
      }),
  ])

  if (searchResults.items.length === 0 && page > 1) {
    throw new CustomNextError(404)
  }

  return {
    q: queryString,
    searchResults,
    countResults,
    namespace,
    showSearchInHeader: false,
    page,
  }
}

const Filter = ({ selected, text, onClick, truncate = false, ...props }) => {
  return (
    <Box
      display="inlineBlock"
      component="button"
      type="button"
      textAlign="left"
      outline="none"
      width="full"
      onClick={onClick}
      {...props}
    >
      <Text as="div" truncate={truncate}>
        {selected ? <strong>{text}</strong> : text}
      </Text>
    </Box>
  )
}

export default withMainLayout(Search, { showSearchInHeader: false })
