/* <!--
  =========================================================
  Que tal aumentar o coverage para que ele comece a passar
  nos critérios do desafio?

  Objetivo: Alcançar 80% de cobertura, mas não se preocupe
  se não chegar a alcançar a objetivo, faça o quanto você
  acha que é necessário para garantir segurança quando um
  outro amigo for mexer no mesmo código que você :)

  Confira nossas taxas de coberturas atuais :(

  ----------|----------|----------|----------|----------|-------------------|
  File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
  ----------|----------|----------|----------|----------|-------------------|
  All files |    15.79 |        0 |     9.52 |    14.29 |                   |
  index.js  |    15.79 |        0 |     9.52 |    14.29 |... 72,76,78,83,91 |
  ----------|----------|----------|----------|----------|-------------------|
  Jest: Uncovered count for statements (32)exceeds global threshold (10)
  Jest: "global" coverage threshold for branches (80%) not met: 0%
  Jest: "global" coverage threshold for lines (80%) not met: 14.29%
  Jest: "global" coverage threshold for functions (80%) not met: 9.52%
--> */

import {
  monthlyFee,
  currencyFormatter,
  formatValue,
  unformatter,
  calcAmount,
  maxLoan,
  renderOptions,
  selectedWarranty,
  checkFormValidity
} from '../src/lib/utils.js'

function initializeAppMock () {
  document.body.innerHTML = `
    <form class="form" data-testid="form">
    <div class="field">
      <label for="parcelas">Número de parcelas</label>
      <select name="parcelas" id="parcelas" required>
        <option value="24">24</option>
        <option value="36">36</option>
        <option value="48">48</option>
      </select>
    </div>
      <label for="valor-garantia">Valor da Garantia</label>
      <input id="valor-garantia" required value='R$ 123.455,00'/>
      <label for="valor-emprestimo">Valor da Garantia</label>
      <input id="valor-emprestimo" required value='R$ 123.455,00'/>
      <button type="button"></button>
    </form>
  `
}

function clean () {
  document.body.innerHTML = ''
}

describe('Creditas Challenge', () => {
  beforeEach(() => {
    initializeAppMock()
  })

  afterEach(() => {
    clean()
  })

  describe('Method: checkFormValidity', () => {
    it('should return true when form is valid', () => {
      const form = document.querySelector('.form')
      expect(checkFormValidity(form)).toBeTruthy()
    })

    it('should return false when form is not valid', () => {
      const form = document.querySelector('.form')
      const input = document.querySelector('input')
      input.value = ''
      expect(checkFormValidity(form)).toBeFalsy()
    })
  })

  describe('Method: currencyFormatter', () => {
    it('should return a formatted value to BRL', () => {
      const value = 12345.45
      expect(currencyFormatter(value)).toBe('R$12,345.45')
    })
  })

  describe('Method: formatValue', () => {
    it('should return a formatted value xxxx,xx', () => {
      const value = 12345.453424
      expect(formatValue(value)).toBe('12345,45')
    })
  })

  describe('Method: unformatter', () => {
    it('should unformat BRL value to number', () => {
      const value = 'R$ 12345,56'
      expect(unformatter(value)).toBe(12345.56)
    })
  })

  describe('Method: calcAmount', () => {
    it('should return the total amount of payment', () => {
      const loanElement = document.getElementById('valor-emprestimo')
      const installmentsElement = document.getElementById('parcelas')
      expect(calcAmount(installmentsElement, loanElement)).toBe(137183.196)
    })
  })

  describe('Method: monthlyFee', () => {
    it('should return the loan monthly fee', () => {
      const installmentValue = 53455.125
      const loanValue = 1234563
      const installments = 24
      expect(monthlyFee(installmentValue, loanValue, installments)).toBe(1.039)
    })
  })

  describe('Method: maxLoan', () => {
    it('should add event listener to submit data form', () => {
      expect(maxLoan(100)).toBe(80)
    })
  })

  describe('Method: renderOptions', () => {
    it('should render the new options', () => {
      const installmentsElement = document.getElementById('parcelas')
      const instOptions = [120, 180, 240]
      renderOptions(installmentsElement, instOptions)
      expect(installmentsElement[0].value).toBe('120')
      expect(installmentsElement[1].value).toBe('180')
      expect(installmentsElement[2].value).toBe('240')
    })
  })

  describe('Method: selectedWarranty', () => {
    it('should return the warranty selected', () => {
      const warranty = selectedWarranty('vehicle')
      expect(warranty.maxLoan).toBe(100000)
      expect(warranty.minLoan).toBe(3000)
      expect(warranty.installments).toEqual([24, 36, 48])
    })
  })
})
