/* Copyright 2021, Milkdown by Mirone. */
import type { FC } from 'react'
import { Router } from '../route/Router'
import { Layout } from './Layout'

export const App: FC = () => (
  <Layout>
    <Router />
  </Layout>
)
