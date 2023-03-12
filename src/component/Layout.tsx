/* Copyright 2021, Milkdown by Mirone. */
import type { FC, ReactNode } from 'react'

export type LayoutProps = {
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {

  return (
    <div className="dark:bg-nord0 w-full min-h-screen  bg-white text-gray-900 dark:text-gray-50">
      {children}
    </div>
  )
}
