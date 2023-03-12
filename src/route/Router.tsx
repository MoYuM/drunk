/* Copyright 2021, Milkdown by Mirone. */
import type { FC } from 'react'
import { lazy } from 'react'
import { Helmet } from 'react-helmet-async'
import { Route, Routes } from 'react-router-dom'
import { LazyLoad } from '../component/LazyLoad'

const AsyncPlayground = lazy(() => import('../component/Playground').then(module => ({ default: module.Playground })))

export const Router: FC = () => {

  const playgroundURL = '/playground'

  return (
    <Routes>
      <Route
        path={playgroundURL}
        element={
          <LazyLoad>
            <Helmet>
              <title>Milkdown | Playground</title>
            </Helmet>
            <AsyncPlayground />
          </LazyLoad>
        }
      />

      <Route path={playgroundURL} element={
        <>
          <Helmet>
            <title>Milkdown</title>
          </Helmet>
        </>
      } />
    </Routes>
  )
}
