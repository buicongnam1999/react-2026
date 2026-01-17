import React from 'react'

interface ILayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <div className='px-[20px] mt-[20px] flex-1'>{children}</div>
  )
}
