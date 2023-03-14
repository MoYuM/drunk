import { FC } from 'react'
import { Playground } from './Playground';

export const App: FC = () => (
  <div className='dark:bg-nord0 w-full h-full min-h-screen bg-white text-gray-900 dark:text-gray-50 overflow-y-auto'>
    <Playground />
  </div>
)
