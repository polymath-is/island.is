import React, {
  FC,
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react'
import cn from 'classnames'
import AliceCarousel, { EventObject } from 'react-alice-carousel'
import { Icon, Inline, Hidden } from '@island.is/island-ui/core'
import { AdgerdirPage } from '@island.is/api/schema'
import {
  ColorSchemeContext,
  ColorSchemes,
} from '@island.is/web/components/Adgerdir/UI/ColorSchemeContext/ColorSchemeContext'
import { Card } from '@island.is/web/components/Adgerdir/UI/Card/Card'
import 'react-alice-carousel/lib/alice-carousel.css'
import * as styles from './CardsSlider.treat'
import { useLinkResolver } from '@island.is/web/hooks/useLinkResolver'

interface StagePaddingProps {
  paddingLeft: number
  paddingRight: number
}

interface CardsSliderProps {
  variant?: ColorSchemes
  items: Array<AdgerdirPage>
}

const initialSlideState = {
  item: 0,
  slide: 0,
  itemsInSlide: 0,
  isPrevSlideDisabled: true,
  isNextSlideDisabled: false,
} as EventObject

export const CardsSlider: FC<CardsSliderProps> = ({ items, variant }) => {
  const { linkResolver } = useLinkResolver()
  const { colorScheme } = useContext(ColorSchemeContext)

  const [height, setHeight] = useState<string>('auto')
  const [slideState, setSlideState] = useState<EventObject>(initialSlideState)
  const [stagePadding, setStagePadding] = useState<StagePaddingProps>({
    paddingLeft: 0,
    paddingRight: 0,
  })
  const ref = useRef(null)

  const handleOnDragStart = (e) => e.preventDefault()

  const handleResize = useCallback(() => {
    let paddingRight = 0

    const w = window.innerWidth

    if (w >= 768) {
      paddingRight = 124
    }

    setStagePadding({
      paddingLeft: 0,
      paddingRight,
    })

    const el = ref && ref.current?.stageComponent?.offsetParent

    if (el) {
      setHeight('auto')
      setHeight(`${el.offsetHeight}px`)
      setSlideState({
        ...initialSlideState,
        itemsInSlide: ref.current.state.items,
      })
    }
  }, [ref])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      setTimeout(handleResize, 0)
    }

    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  const slideNext = () => {
    ref.current.slideNext()
  }

  const slidePrev = () => {
    ref.current.slidePrev()
  }

  const onSlideChanged = (e: EventObject) => {
    setSlideState(e)
  }

  const atEnd = slideState.isNextSlideDisabled
  const atStart = slideState.isPrevSlideDisabled

  let dotJumps = 0

  if (slideState.itemsInSlide) {
    dotJumps = Math.floor(items.length / slideState.itemsInSlide)
  }

  return (
    <div
      className={cn(styles.wrapper, styles.variants[variant || colorScheme])}
    >
      <AliceCarousel
        ref={ref}
        infinite={false}
        onInitialized={onSlideChanged}
        onSlideChanged={onSlideChanged}
        stagePadding={stagePadding}
        startIndex={slideState.item}
        slideToIndex={slideState.item}
        responsive={{
          0: {
            items: 1,
          },
          1200: {
            items: 2,
          },
        }}
        dotsDisabled
        buttonsDisabled
        mouseTrackingEnabled
        items={items.map(({ title, description, slug, tags }, index) => (
          <div
            key={index}
            onDragStart={handleOnDragStart}
            style={{ minHeight: height }}
            className={styles.item}
          >
            <Card
              description={description}
              title={title}
              tags={tags}
              {...linkResolver('adgerdirpage', [slug])}
            />
          </div>
        ))}
      />

      <Hidden below="md">
        <div className={styles.controls}>
          <Inline space={2}>
            <button
              className={cn(styles.arrowButton, {
                [styles.arrowButtonDisabled]: atStart,
              })}
              disabled={atStart}
              onClick={slidePrev}
            >
              <Icon icon="arrowBack" color="white" />
            </button>
            <button
              className={cn(styles.arrowButton, {
                [styles.arrowButtonDisabled]: atEnd,
              })}
              disabled={atEnd}
              onClick={slideNext}
            >
              <Icon icon="arrowForward" color="white" />
            </button>
          </Inline>
        </div>

        <div className={styles.dotsContainer}>
          {[...Array(dotJumps).keys()].map((item, index) => {
            return (
              <button
                key={item}
                onClick={() =>
                  ref.current.slideTo(index * slideState.itemsInSlide)
                }
                className={styles.dot}
              />
            )
          })}
        </div>
      </Hidden>
    </div>
  )
}

export default CardsSlider
