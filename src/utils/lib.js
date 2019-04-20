const IOF = 6.38
const fee = 2.35

const maxLoan = (guaranteeValue) => {
  return guaranteeValue * 0.8
}

const realLoanValue = (loanValue, guaranteeValue) => {
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

export const installmentValue = (installments) => totalAmount / installments

export const formatter = (number) => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
}).format(number)
