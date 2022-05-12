import * as React from 'react'
import styles from './styles.module.css'

interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Layout from './components/layout/Layout'
import IconByName from './components/IconByName'
import Widget from './components/Widget'
import Collapsible from './components/Collapsible'
import Menu from './components/Menu'
import DEFAULT_THEME from './components/theme'
import initializeI18n from './services/i18n'
import AppShell from './components/AppShell'
import ProgressBar from './components/ProgressBar'
import Tab from './components/Tab'
import Loding from './components/Loding';
import {H1, H2, H3, H4, H5}  from './components/layout/HeaderTags/index';

export {
  Header,
  Footer,
  Layout,
  IconByName,
  Widget,
  Collapsible,
  Menu,
  DEFAULT_THEME,
  initializeI18n,
  AppShell,
  ProgressBar,
  Tab,
  Loding,
  H1,
  H2, 
  H3, 
  H4, 
  H5
}

export * from './services/Auth'
export * from './services/RestClient'
export * from './services/EventBus'
export * from './components/helper'
