import './static/styles.css'

const utils = require('./lib/utils.js')

const changeInstallmentValue = (quotaElement, installmentsElement, loanAmountElement) => {
  const installmentValue = utils.calcAmount(installmentsElement, loanAmountElement) / installmentsElement.value
  document.querySelector('.tax__container p').innerHTML = `${utils.replaceDot(utils.monthlyFee(installmentValue, utils.unformatter(loanAmountElement.value), installmentsElement.value))} %`
  quotaElement.innerHTML = utils.formatValue(installmentValue)
}

const changeTotalAmountValue = (totalAmountElement, installmentsElement, loanAmountElement) => {
  const finalValue = utils.calcAmount(installmentsElement, loanAmountElement)
  totalAmountElement.innerHTML = utils.currencyFormatter(finalValue)
}

const updateMaxValue = (maxValue, rangeElement) => {
  rangeElement.setAttribute('max', maxValue)
  rangeElement.parentNode.children[1].children[1].innerHTML = utils.currencyFormatter(maxValue)
}

const changeInputElement = (inputElement, rangeElement, minValue, maxValue) => {
  rangeElement.setAttribute('min', minValue)
  rangeElement.value = (maxValue + minValue) / 2
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

const setMaxLoan = (value, maxLoan) => {
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

const updateCard = () => {
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

const resetPage = (selectElement, selectedOption) => {
  changeOptions(selectElement, selectedOption)
  updateCard()
}

const inputBlur = (inputElement, rangeElement, inputValue) => {
  var realValue = verifyValue(
    inputValue,
    rangeElement
  )
  console.log(realValue)
  rangeElement.value = realValue
  inputElement.value = utils.currencyFormatter(realValue)
  return realValue
}

export function Send (values) {
  return new Promise((resolve, reject) => {
    try {
      resolve(utils.toStringFormValues(values))
    } catch (error) {
      reject(error)
    }
  })
}

export function Submit (formElement) {
  formElement.addEventListener('submit', function (event) {
    event.preventDefault()
    if (utils.checkFormValidity(formElement)) {
      Send(utils.getFormValues(formElement))
        .then(result => confirm(result, 'Your form submited success'))
        .catch(error => Alert('Your form submited error', error))
    }
  })
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

export function handleChangeRangeWarranty (
  warrantyRangeElement,
  vehicleWarrantyElement
) {
  warrantyRangeElement.addEventListener('change', function (event) {
    const maxValue = setMaxLoan(event.target.value, utils.warranyOptions[document.getElementById('garantia').value].maxLoan)
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
    resetPage(document.getElementById('parcelas'), utils.warranyOptions[event.target.value])
  })
}

export function handleBlurTextInput () {
  const textInputGuarantee = document.getElementById('valor-garantia')
  textInputGuarantee.addEventListener('blur', function (event) {
    const value = inputBlur(
      textInputGuarantee,
      document.getElementById('valor-garantia-range'),
      event.target.value
    )
    const maxValue = setMaxLoan(value, utils.warranyOptions[document.getElementById('garantia').value].maxLoan)
    updateMaxValue(maxValue, document.getElementById('valor-emprestimo-range'))
    document.getElementById('valor-emprestimo').value = utils.currencyFormatter(
      document.getElementById('valor-emprestimo-range').value
    )
    updateCard()
  })
  const textInputLoan = document.getElementById('valor-emprestimo')
  textInputLoan.addEventListener('blur', function (event) {
    inputBlur(
      textInputLoan,
      document.getElementById('valor-emprestimo-range'),
      event.target.value
    )
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

export function handleLoad () {
  resetPage(
    document.getElementById('parcelas'),
    utils.warranyOptions[document.getElementById('garantia').value]
  )
}

export default class CreditasChallenge {
  static initialize () {
    handleLoad()
    this.registerEvents()
  }

  static registerEvents () {
    Submit(document.querySelector('.form'))
    handleBlurTextInput()
    handleChangeWarrantyType(
      document.getElementById('garantia')
    )
    handleChangeQuotaValue(
      document.querySelector('.quota span'),
      document.querySelector('.amount_container p'),
      document.getElementById('parcelas'),
      document.getElementById('valor-emprestimo')
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
