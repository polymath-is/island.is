import React, { FC } from 'react'
import {
  Text,
  GridRow,
  GridColumn,
  GridContainer,
} from '@island.is/island-ui/core'
import { Card } from '../Card/Card'

interface Card {
  title: string
  description: string
  href: string
  as: string
}

interface CategoriesProps {
  title?: string
  titleId?: string
  cards: Card[]
}

export const Categories: FC<CategoriesProps> = ({
  title = 'Þjónustuflokkar',
  titleId,
  cards,
}) => {
  const titleProps = titleId ? { id: titleId } : {}

  return (
    <GridContainer>
      <GridRow>
        <GridColumn span={['6/12', '6/12', '12/12']}>
          <Text variant="h3" as="h2" paddingBottom={4} {...titleProps}>
            {title}
          </Text>
        </GridColumn>
      </GridRow>

      <GridRow>
        {cards.map((card, index) => {
          return (
            <GridColumn
              key={index}
              span={['12/12', '6/12', '6/12', '4/12']}
              paddingBottom={3}
            >
              <Card {...card} />
            </GridColumn>
          )
        })}
      </GridRow>
    </GridContainer>
  )
}

export default Categories
