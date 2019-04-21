import './styles.css'

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

const changeInputElement = (inputElement, rangeElement, minValue, maxValue) => {
  rangeElement.setAttribute('min', minValue)
  rangeElement.value = minValue
  rangeElement.setAttribute('max', maxValue)
  rangeElement.parentNode.children[1].children[0].innerHTML = utils.currencyFormatter(minValue)
  rangeElement.parentNode.children[1].children[1].innerHTML = utils.currencyFormatter(maxValue)
  inputElement.value = utils.currencyFormatter(minValue)
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

const changeOptions = (selectElement, selectedOption) => {
  const loanRange = document.getElementById('valor-emprestimo-range')
  const loanInput = document.getElementById('valor-emprestimo')
  const warrantyRange = document.getElementById('valor-garantia-range')
  const warrantyInput = document.getElementById('valor-garantia')
  utils.renderOptions(selectElement, selectedOption.installments)
  changeInputElement(loanInput, loanRange, selectedOption.minLoan, selectedOption.maxLoan)
  changeInputElement(warrantyInput, warrantyRange, 1.25 * selectedOption.minLoan, 9000000)
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
  updateCard()
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

export function handleChangeRangeVehicleUnderWarranty (
  warrantyRangeElement,
  vehicleWarrantyElement
) {
  warrantyRangeElement.addEventListener('change', function (event) {
    vehicleWarrantyElement.value =
      utils.currencyFormatter(Number(event.target.value))
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
  textInputGuarantee.addEventListener('input', function (event) {
    if ((event.target.value).indexOf('-') > -1) {
      textInputGuarantee.value = (event.target.value).replace('-', '')
    }
  })
  textInputGuarantee.addEventListener('blur', function (event) {
    inputBlur(textInputGuarantee, document.getElementById('valor-garantia-range'), event.target.value)
  })
  const textInputLoan = document.getElementById('valor-emprestimo')
  textInputLoan.addEventListener('input', function (event) {
    if ((event.target.value).indexOf('-') > -1) {
      textInputLoan.value = (event.target.value).replace('-', '')
    }
  })
  textInputLoan.addEventListener('blur', function (event) {
    inputBlur(textInputLoan, document.getElementById('valor-emprestimo-range'), event.target.value)
  })
}

export function handleChangeLoanAmount (
  loanAmountRangeElement,
  loanAmountElement
) {
  loanAmountRangeElement.addEventListener('change', function (event) {
    updateCard()
    const newValue = utils.currencyFormatter(Number(event.target.value))
    loanAmountElement.value = newValue
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
