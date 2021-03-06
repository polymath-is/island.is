import React, { useEffect } from 'react'
import { Stack, Text } from '@island.is/island-ui/core'
import { FormPageLayout } from '@island.is/skilavottord-web/components/Layouts'
import { useI18n } from '@island.is/skilavottord-web/i18n'
import { useRouter } from 'next/router'
import CompanyInfoForm from './components/CompanyInfoForm'
import { WithApolloProps } from '@island.is/skilavottord-web/types'

const EditCompanyInfo = ({ apolloState }: WithApolloProps) => {
  const {
    t: { companyInfoForm: t, routes },
  } = useI18n()

  const router = useRouter()
  const { id } = router.query

  const companyInfo = apolloState[`RecyclingPartner:${id}`]

  useEffect(() => {
    if (!companyInfo) {
      router.replace(routes.companyInfo.baseRoute)
    }
  }, [companyInfo, router, routes])

  return (
    <>
      {companyInfo && (
        <FormPageLayout>
          <Stack space={4}>
            <Text variant="h1">{t.editTitle}</Text>
            <CompanyInfoForm type="edit" initialValues={companyInfo} />
          </Stack>
        </FormPageLayout>
      )}
    </>
  )
}

export default EditCompanyInfo
