import React, { FC } from 'react'
import {
  Text,
  Link,
  FocusableBox,
  GridContainer,
  GridRow,
  GridColumn,
  Tag,
} from '@island.is/island-ui/core'
import * as styles from './LifeEventInCategory.treat'
import { useLinkResolver } from 'apps/web/hooks/useLinkResolver'

export interface LifeEventInCategoryProps {
  title: string
  slug: string
  intro: string
  image: string
  categoryTag: string
}

const LifeEventInCategory: FC<LifeEventInCategoryProps> = ({
  title,
  slug,
  intro,
  image,
  categoryTag,
}) => {
  const { linkResolver } = useLinkResolver()

  return (
    <FocusableBox
      component={Link}
      {...linkResolver('lifeeventpage', [slug])}
      borderColor="blue200"
      borderWidth="standard"
      height="full"
      borderRadius="large"
      paddingX={[3, 3, 5]}
      paddingY={2}
    >
      <GridContainer>
        <GridRow>
          <GridColumn span={['8/12', '8/12', '6/12', '7/12', '9/12']}>
            <GridRow className={styles.textWrapper}>
              <Text variant="h4" as="h4" color="blue400">
                {title}
              </Text>
              <Text paddingBottom={2}>{intro}</Text>
              <div className={styles.pushDown}>
                <Tag>{categoryTag}</Tag>
              </div>
            </GridRow>
          </GridColumn>
          <GridColumn span={['4/12', '4/12', '6/12', '5/12', '3/12']}>
            <div
              className={styles.thumbnail}
              style={{ backgroundImage: `url(${image})` }}
            />
          </GridColumn>
        </GridRow>
      </GridContainer>
    </FocusableBox>
  )
}

export default LifeEventInCategory
