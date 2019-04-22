import './static/styles.css'
import * as utils from './lib/utils'
import * as helper from './lib/eventsHelper'

const updateCard = () => {
  helper.changeInstallmentValue(
    document.querySelector('.amount_container p'),
    document.querySelector('.quota span'),
    document.getElementById('parcelas'),
    document.getElementById('valor-emprestimo'),
    document.querySelector('.tax__container p')
  )
}

export const updateMaxValue = (maxValue, rangeElement) => {
  rangeElement.setAttribute('max', maxValue)
  rangeElement.parentNode.children[1].children[1].innerHTML = utils.currencyFormatter(maxValue)
}

export const changeInputElement = (inputElement, rangeElement, minValue, maxValue) => {
  rangeElement.setAttribute('min', minValue)
  rangeElement.value = (maxValue / 2) * 1.25
  rangeElement.parentNode.children[1].children[0].innerHTML = utils.currencyFormatter(minValue)
  updateMaxValue(maxValue, rangeElement)
  inputElement.value = utils.currencyFormatter(rangeElement.value)
}

const verifyValue = (loanValue, rangeElement) => {
  var realValue = utils.unformatter(loanValue)
  if (realValue < rangeElement.getAttribute('min')) {
    return rangeElement.getAttribute('min')
  }
  if (realValue > rangeElement.getAttribute('max')) {
    return rangeElement.getAttribute('max')
  }
  return realValue
}

export const setMaxLoan = (value, maxLoan) => {
  if (utils.maxLoan(value) > maxLoan) {
    return maxLoan
  }
  return utils.maxLoan(value)
}

const changeOptions = (selectElement, selectedOption) => {
  const loanRange = document.getElementById('valor-emprestimo-range')
  const loanInput = document.getElementById('valor-emprestimo')
  const warrantyRange = document.getElementById('valor-garantia-range')
  const warrantyInput = document.getElementById('valor-garantia')
  utils.renderOptions(selectElement, selectedOption.installments)
  changeInputElement(warrantyInput, warrantyRange, 1.25 * selectedOption.minLoan, 9000000)
  changeInputElement(loanInput, loanRange, selectedOption.minLoan, selectedOption.maxLoan)
}

const resetPage = (selectElement, selectedOption) => {
  changeOptions(selectElement, selectedOption)
  updateCard()
}

const inputBlur = (inputElement, rangeElement, inputValue) => {
  var realValue = verifyValue(
    inputValue,
    rangeElement
  )
  rangeElement.value = realValue
  inputElement.value = utils.currencyFormatter(realValue)
  return realValue
}

export const getFormValues = formElement =>
  Object.values(formElement.elements)
    .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
    .map(element => ({
      field: element.name,
      value: element.value
    }))

export const toStringFormValues = values => {
  const match = matchString => value => value.field === matchString
  const finalValue = utils.calcAmount(values.find(match('parcelas')), values.find(match('valor-emprestimo')))

  return `Confirmação\n${values
    .map(value => `Campo: ${value.field}, Valor: ${value.value}`)
    .join('\n')}`.concat(
    `\nTotal ${utils.currencyFormatter(finalValue)}`
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
    if (utils.checkFormValidity(formElement)) {
      Send(getFormValues(formElement))
        .then(result => confirm(result, 'Your form submited success'))
        .catch(error => alert('Your form submited error', error))
    }
  })
}

export function handleChangeQuotaValue (
  quotaElement,
  totalAmountElement,
  installmentsElement,
  loanAmountElement,
  taxElement
) {
  installmentsElement.addEventListener('change', function (event) {
    helper.changeInstallmentValue(totalAmountElement, quotaElement, installmentsElement, loanAmountElement, taxElement)
  })
}

export function handleChangeRangeWarranty (
  warrantyRangeElement,
  vehicleWarrantyElement
) {
  warrantyRangeElement.addEventListener('change', function (event) {
    const maxValue = setMaxLoan(event.target.value, utils.selectedWarranty(document.getElementById('garantia').value).maxLoan)
    updateMaxValue(maxValue, document.getElementById('valor-emprestimo-range'))
    document.getElementById('valor-emprestimo').value = utils.currencyFormatter(
      document.getElementById('valor-emprestimo-range').value
    )
    vehicleWarrantyElement.value =
      utils.currencyFormatter(Number(event.target.value))
    updateCard()
  })
}

export function handleChangeWarrantyType (
  warrantyElement
) {
  warrantyElement.addEventListener('change', function (event) {
    resetPage(document.getElementById('parcelas'), utils.selectedWarranty(event.target.value))
  })
}

export function handleBlurWarrantyTextInput (textInputWarranty) {
  textInputWarranty.addEventListener('input', function (event) {
    textInputWarranty.value = 'R$ ' + (event.target.value).split('R$ ')[1]
    if ((event.target.value).split('R$ ')[1] === 'undefined') {
      textInputWarranty.value = 'R$ '
    }
  })
  textInputWarranty.addEventListener('blur', function (event) {
    var value = event.target.value
    const rangeWarranty = document.getElementById('valor-garantia-range')
    value = inputBlur(
      textInputWarranty,
      rangeWarranty,
      value
    )
    if (isNaN(value)) {
      textInputWarranty.value = utils.currencyFormatter(rangeWarranty.getAttribute('min'))
    }
    const maxValue = setMaxLoan(value, utils.selectedWarranty(document.getElementById('garantia').value).maxLoan)
    updateMaxValue(maxValue, document.getElementById('valor-emprestimo-range'))
    document.getElementById('valor-emprestimo').value = utils.currencyFormatter(
      document.getElementById('valor-emprestimo-range').value
    )
    updateCard()
  })
}

export function handleBlurLoanTextInput (
  textInputLoanElement,
  rangeLoanElement
) {
  textInputLoanElement.addEventListener('input', function (event) {
    textInputLoanElement.value = 'R$ ' + (event.target.value).split('R$ ')[1]
    if ((event.target.value).split('R$ ')[1] === 'undefined') {
      textInputLoanElement.value = 'R$ '
    }
  })
  textInputLoanElement.addEventListener('blur', function (event) {
    var value = event.target.value
    value = inputBlur(
      textInputLoanElement,
      rangeLoanElement,
      value
    )
    if (isNaN(value)) {
      textInputLoanElement.value = utils.currencyFormatter(rangeLoanElement.getAttribute('min'))
    }
    updateCard()
  })
}

export function handleChangeLoanAmount (
  loanAmountRangeElement,
  loanAmountElement
) {
  loanAmountRangeElement.addEventListener('change', function (event) {
    const newValue = utils.currencyFormatter(Number(event.target.value))
    loanAmountElement.value = newValue
    updateCard()
  })
}

export function handleLoad (
  installmentsElement,
  warrantyElement
) {
  resetPage(
    installmentsElement,
    utils.selectedWarranty(warrantyElement.value)
  )
}

export default class CreditasChallenge {
  static initialize () {
    handleLoad(
      document.getElementById('parcelas'),
      document.getElementById('garantia')
    )
    this.registerEvents()
  }

  static registerEvents () {
    Submit(document.querySelector('.form'))
    handleBlurWarrantyTextInput(
      document.getElementById('valor-garantia')
    )
    handleBlurLoanTextInput(
      document.getElementById('valor-emprestimo'),
      document.getElementById('valor-emprestimo-range')
    )
    handleChangeWarrantyType(
      document.getElementById('garantia')
    )
    handleChangeQuotaValue(
      document.querySelector('.quota span'),
      document.querySelector('.amount_container p'),
      document.getElementById('parcelas'),
      document.getElementById('valor-emprestimo'),
      document.querySelector('.tax__container p')
    )

    handleChangeRangeWarranty(
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
