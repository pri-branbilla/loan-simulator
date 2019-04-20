import React from 'react'
import { Select, SelectorInput, SummaryCard } from '../../components'
import { guaranteeOptions, selectGuarantee } from './constants'
import { totalAmount, installmentValue, monthlyFee, realLoanValue } from '../../lib/utils'
import './styles.css'

export class Simulator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedInstallments: 24,
      guaranteeValue: 1000000,
      loanValue: 3000,
      maxLoan: 0.8 * guaranteeOptions.vehicle.maxLoan,
      selectedGuarantee: guaranteeOptions.vehicle,
      finalAmount: totalAmount(3000, 24, 14400),
    }
  }

  changeState = (name, value) => {
    this.setState({
      [name]: value,
    },
    () => {
        this.setMaxLoan()
        return this.setState({
          finalAmount: totalAmount(
            this.state.loanValue,
            this.state.selectedInstallments,
            this.state.guaranteeValue
        )
      })
    })
  }

  setMaxLoan = () => {
    const guaranteeMaxLoan = this.state.selectedGuarantee.maxLoan
    const valueMaxLoan = 0.8 * this.state.guaranteeValue
    this.setState({
      maxLoan: guaranteeMaxLoan < valueMaxLoan ? guaranteeMaxLoan : valueMaxLoan,
    })
  }

  changeGuarantee = (name, value) => {
    return this.setState({
      selectedGuarantee: guaranteeOptions[value],
      loanValue: guaranteeOptions[value].minLoan,
      finalAmount: totalAmount(
        guaranteeOptions[value].minLoan,
        guaranteeOptions[value].installments[0].value,
        this.state.guaranteeValue
      )
    })
  }

  sendData = (e) => {
    e.preventDefault()
    console.log(this.state)
  }

  render () {
    const { finalAmount, selectedInstallments, loanValue, guaranteeValue, maxLoan } = this.state
    const { minLoan, installments } = this.state.selectedGuarantee
    return (
      <main className="main">
        <h1 className="main__title">Realize uma simulação de crédito utilizando seu bem como garantia.</h1>
        <section className="section__container">
          <form className="form" name="form" method="POST" onSubmit={(e) => this.sendData(e)}>
            <div className="form__fields">
              <div className="field-group">
                <Select
                  inputId="selectedInstallments"
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
                <SelectorInput
                  inputId="guaranteeValue"
                  label="Valor da Garantia"
                  value={guaranteeValue}
                  min={12000}
                  max={2000000}
                  onChange={this.changeState}
                />
              </div>
              <div className="emprestimo">
                <SelectorInput
                  inputId="loanValue"
                  label="Valor do Empréstimo"
                  value={loanValue}
                  min={minLoan}
                  max={maxLoan}
                  onChange={this.changeState}
                />
              </div>
            </div>
            <SummaryCard
              installmentAmount={installmentValue(finalAmount, selectedInstallments)}
              amount={finalAmount}
              feeRate={
                monthlyFee(
                  installmentValue(
                    finalAmount,
                    selectedInstallments
                  ),
                  realLoanValue(loanValue, guaranteeValue),
                  selectedInstallments
                )
              }
            />
          </form>
        </section>
        <footer className="footer">*O valor do empréstimo pode ser de até 80% do valor da garantia declarada.*</footer>
      </main>
    )
  }
}
