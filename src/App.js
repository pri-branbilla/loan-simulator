import React from 'react'
import { Header, Card } from './components'

export class App extends React.Component {
  render = () => (
    <React.Fragment>
      <Header />
      <Card installmentAmount="465,00" totalAmount="11.112,00" interestRate="111,12%" />
    </React.Fragment>
  )
}
