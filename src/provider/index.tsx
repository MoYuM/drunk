import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { compose } from '../utils/compose'
import { DarkModeProvider } from './DarkModeProvider'
import { ErrorProvider } from './ErrorProvider'
import { HelmetProvider } from './HelmetProvider'
import { SidePanelStateProvider } from './SidePanelStateProvider'

export const AppProvider = compose(
  StrictMode,
  ErrorProvider,

  HelmetProvider,
  BrowserRouter,

  DarkModeProvider,
  SidePanelStateProvider,
)
