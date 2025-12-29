import type { PropsWithChildren } from 'react'

type BannerProps = PropsWithChildren & {
  status: string
}

export default function Banner({ status, children }: BannerProps) {
  return <div className={`banner ${status}`}>{children}</div>
}
