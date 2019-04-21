import './styles.css'

const { calcAmount, currencyFormatter, formatValue, monthlyFee, unformatter, replaceDot } = require('./lib/utils.js')

export const maxLoan = (value) => {
  return value * 0.8
}

export const checkFormValidity = formElement => formElement.checkValidity()

export const getFormValues = formElement =>
  Object.values(formElement.elements)
    .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
    .map(element => ({
      field: element.name,
      value: element.value
    }))

export const toStringFormValues = values => {
  const match = matchString => value => value.field === matchString
  const finalValue = calcAmount(values.find(match('parcelas')), values.find(match('valor-emprestimo')))

  return `Confirmação\n${values
    .map(value => `Campo: ${value.field}, Valor: ${value.value}`)
    .join('\n')}`.concat(
    `\nTotal ${currencyFormatter(finalValue)}`
  )
}

export function Send (values) {
  return new Promise((resolve, reject) => {
    try {
      resolve(toStringFormValues(values))
    } catch (error) {
      reject(error)
    }
  })
}

export function Submit (formElement) {
  formElement.addEventListener('submit', function (event) {
    event.preventDefault()
    if (checkFormValidity(formElement)) {
      Send(getFormValues(formElement))
        .then(result => confirm(result, 'Your form submited success'))
        .catch(error => Alert('Your form submited error', error))
    }
  })
}

const changeInstallmentValue = (quotaElement, installmentsElement, loanAmountElement) => {
  const installmentValue = calcAmount(installmentsElement, loanAmountElement) / installmentsElement.value
  document.querySelector('.tax__container p').innerHTML = `${replaceDot(monthlyFee(installmentValue, unformatter(loanAmountElement.value), installmentsElement.value))} %`
  quotaElement.innerHTML = formatValue(installmentValue)
}

const changeTotalAmountValue = (totalAmountElement, installmentsElement, loanAmountElement) => {
  const finalValue = calcAmount(installmentsElement, loanAmountElement)
  totalAmountElement.innerHTML = currencyFormatter(finalValue)
}

export function handleChangeQuotaValue (
  quotaElement,
  totalAmountElement,
  installmentsElement,
  loanAmountElement
) {
  installmentsElement.addEventListener('change', function (event) {
    changeInstallmentValue(quotaElement, installmentsElement, loanAmountElement)
    changeTotalAmountValue(totalAmountElement, installmentsElement, loanAmountElement)
  })
}

export function handleChangeRangeVehicleUnderWarranty (
  warrantyRangeElement,
  vehicleWarrantyElement
) {
  const MIN_VALUE = 12000.0
  warrantyRangeElement.addEventListener('change', function (event) {
    vehicleWarrantyElement.value =
      currencyFormatter((Number(MIN_VALUE) * Number(event.target.value)) / 100 + Number(MIN_VALUE))
  })
}

export function handleChangeLoanAmount (
  loanAmountRangeElement,
  loanAmountElement
) {
  const MIN_VALUE = 30000.0
  loanAmountRangeElement.addEventListener('change', function (event) {
    changeInstallmentValue(
      document.querySelector('.quota span'),
      document.getElementById('parcelas'),
      loanAmountElement
    )
    changeTotalAmountValue(
      document.querySelector('.amount_container p'),
      document.getElementById('parcelas'),
      loanAmountElement
    )
    loanAmountElement.value =
      currencyFormatter((Number(MIN_VALUE) * Number(event.target.value)) / 100 + Number(MIN_VALUE))
  })
}

export function handleLoad () {
  changeInstallmentValue(
    document.querySelector('.quota span'),
    document.getElementById('parcelas'),
    document.getElementById('valor-emprestimo')
  )
  changeTotalAmountValue(
    document.querySelector('.amount_container p'),
    document.getElementById('parcelas'),
    document.getElementById('valor-emprestimo')
  )
}

export default class CreditasChallenge {
  static initialize () {
    handleLoad()
    this.registerEvents()
  }

  static registerEvents () {
    Submit(document.querySelector('.form'))

    handleChangeQuotaValue(
      document.querySelector('.quota span'),
      document.querySelector('.amount_container p'),
      document.getElementById('parcelas'),
      document.getElementById('valor-emprestimo')
    )

    handleChangeRangeVehicleUnderWarranty(
      document.getElementById('valor-garantia-range'),
      document.getElementById('valor-garantia')
    )

    handleChangeLoanAmount(
      document.getElementById('valor-emprestimo-range'),
      document.getElementById('valor-emprestimo')
    )
  }
}

document.addEventListener('DOMContentLoaded', function () {
  CreditasChallenge.initialize()
})
