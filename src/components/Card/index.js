import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'

export class Card extends React.Component {
  render () {
    const { installmentAmount, totalAmount, interestRate } = this.props

    return (
      <div className="form__result">
        <div className="quota__container">
          <h4>Valor da Parcela</h4>
          <div className="quota">
            <strong>R$ </strong>
            <span>{installmentAmount}</span>
          </div>
        </div>
        <div className="amount_container">
          <h4>Total a pagar</h4>
          <p>R$ {totalAmount}</p>
        </div>
        <div className="tax__container">
          <h4>Taxa de juros (mês)</h4>
          <p>{interestRate}</p>
        </div>
        <button className="button">
          Solicitar
        </button>
      </div>
    )
  }
}

Card.propTypes = {
  installmentAmount: PropTypes.string.isRequired,
  totalAmount: PropTypes.string.isRequired,
  interestRate: PropTypes.string.isRequired,
}
