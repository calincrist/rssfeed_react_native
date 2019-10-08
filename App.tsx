/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { FunctionComponent, useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from 'react-native'
import { Provider } from 'mobx-react'
import AppContainer from './src/navigation/AppContainer'
import store from './src/store'

const App: FunctionComponent<{}> = (props: {}) => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}

const styles = StyleSheet.create({})

export default App
