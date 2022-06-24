import * as React from 'react'
import styles from './styles.module.css'

interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

import AppBar from './components/layout/AppBar'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Layout from './components/layout/Layout'
import IconByName from './components/IconByName'
import Widget from './components/Widget'
import Collapsible from './components/Collapsible'
import Menu, { SubMenu } from './components/Menu'
import DEFAULT_THEME from './components/theme'
import initializeI18n from './services/i18n'
import AppShell from './components/AppShell'
import ProgressBar from './components/ProgressBar'
import Tab from './components/Tab'
import Loading from './components/Loading'
import FilterButton from './components/FilterButton'
import * as teacherRegistryService from './services/teacherRegistryService'
import * as classRegistryService from './services/classRegistryService'
import * as attendanceRegistryService from './services/attendanceRegistryService'
import * as studentRegistryService from './services/studentRegistryService'
import { getApiConfig } from './services/configApiRegistryService'

export {
  AppBar,
  Header,
  Footer,
  Layout,
  IconByName,
  FilterButton,
  Widget,
  Collapsible,
  Menu,
  SubMenu,
  DEFAULT_THEME,
  initializeI18n,
  AppShell,
  ProgressBar,
  Tab,
  Loading,
  teacherRegistryService,
  classRegistryService,
  attendanceRegistryService,
  studentRegistryService,
  getApiConfig
}

export * from './services/Auth'
export * from './services/RestClient'
export * from './services/EventBus'
export * from './components/helper'
export * from './services/Telemetry'
export * from './components/calender'
export * from './components/layout/HeaderTags/index'
