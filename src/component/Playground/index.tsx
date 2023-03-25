import { MilkdownProvider } from '@milkdown/react'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react'
import { FC, useEffect } from 'react'
import { lazy, useCallback, useRef, useState } from 'react'
import { compose } from '../../utils/compose'
import { LazyLoad } from '../LazyLoad'
import type { MilkdownRef } from './Milkdown'
import { ProseStateProvider } from './Milkdown/ProseStateProvider'
import { saveContent, readDefaultContent } from '../../utils/fs'

import './style.css'

const AsyncMilkdown = lazy(() => import('./Milkdown').then(module => ({ default: module.Milkdown })))

const Provider = compose(MilkdownProvider, ProsemirrorAdapterProvider, ProseStateProvider)

export const Playground: FC = () => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    init();
  }, [])

  const init = async () => {
    setLoading(true);
    const defaultContent = await readDefaultContent();
    if (defaultContent) {
      setContent(defaultContent);
    }
    setLoading(false);
  }

  const lockCodemirror = useRef(false)
  const milkdownRef = useRef<MilkdownRef>(null)
  // const codemirrorRef = useRef<CodemirrorRef>(null)

  const onMilkdownChange = useCallback((markdown: string) => {
    const lock = lockCodemirror.current
    if (lock) return
    saveContent(markdown);
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
