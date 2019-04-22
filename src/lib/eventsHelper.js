import * as utils from './utils'

export const changeInstallmentValue = (totalAmountElement, quotaElement, installmentsElement, loanAmountElement, taxElement) => {
  const installmentValue = utils.calcAmount(installmentsElement, loanAmountElement) / installmentsElement.value
  const finalValue = utils.calcAmount(installmentsElement, loanAmountElement)
  taxElement.innerHTML = `${utils.replaceDot(utils.monthlyFee(installmentValue, utils.unformatter(loanAmountElement.value), installmentsElement.value))} %`
  quotaElement.innerHTML = utils.formatValue(installmentValue)
  totalAmountElement.innerHTML = utils.currencyFormatter(finalValue)
}
