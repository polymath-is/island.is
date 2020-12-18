import {
  Args,
  Query,
  Resolver,
  ResolveField,
  Parent,
  Directive,
} from '@nestjs/graphql'
import { Article } from './models/article.model'
import { ContentSlug } from './models/contentSlug.model'
import { AdgerdirPage } from './models/adgerdirPage.model'
import { Organization } from './models/organization.model'
import { Organizations } from './models/organizations.model'
import { AdgerdirPages } from './models/adgerdirPages.model'
import { AdgerdirFrontpage } from './models/adgerdirFrontpage.model'
import { FrontpageSliderList } from './models/frontpageSliderList.model'
import { News } from './models/news.model'
import { GetSingleNewsInput } from './dto/getSingleNews.input'
import { GetAdgerdirPageInput } from './dto/getAdgerdirPage.input'
import { GetOrganizationTagsInput } from './dto/getOrganizationTags.input'
import { GetAdgerdirPagesInput } from './dto/getAdgerdirPages.input'
import { GetOrganizationsInput } from './dto/getOrganizations.input'
import { GetOrganizationInput } from './dto/getOrganization.input'
import { GetAdgerdirFrontpageInput } from './dto/getAdgerdirFrontpage.input'
import { GetFrontpageSliderListInput } from './dto/getFrontpageSliderList.input'
import { Namespace } from './models/namespace.model'
import { AboutPage } from './models/aboutPage.model'
import { LandingPage } from './models/landingPage.model'
import { AlertBanner } from './models/alertBanner.model'
import { GenericPage } from './models/genericPage.model'
import { GetNamespaceInput } from './dto/getNamespace.input'
import { GetAboutPageInput } from './dto/getAboutPage.input'
import { GetLandingPageInput } from './dto/getLandingPage.input'
import { GetAlertBannerInput } from './dto/getAlertBanner.input'
import { GetGenericPageInput } from './dto/getGenericPage.input'
import { GetLifeEventPageInput } from './dto/getLifeEventPage.input'
import { GetLifeEventsInput } from './dto/getLifeEvents.input'
import { Menu } from './models/menu.model'
import { GetMenuInput } from './dto/getMenu.input'
import { AdgerdirTags } from './models/adgerdirTags.model'
import { GetAdgerdirTagsInput } from './dto/getAdgerdirTags.input'
import { LifeEventPage } from './models/lifeEventPage.model'
import { environment } from './environments'
import { OrganizationTags } from './models/organizationTags.model'
import { CmsContentfulService } from './cms.contentful.service'
import { CmsElasticsearchService } from './cms.elasticsearch.service'
import { ArticleCategory } from './models/articleCategory.model'
import { GetArticleCategoriesInput } from './dto/getArticleCategories.input'
import { GetArticlesInput } from './dto/getArticles.input'
import { GetContentSlugInput } from './dto/getContentSlug.input'
import { GetLifeEventsInCategoryInput } from './dto/getLifeEventsInCategory.input'
import { GetUrlInput } from './dto/getUrl.input'
import { Url } from './models/url.model'
import { GetSingleArticleInput } from './dto/getSingleArticle.input'
import { GetAboutSubPageInput } from './dto/getAboutSubPage.input'
import { AboutSubPage } from './models/aboutSubPage.model'
import { GetHomepageInput } from './dto/getHomepage.input'
import { LatestNewsSlice } from './models/latestNewsSlice.model'
import { Homepage } from './models/homepage.model'
import { GetNewsInput } from './dto/getNews.input'
import { GetNewsDatesInput } from './dto/getNewsDates.input'
import { NewsList } from './models/newsList.model'
import { GetTellUsAStoryInput } from './dto/getTellUsAStory.input'
import { TellUsAStory } from './models/tellUsAStory.model'
import { SearchIndexes } from '@island.is/content-search-indexer/types'
import { GroupedMenu } from './models/groupedMenu.model'
import { GetSingleMenuInput } from './dto/getSingleMenu.input'
import { SubpageHeader } from './models/subpageHeader.model'
import { GetSubpageHeaderInput } from './dto/getSubpageHeader.input'

const { cacheTime } = environment

const cacheControlDirective = (ms = cacheTime) => `@cacheControl(maxAge: ${ms})`

@Resolver()
@Directive(cacheControlDirective())
export class CmsResolver {
  constructor(
    private readonly cmsContentfulService: CmsContentfulService,
    private readonly cmsElasticsearchService: CmsElasticsearchService,
  ) {}

  @Directive(cacheControlDirective())
  @Query(() => Namespace, { nullable: true })
  getNamespace(
    @Args('input') input: GetNamespaceInput,
  ): Promise<Namespace | null> {
    return this.cmsContentfulService.getNamespace(
      input?.namespace ?? '',
      input?.lang ?? 'is-IS',
    )
  }

  @Directive(cacheControlDirective())
  @Query(() => AboutPage)
  getAboutPage(
    @Args('input') input: GetAboutPageInput,
  ): Promise<AboutPage | null> {
    return this.cmsContentfulService.getAboutPage(input)
  }

  @Directive(cacheControlDirective())
  @Query(() => AboutSubPage, { nullable: true })
  getAboutSubPage(
    @Args('input') input: GetAboutSubPageInput,
  ): Promise<AboutSubPage | null> {
    return this.cmsContentfulService.getAboutSubPage(input)
  }

  @Directive(cacheControlDirective())
  @Query(() => LandingPage, { nullable: true })
  getLandingPage(
    @Args('input') input: GetLandingPageInput,
  ): Promise<LandingPage | null> {
    return this.cmsContentfulService.getLandingPage(input)
  }

  // TODO: Change this so this won't link to non existing entries e.g. articles
  @Directive(cacheControlDirective())
  @Query(() => ContentSlug, { nullable: true })
  getContentSlug(
    @Args('input') input: GetContentSlugInput,
  ): Promise<ContentSlug | null> {
    return this.cmsContentfulService.getContentSlug(input)
  }

  @Directive(cacheControlDirective())
  @Query(() => AlertBanner, { nullable: true })
  getAlertBanner(
    @Args('input') input: GetAlertBannerInput,
  ): Promise<AlertBanner | null> {
    return this.cmsContentfulService.getAlertBanner(input)
  }

  @Directive(cacheControlDirective())
  @Query(() => GenericPage, { nullable: true })
  getGenericPage(
    @Args('input') input: GetGenericPageInput,
  ): Promise<GenericPage | null> {
    return this.cmsContentfulService.getGenericPage(input)
  }

  @Directive(cacheControlDirective())
  @Query(() => AdgerdirPage, { nullable: true })
  getAdgerdirPage(
    @Args('input') input: GetAdgerdirPageInput,
  ): Promise<AdgerdirPage | null> {
    return this.cmsContentfulService.getAdgerdirPage(
      input?.slug ?? '',
      input?.lang ?? 'is-IS',
    )
  }

  @Directive(cacheControlDirective())
  @Query(() => Organization, { nullable: true })
  getOrganization(
    @Args('input') input: GetOrganizationInput,
  ): Promise<Organization | null> {
    return this.cmsContentfulService.getOrganization(
      input?.slug ?? '',
      input?.lang ?? 'is-IS',
    )
  }

  @Directive(cacheControlDirective())
  @Query(() => AdgerdirPages)
  getAdgerdirPages(
    @Args('input') input: GetAdgerdirPagesInput,
  ): Promise<AdgerdirPages> {
    return this.cmsContentfulService.getAdgerdirPages(input?.lang ?? 'is-IS')
  }

  @Directive(cacheControlDirective())
  @Query(() => Organizations)
  getOrganizations(
    @Args('input') input: GetOrganizationsInput,
  ): Promise<Organizations> {
    return this.cmsContentfulService.getOrganizations(input?.lang ?? 'is-IS')
  }

  @Directive(cacheControlDirective())
  @Query(() => AdgerdirTags, { nullable: true })
  getAdgerdirTags(
    @Args('input') input: GetAdgerdirTagsInput,
  ): Promise<AdgerdirTags | null> {
    return this.cmsContentfulService.getAdgerdirTags(input?.lang ?? 'is-IS')
  }

  @Directive(cacheControlDirective())
  @Query(() => OrganizationTags, { nullable: true })
  getOrganizationTags(
    @Args('input') input: GetOrganizationTagsInput,
  ): Promise<OrganizationTags | null> {
    return this.cmsContentfulService.getOrganizationTags(input?.lang ?? 'is-IS')
  }

  @Directive(cacheControlDirective())
  @Query(() => FrontpageSliderList, { nullable: true })
  getFrontpageSliderList(
    @Args('input') input: GetFrontpageSliderListInput,
  ): Promise<FrontpageSliderList | null> {
    return this.cmsContentfulService.getFrontpageSliderList(
      input?.lang ?? 'is-IS',
    )
  }

  @Directive(cacheControlDirective())
  @Query(() => AdgerdirFrontpage, { nullable: true })
  getAdgerdirFrontpage(
    @Args('input') input: GetAdgerdirFrontpageInput,
  ): Promise<AdgerdirFrontpage | null> {
    return this.cmsContentfulService.getAdgerdirFrontpage(
      input?.lang ?? 'is-IS',
    )
  }

  @Directive(cacheControlDirective())
  @Query(() => LifeEventPage, { nullable: true })
  getLifeEventPage(
    @Args('input') input: GetLifeEventPageInput,
  ): Promise<LifeEventPage | null> {
    return this.cmsContentfulService.getLifeEventPage(input.slug, input.lang)
  }

  @Directive(cacheControlDirective())
  @Query(() => [LifeEventPage])
  getLifeEvents(
    @Args('input') input: GetLifeEventsInput,
  ): Promise<LifeEventPage[]> {
    return this.cmsContentfulService.getLifeEvents(input.lang)
  }

  @Directive(cacheControlDirective())
  @Query(() => [LifeEventPage])
  getLifeEventsInCategory(
    @Args('input') input: GetLifeEventsInCategoryInput,
  ): Promise<LifeEventPage[]> {
    return this.cmsContentfulService.getLifeEventsInCategory(
      input.lang,
      input.slug,
    )
  }

  @Directive(cacheControlDirective())
  @Query(() => Url, { nullable: true })
  getUrl(@Args('input') input: GetUrlInput): Promise<Url | null> {
    return this.cmsContentfulService.getUrl(
      input?.slug ?? '',
      input?.lang ?? 'is-IS',
    )
  }

  @Directive(cacheControlDirective())
  @Query(() => TellUsAStory)
  getTellUsAStory(
    @Args('input') input: GetTellUsAStoryInput,
  ): Promise<TellUsAStory> {
    return this.cmsContentfulService.getTellUsAStory(input)
  }

  @Directive(cacheControlDirective())
  @Query(() => Homepage)
  getHomepage(@Args('input') input: GetHomepageInput): Promise<Homepage> {
    return this.cmsContentfulService.getHomepage(input)
  }

  @Directive(cacheControlDirective())
  @Query(() => [ArticleCategory])
  getArticleCategories(
    @Args('input') input: GetArticleCategoriesInput,
  ): Promise<ArticleCategory[]> {
    return this.cmsElasticsearchService.getArticleCategories(
      SearchIndexes[input.lang],
      input,
    )
  }

  @Directive(cacheControlDirective())
  @Query(() => Article, { nullable: true })
  getSingleArticle(
    @Args('input') { lang, slug }: GetSingleArticleInput,
  ): Promise<Article | null> {
    return this.cmsElasticsearchService.getSingleDocumentTypeBySlug<Article>(
      SearchIndexes[lang],
      { type: 'webArticle', slug },
    )
  }

  @Directive(cacheControlDirective())
  @Query(() => [Article])
  getArticles(@Args('input') input: GetArticlesInput): Promise<Article[]> {
    return this.cmsElasticsearchService.getArticles(
      SearchIndexes[input.lang],
      input,
    )
  }

  @Directive(cacheControlDirective())
  @Query(() => News, { nullable: true })
  getSingleNews(
    @Args('input') { lang, slug }: GetSingleNewsInput,
  ): Promise<News | null> {
    return this.cmsElasticsearchService.getSingleDocumentTypeBySlug<News>(
      SearchIndexes[lang],
      { type: 'webNews', slug },
    )
  }

  @Directive(cacheControlDirective())
  @Query(() => [String])
  getNewsDates(@Args('input') input: GetNewsDatesInput): Promise<string[]> {
    return this.cmsElasticsearchService.getNewsDates(
      SearchIndexes[input.lang],
      input,
    )
  }

  @Directive(cacheControlDirective())
  @Query(() => NewsList)
  getNews(@Args('input') input: GetNewsInput): Promise<NewsList> {
    return this.cmsElasticsearchService.getNews(
      SearchIndexes[input.lang],
      input,
    )
  }

  @Directive(cacheControlDirective())
  @Query(() => Menu, { nullable: true })
  getMenu(@Args('input') input: GetMenuInput): Promise<Menu | null> {
    return this.cmsElasticsearchService.getSingleMenuByName(
      SearchIndexes[input.lang],
      { ...input },
    )
  }

  @Directive(cacheControlDirective())
  @Query(() => GroupedMenu, { nullable: true })
  getGroupedMenu(
    @Args('input') input: GetSingleMenuInput,
  ): Promise<GroupedMenu | null> {
    return this.cmsElasticsearchService.getSingleMenu<GroupedMenu>(
      SearchIndexes[input.lang],
      input,
    )
  }

  @Directive(cacheControlDirective())
  @Query(() => SubpageHeader, { nullable: true })
  getSubpageHeader(
    @Args('input') input: GetSubpageHeaderInput,
  ): Promise<SubpageHeader | null> {
    return this.cmsContentfulService.getSubpageHeader(input)
  }
}

@Resolver(() => LatestNewsSlice)
export class LatestNewsSliceResolver {
  constructor(private cmsElasticsearchService: CmsElasticsearchService) {}

  @ResolveField(() => [News])
  async news(@Parent() { news: input }: LatestNewsSlice): Promise<News[]> {
    const newsList = await this.cmsElasticsearchService.getNews(
      SearchIndexes[input.lang],
      input,
    )
    return newsList.items
  }
}

@Resolver(() => Article)
export class ArticleResolver {
  constructor(private cmsContentfulService: CmsContentfulService) {}

  @ResolveField(() => [Article])
  async relatedArticles(@Parent() article: Article) {
    return this.cmsContentfulService.getRelatedArticles(article.slug, 'is')
  }
}

@Resolver(() => AboutSubPage)
export class AboutSubPageResolver {
  constructor(private cmsElasticsearchService: CmsElasticsearchService) {}

  @ResolveField(() => AboutPage)
  async parent(@Parent() { parent }: AboutSubPage) {
    if (parent) {
      const { lang, id } = parent
      return this.cmsElasticsearchService.getSingleAboutPage(
        SearchIndexes[lang],
        id,
      )
    } else {
      return null
    }
  }
}
