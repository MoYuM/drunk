import { MilkdownProvider } from '@milkdown/react'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react'
import type { FC } from 'react'
import { lazy, useCallback, useRef, useState } from 'react'
import { compose } from '../../utils/compose'
import { LazyLoad } from '../LazyLoad'
import type { CodemirrorRef } from './Codemirror'
import type { MilkdownRef } from './Milkdown'
import { FeatureToggleProvider } from './Milkdown/FeatureToggleProvider'
import { ProseStateProvider } from './Milkdown/ProseStateProvider'
import { ShareProvider } from './Share/ShareProvider'

import './style.css'

const AsyncMilkdown = lazy(() => import('./Milkdown').then(module => ({ default: module.Milkdown })))

const Provider = compose(FeatureToggleProvider, MilkdownProvider, ProsemirrorAdapterProvider, ProseStateProvider, ShareProvider)

export const Playground: FC = () => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const lockCodemirror = useRef(false)
  const milkdownRef = useRef<MilkdownRef>(null)
  const codemirrorRef = useRef<CodemirrorRef>(null)

  const onMilkdownChange = useCallback((markdown: string) => {
    const lock = lockCodemirror.current
    if (lock) return

    const codemirror = codemirrorRef.current
    if (!codemirror) return
    codemirror.update(markdown)
  }, [])


  return (loading)
    ? <div>loading...</div>
    : (
      <Provider>
        <LazyLoad>
          <AsyncMilkdown ref={milkdownRef} content={content} onChange={onMilkdownChange} />
        </LazyLoad>
      </Provider>
    )
}
