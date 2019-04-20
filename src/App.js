import React from 'react'
import { Header } from './components'
import { Simulator } from './containers/Simulator'

export class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Header />
        <Simulator />
      </React.Fragment>
    )
  }
}
