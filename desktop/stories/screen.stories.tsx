// @ts-ignore
import { storiesOf } from './storybook-react'
import * as React from 'react'
import { SplashScreen } from '../src/components/SplashScreen'
import { LoginScreen } from '../src/components/LoginScreen'
import { WelcomeScreen } from '../src/components/WelcomeScreen'
import { MainScreen } from '../src/components/MainScreen'
import { SettingsScreen } from '../src/components/SettingsScreen'

storiesOf('Screens', module)
  .add('SplashScreen', () => <SplashScreen />)
  .add('LoginScreen', () => <LoginScreen />)
  .add('WelcomeScreen', () => <WelcomeScreen />)
  .add('MainScreen', () => <MainScreen />)
  .add('SettingsScreen', () => <SettingsScreen />)
