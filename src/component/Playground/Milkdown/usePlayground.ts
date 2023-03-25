import { Editor, defaultValueCtx, editorViewOptionsCtx, rootCtx } from '@milkdown/core'

import { listener, listenerCtx } from '@milkdown/plugin-listener'

import { commonmark } from '@milkdown/preset-commonmark'
import { useEditor } from '@milkdown/react'
import { nord } from '@milkdown/theme-nord'
import debounce from 'lodash.debounce'
import { useEffect, useRef } from 'react'
import { useSetProseState } from './ProseStateProvider'

export const usePlayground = (
  defaultValue: string,
  onChange: (markdown: string) => void,
) => {
  const setProseState = useSetProseState()
  const defaultValueRef = useRef(defaultValue)

  const editorInfo = useEditor((root) => {
    const editor = Editor
      .make()
      .config((ctx) => {
        ctx.update(editorViewOptionsCtx, prev => ({
          ...prev,
          attributes: {
            class: 'mx-auto p-1 box-border',
          },
        }))
        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, defaultValueRef.current)
        ctx.get(listenerCtx)
          .markdownUpdated((_, markdown) => {
            debounce(onChange, 500)(markdown)
          }).updated((_, doc) => {
            debounce(setProseState, 500)(doc.toJSON())
          })
      })
      .config(nord)
      .use(commonmark)
      .use(listener)

    return editor
  }, [onChange])

  useEffect(() => {
    onChange(defaultValue)
  }, [defaultValue, onChange])

  return editorInfo
}
