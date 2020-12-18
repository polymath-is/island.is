import React from 'react'

import { Assets, Entries, Types } from '../../hooks/use-contentful-client'

interface SmartFieldProps {
  entryId?: string
  data: {
    entries: Entries[]
    types: Types[]
    assets: Assets[]
  }
}

const recursive = (obj: Record<string, any>, ids: string[] = []) => {
  for (var k in obj) {
    if (typeof obj[k] == 'object' && obj[k] !== null) {
      recursive(obj[k], ids)
    } else {
      if (obj?.linkType === 'Entry' || obj?.linkType === 'Asset') {
        const id = obj?.id ?? obj?.data?.target?.sys?.id

        if (ids.indexOf(id) === -1) {
          ids.push(id)
        }
      }
    }
  }

  return ids
}

function getLinkedRef<T>(ids: string[], arr: T[]) {
  return arr.filter((item) => ids.find((id) => id === item.sys.id))
}

const renderer = (value: any) => {
  const field = value?.['is-IS']

  if (typeof field === 'string') {
    return (
      <div
        contentEditable
        style={{
          padding: 0,
          width: '100%',
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          lineHeight: '28px',
        }}
      >
        {field}
      </div>
    )
  }

  if (field?.nodeType === 'document') {
    return field.content.map((item, index) => {
      console.log('-item', item)
      const entryBlock = item?.nodeType === 'embedded-entry-block'
      const entryAsset = item?.nodeType === 'embedded-asset-block'

      if (entryBlock) {
        return (
          <div
            contentEditable
            style={{
              marginTop: 14,
              marginBottom: 14,
              marginLeft: 4,
              padding: '4px 8px',
              width: '100%',
              borderRadius: 6,
              borderColor: 'transparent',
              backgroundColor: '#ddd',
              lineHeight: '28px',
            }}
          >
            {item.linkedFields.map((field) => {
              const fieldMap = field?.[1]?.['is-IS']

              if (fieldMap?.nodeType === 'document') {
                return fieldMap.content.map((subItem) => {
                  return subItem.content.map((subContent) => (
                    <p>{subContent?.value}</p>
                  ))
                })
              }

              if (fieldMap?.sys) {
                return <p>Linked asset {fieldMap?.sys.id}.</p>
              }

              return <p>{fieldMap}</p>
            })}
          </div>
        )
      }

      if (entryAsset) {
        return (
          <div
            style={{
              marginTop: 4,
              marginBottom: 4,
              marginLeft: 4,
              padding: '4px 8px',
              width: '100%',
              borderRadius: 6,
              borderColor: 'transparent',
              backgroundColor: '#ddd',
              lineHeight: '28px',
            }}
          >
            {item.linkedFields.map((linkedField) => {
              const isFile = linkedField?.[1]?.['is-IS']?.url

              if (isFile) {
                return (
                  <div style={{ marginTop: 5, marginBottom: 5 }}>
                    <p style={{ fontSize: 14 }}>
                      Linked asset <a href={isFile}>here</a>.
                    </p>
                  </div>
                )
              }

              return (
                <div
                  contentEditable
                  style={{
                    marginTop: 4,
                    marginBottom: 4,
                    marginLeft: 4,
                    padding: '4px 8px',
                    width: '100%',
                    borderRadius: 6,
                    borderColor: 'transparent',
                    backgroundColor: '#ddd',
                    lineHeight: '28px',
                  }}
                >
                  {linkedField?.[1]?.['is-IS']}
                </div>
              )
            })}
          </div>
        )
      }

      const tag = (copy: string) => {
        switch (item?.nodeType) {
          case 'heading-2':
            return <h2 style={{ marginBottom: 6 }}>{copy}</h2>

          case 'paragraph':
            return <p style={{ marginBottom: 6 }}>{copy}</p>

          default:
            return null
        }
      }

      return (
        <div
          key={index}
          contentEditable
          style={{
            padding: 0,
            width: '100%',
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            lineHeight: '28px',
          }}
        >
          {tag(item.content?.[0]?.value)}
        </div>
      )
    })
  }

  if (field?.sys?.linkType === 'Entry') {
    return (
      <div key={field.sys.id}>
        <p style={{ fontSize: 14 }}>Link to another entry</p>
      </div>
    )
  }

  if (field?.sys?.linkType === 'Asset') {
    return <div key={field.sys.id}>Asset not implemented yet</div>
  }

  return <p>Field not implemented yet.</p>
}

const loop = (data: any[]) => {
  return data.map(([name, value], index) => {
    return (
      <div
        key={index}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'row',
          position: 'relative',
          marginBottom: 20,
          paddingTop: 2,
          paddingBottom: 2,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: 3,
            backgroundColor: '#ddd',
          }}
        />

        <div style={{ marginLeft: 16 }}>
          <p style={{ fontSize: 16, opacity: 0.4, marginBottom: 4 }}>{name}</p>
          {renderer(value)}
        </div>
      </div>
    )
  })
}

const mergeObjects = (entry: Entries, entries: Entries[], assets: Assets[]) => {
  const fields = Object.entries(entry.fields) as [string, Record<string, any>][]

  return fields.map((field) => {
    const value = field?.[1]?.['is-IS']

    if (typeof value === 'string') {
      return field
    }

    if (value?.nodeType === 'document') {
      const newContent = value.content.map((item, index) => {
        if (item.nodeType === 'embedded-entry-block') {
          const id = item?.data?.target?.sys?.id
          const linkedEntry = entries.find((entry) => entry.sys.id === id)

          return {
            ...item,
            linkedFields: Object.entries(linkedEntry?.fields),
          }
        }

        if (item.nodeType === 'embedded-asset-block') {
          const id = item?.data?.target?.sys?.id
          const linkedAsset = assets.find((asset) => asset.sys.id === id)

          return {
            ...item,
            linkedFields: Object.entries(linkedAsset?.fields),
          }
        }

        return item
      })

      return [
        field[0],
        {
          ...field?.[1],
          'is-IS': {
            ...field[1]['is-IS'],
            content: newContent,
          },
        },
      ]
    }

    return field
  })
}

export const SmartField = ({ entryId, data }: SmartFieldProps) => {
  if (!entryId) {
    throw new Error('Missing entryId props')
  }

  const entry = data.entries.find((item) => item.sys.id === entryId)

  if (!entry) {
    throw new Error(`Cannot find entry for entryId ${entryId}`)
  }

  const linkedIds = recursive(entry.fields)
  const linkedEntries = getLinkedRef<Entries>(linkedIds, data.entries)
  const linkedAssets = getLinkedRef<Assets>(linkedIds, data.assets)
  const content = mergeObjects(entry, linkedEntries, linkedAssets)

  return loop(content)
}
