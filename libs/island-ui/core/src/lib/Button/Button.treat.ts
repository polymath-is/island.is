import { styleMap, style } from 'treat'

export const active = style((theme) => ({
  ':after': {
    opacity: 1,
  },
}))

export const button = style((theme) => ({
  display: 'inline-flex',
  position: 'relative',
  padding: '22px 32px',
  borderRadius: '10px',
  outline: 0,
  border: 0,
  fontFamily: 'IBM Plex Sans, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  transition: 'color 150ms ease, background-color 150ms ease',
  ':focus': {
    color: theme.colors.dark,
    backgroundColor: theme.colors.mint2,
  },
  ':active': {
    backgroundColor: theme.colors.blueberry2,
  },
  ':after': {
    content: "''",
    position: 'absolute',
    pointerEvents: 'none',
    borderStyle: 'solid',
    borderWidth: '4px',
    borderColor: theme.colors.mint2,
    borderRadius: '10px',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0,
    transition: 'opacity 150ms ease',
  },
}))

export const variants = styleMap((theme) => ({
  default: {
    backgroundColor: theme.colors.blue2,
    color: theme.colors.white,
    ':hover': {
      color: theme.colors.white,
      backgroundColor: theme.colors.blueberry2,
    },
  },
  ghost: {
    backgroundColor: 'transparent',
    color: theme.colors.blue2,
    ':active': {
      backgroundColor: 'transparent',
    },
  },
}))

export const sizes = styleMap((theme) => ({
  normal: {
    fontSize: '18px',
    lineHeight: '28px',
    padding: '22px 32px',
  },
  large: {
    fontSize: '24px',
    lineHeight: '34px',
    padding: '22px 32px',
  },
}))
