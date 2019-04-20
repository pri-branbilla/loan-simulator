import React from 'react'
import PropTypes from 'prop-types'
import { Select, Input, Card } from '../../components'
import { guaranteeOptions, selectGuarantee } from './constants'
import './styles.css'

export class Simulator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      installments: 24,
      guaranteeValue: "14400",
      loanValue: 57000,
      selectedGuarantee: guaranteeOptions.vehicle
    }
  }

  changeState = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  changeGuarantee = (name, value) => {
    return this.setState({
      selectedGuarantee: guaranteeOptions[value],
      loanValue: guaranteeOptions[value].minLoan
    })
  }

  sendData = (e) => {
    e.preventDefault()
  }

  render () {
    const { minLoan, maxLoan, installments } = this.state.selectedGuarantee
    return (
      <main className="main">
        <h1 className="main__title">Realize uma simulação de crédito utilizando seu bem como garantia.</h1>
        <section className="section__container">
          <form className="form" name="form" method="POST" onSubmit={(e) => this.sendData(e)}>
            <div className="form__fields">
              <div className="field-group">
                <Select
                  inputId="installments"
                  label="Número de parcelas"
                  options={installments}
                  onChange={this.changeState}
                />
                <Select
                  inputId="guarantee"
                  label="Garantia"
                  options={selectGuarantee}
                  onChange={this.changeGuarantee}
                />
              </div>
              <div className="valor-garantia">
                <Input
                  inputId="guaranteeValue"
                  label="Valor da Garantia"
                  value={this.state.guaranteeValue}
                  min={12000}
                  max={24000}
                  onChange={this.changeState}
                />
              </div>
              <div className="emprestimo">
                <Input
                  inputId="loanValue"
                  label="Valor do Empréstimo"
                  value={this.state.loanValue}
                  min={minLoan}
                  max={maxLoan}
                  onChange={this.changeState}
                />
              </div>
            </div>
            <Card
              installmentAmount="465,00"
              totalAmount="11.112,00"
              interestRate="111,12%"
            />
          </form>
        </section>
        <footer className="footer">*Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quas non harum dolor eligendi id, ab corrupti blanditiis suscipit ex odit error alias minus. Enim dolores eum officiis quae rem!*</footer>
      </main>
    )
  }
}

Simulator.propTypes = {
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
}
