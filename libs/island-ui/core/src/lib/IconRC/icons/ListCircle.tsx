import * as React from 'react'
import { SvgProps as SVGRProps } from '../Icon'

const SvgListCircle = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => {
  return (
    <svg
      className="list-circle_svg__ionicon"
      viewBox="0 0 512 512"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm-88 302a24 24 0 1124-24 24 24 0 01-24 24zm0-71a24 24 0 1124-24 24 24 0 01-24 24zm0-73a24 24 0 1124-24 24 24 0 01-24 24zm184 135H224a16 16 0 010-32h128a16 16 0 010 32zm0-71H224a16 16 0 010-32h128a16 16 0 010 32zm0-72H224a16 16 0 010-32h128a16 16 0 010 32z" />
    </svg>
  )
}

export default SvgListCircle