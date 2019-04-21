const IOF = 6.38
const fee = 2.35

const maxLoan = (guaranteeValue) => {
  return guaranteeValue * 0.8
}

export const realLoanValue = (loanValue, guaranteeValue) => {
  if (loanValue <= maxLoan(guaranteeValue)) {
    return loanValue
  }
  return maxLoan(guaranteeValue)
}

export const totalAmount = (
  loanValue,
  installments,
  guaranteeValue
  ) => ((IOF / 100) + (fee / 100) + (installments / 1000) + 1) * realLoanValue(loanValue, guaranteeValue)

export const installmentValue = (amount, installments) => Math.floor(100*amount/installments) / 100

export const monthlyFee = (installmentValue, loanValue, installments) => Math.floor(installmentValue * 1000 / (loanValue / installments)) / 1000

export const formatter = (number) => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimunFractionDigits: 2
}).format(number)

export const formatValue = (value) => String(value).replace(".",",")
