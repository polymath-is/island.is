import React, { FC, ReactNode, useState } from 'react'
import { useStyles } from 'react-treat'
import cn from 'classnames'

import * as styleRefs from './Button.treat'

/* eslint-disable-next-line */
export interface ButtonProps {
  disabled?: boolean
  onClick?: () => void
  variant?: 'default' | 'ghost' | 'text'
  size?: 'normal' | 'large'
}

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  variant = 'default',
  size = 'normal',
}) => {
  const styles = useStyles(styleRefs)

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        styles.button,
        styles.sizes[size],
        styles.variants[variant],
      )}
    >
      {children}
    </button>
  )
}

export default Button
