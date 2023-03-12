/* Copyright 2021, Milkdown by Mirone. */
import { MilkdownProvider } from '@milkdown/react'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react'
import type { FC } from 'react'
import { lazy, useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { compose } from '../../utils/compose'
import { LazyLoad } from '../LazyLoad'
import type { CodemirrorRef } from './Codemirror'
import type { MilkdownRef } from './Milkdown'
import { FeatureToggleProvider } from './Milkdown/FeatureToggleProvider'
import { ProseStateProvider } from './Milkdown/ProseStateProvider'
import { decode } from './Share/share'
import { ShareProvider } from './Share/ShareProvider'

import './style.css'

const AsyncMilkdown = lazy(() => import('./Milkdown').then(module => ({ default: module.Milkdown })))

const importContent = () => {
  return import('./content/index.md')
}

const Provider = compose(FeatureToggleProvider, MilkdownProvider, ProsemirrorAdapterProvider, ProseStateProvider, ShareProvider)

export const Playground: FC = () => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const text = searchParams.get('text')
    let importing = true
    if (text) {
      setContent(decode(text))
      setLoading(false)
    }
    else {
      importContent()
        .then((x) => {
          if (importing) {
            setContent(x.default)
            setLoading(false)
          }
        })
        .catch(console.error)
    }

    return () => {
      importing = false
      setLoading(true)
    }
  }, [searchParams])

  const lockCodemirror = useRef(false)
  const milkdownRef = useRef<MilkdownRef>(null)
  const codemirrorRef = useRef<CodemirrorRef>(null)

  const onMilkdownChange = useCallback((markdown: string) => {
    const lock = lockCodemirror.current
    if (lock)
      return

    const codemirror = codemirrorRef.current
    if (!codemirror)
      return
    codemirror.update(markdown)
  }, [])


  return (loading || !content)
    ? <div>loading...</div>
    : (
      <Provider>
        <LazyLoad>
          <AsyncMilkdown ref={milkdownRef} content={content} onChange={onMilkdownChange} />
        </LazyLoad>
      </Provider>
    )
}
