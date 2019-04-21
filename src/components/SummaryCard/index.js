import React from 'react'
import PropTypes from 'prop-types'
import { formatter, formatValue } from '../../lib/utils'
import './styles.css'

export class SummaryCard extends React.Component {
  render () {
    const { installmentAmount, amount, feeRate } = this.props

    return (
      <div className="form__result">
        <div className="quota__container">
          <h4>Valor da Parcela</h4>
          <div className="quota">
            <strong>R$ </strong>
            <span>{formatValue(installmentAmount)}</span>
          </div>
        </div>
        <div className="amount_container">
          <h4>Total a pagar</h4>
          <p>{formatter(amount)}</p>
        </div>
        <div className="tax__container">
          <h4>Taxa de juros (mês)</h4>
          <p>{formatValue(feeRate)} %</p>
        </div>
        <button className="button">
          Solicitar
        </button>
      </div>
    )
  }
}

SummaryCard.defaultProps = {
  installmentAmount: 0,
  amount: 0,
  feeRate: 0
}

SummaryCard.propTypes = {
  installmentAmount: PropTypes.number,
  amount: PropTypes.number,
  feeRate: PropTypes.number,
}
