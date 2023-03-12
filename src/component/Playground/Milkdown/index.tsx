/* Copyright 2021, Milkdown by Mirone. */
import { editorViewCtx, parserCtx } from '@milkdown/core'
import { Slice } from '@milkdown/prose/model'
import { Milkdown as Editor } from '@milkdown/react'
import { forwardRef, useImperativeHandle } from 'react'
import { usePlayground } from './usePlayground'


interface MilkdownProps {
  content: string
  onChange: (markdown: string) => void
}
export interface MilkdownRef { update: (markdown: string) => void }
export const Milkdown = forwardRef<MilkdownRef, MilkdownProps>(({ content, onChange }, ref) => {
  const { loading, get } = usePlayground(content, onChange)

  useImperativeHandle(ref, () => ({
    update: (markdown: string) => {
      if (loading)
        return
      const editor = get()
      editor?.action((ctx) => {
        const view = ctx.get(editorViewCtx)
        const parser = ctx.get(parserCtx)
        const doc = parser(markdown)
        if (!doc)
          return
        const state = view.state
        view.dispatch(state.tr.replace(0, state.doc.content.size, new Slice(doc.content, 0, 0)))
      })
    },
  }))


  return (
    <div className="h-full pt-16">
      <Editor />
    </div>
  )
})
Milkdown.displayName = 'Milkdown'
