import React from 'react'
import { storiesOf } from '@storybook/react'
// import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs'
import ContentSlider, { useSlider } from './ContentSlider'
import { SlideCard, ContentBlock, Box } from '../..'

import imgFerdagjof from '../../assets/ferdagjof.jpg'
import img1 from '../../assets/image1.jpg'
import img2 from '../../assets/image2.jpg'
import img3 from '../../assets/image3.jpg'

const defaults = {
  title: 'Ferðumst innanlands í sumar',
  subTitle: 'Ferðagjöf',
  description:
    'Allir íbúar á Íslandi 18 ára og eldri fá Ferðagjöf, stafrænt gjafabréf sem hægt er að nota á ferðalögum innanlands.',
  linkText: 'Nánar um ferðagjöf',
  link: '#',
}

const cards = [
  {
    img: imgFerdagjof,
    ...defaults,
  },
  {
    img: imgFerdagjof,
    ...defaults,
    description: 'A small description...',
  },
  {
    img: img1,
    subTitle: 'Opniberir vefir',
    title: 'Heilsuvera',
    description:
      'Vefur fyrir almenning um heilsu og áhrifaþætti hennar, þar sem hægt er að eiga í samskiptum við starfsfólk heilbrigðisþjónustunnar og nálgast gögn úr eigin sjúkraskrá.',
    linkText: 'Heilsuvera.is',
    link: '//heilsuvera.is',
  },
  {
    img: img2,
    subTitle: 'Opniberir vefir',
    title: 'Opinber nýsköpun',
    description:
      'Nýsköpun innan opinberra vinnustaða er margvísleg og getur verið allt frá því að breyta verkferlum yfir í að vinna að stórum markmiðum samfélagsins.',
    linkText: 'Opinbernyskopun.island.is',
    link: '//opinbernyskopun.island.is',
  },
  {
    img: img3,
    subTitle: 'Opniberir vefir',
    title: 'Samráðsgátt',
    description:
      'Samráðsgátt greiðir leið hagsmunaaðila, almennings og félagasamtaka að opinberum samráðsferlum sem mögulegt er að taka þátt í.',
    linkText: 'Samradsgatt.island.is',
    link: '//samradsgatt.island.is',
  },
  {
    img: img1,
    ...defaults,
  },
  {
    img: img2,
    ...defaults,
  },
  {
    img: img3,
    ...defaults,
  },
]

storiesOf('Slider|ContentSlider', module)
  /* .addDecorator(
    withInfo({
      inline: true,
      header: false,
      text: `
        #### Usage:
        ___

        ~~~js
        import ContentSlider, { useSlider } from './ContentSlider' 
        ...
        const { prevBtn, nextBtn, slider } = useSlider({
          jumpSize: 2 // default 1
        })
        <button {...prevBtn}>Prev</button>
        <button {...nextBtn}>Next</button>
        <ContentSlider {...slider}>
        ...
        ~~~
      `,
    }),
  ) */
  .addDecorator(withKnobs)
  .add('ContentSlider', () => {
    const { prevBtn, nextBtn, slider } = useSlider({
      jumpSize: 2,
    })
    return (
      <ContentBlock>
        <Box width="full" padding={6} overflow="hidden">
          <div>
            <button {...prevBtn}>Prev</button>
            <button {...nextBtn}>Next</button>
            <ContentSlider {...slider}>
              {cards.map((card, index) => (
                <SlideCard key={index} {...card} />
              ))}
            </ContentSlider>
          </div>
        </Box>
      </ContentBlock>
    )
  })
