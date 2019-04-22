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
  Send,
  Submit
} from '../src/index'

import {
  getFormValues
} from '../src/lib/eventsHelper'

function initializeAppMock () {
  document.body.innerHTML = `
    <form class="form" name="form">
      <div class="form__fields">
        <div class="field-group">
          <div class="field">
            <label for="parcelas">Número de parcelas</label>
            <select name="parcelas" id="parcelas" required>
              <option value="24">24</option>
              <option value="36">36</option>
              <option value="48">48</option>
            </select>
          </div>
          <div class="field">
            <label for="garantia">Garantia</label>
            <select name="garantia" id="garantia" required>
              <option value="vehicle">Veículo</option>
              <option value="realty">Imóvel</option>
            </select>
          </div>
        </div>
        <div class="valor-garantia">
          <div class="field-group">
            <div class="field">
              <label for="valor-garantia">Valor da Garantia</label>
              <input type="text" required name="valor-garantia" id="valor-garantia" value="R$ 123.455,00" />
            </div>
            <div class="field">
              <div class="range">
                <input type="range" name="valor-garantia-range" id="valor-garantia-range" min=3750 max=9000000 value=123455 step="100">
                <div class="range__values">
                  <span>R$ 3.750,00</span>
                  <span>R$ 9.000.000,00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="emprestimo">
          <div class="field-group">
            <div class="field">
              <label for="valor-emprestimo">Valor do Empréstimo</label>
              <input type="text" required name="valor-emprestimo" id="valor-emprestimo" value="R$ 90.455,00">
            </div>
            <div class="field">
              <div class="range">
                <input type="range" name="valor-emprestimo-range" id="valor-emprestimo-range" min=3000 max=100000 value=90455 step="100">
                <div class="range__values" id="loan-range">
                  <span>R$ 3.000,00</span>
                  <span>R$ 100.000,00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form__result">
        <div class="quota__container">
          <h4>Valor da Parcela</h4>
          <div class="quota">
            <strong>R$</strong>
            <span>465,00</span>
          </div>
        </div>
        <div class="amount_container">
          <h4>Total a pagar</h4>
          <p>R$ 11.112,00</p>
        </div>
        <div class="tax__container">
          <h4>Taxa de juros (mês)</h4>
          <p>111,12%</p>
        </div>
        <button class="button">
          Solicitar
        </button>
      </div>
    </form>
  `
}

function clean () {
  document.body.innerHTML = ''
}

describe('Creditas Challenge', () => {
  const confirm = `Confirmação
Campo: parcelas, Valor: 24
Campo: garantia, Valor: vehicle
Campo: valor-garantia, Valor: R$ 123.455,00
Campo: valor-garantia-range, Valor: 123455
Campo: valor-emprestimo, Valor: R$ 90.455,00
Campo: valor-emprestimo-range, Valor: 90455
Total R$100,513.60`
  beforeEach(() => {
    initializeAppMock()
  })

  afterEach(() => {
    clean()
  })

  describe('Method: getFormValues', () => {
    it('should get all the form values', () => {
      const form = document.querySelector('.form')
      expect(getFormValues(form)).toEqual([
        { 'field': 'parcelas', 'value': '24' },
        { 'field': 'garantia', 'value': 'vehicle' },
        { 'field': 'valor-garantia', 'value': 'R$ 123.455,00' },
        { 'field': 'valor-garantia-range', 'value': '123455' },
        { 'field': 'valor-emprestimo', 'value': 'R$ 90.455,00' },
        { 'field': 'valor-emprestimo-range', 'value': '90455' }
      ])
    })
  })

  describe('Method: Send', () => {
    it('should return the result', () => {
      const form = document.querySelector('.form')
      Send(getFormValues(form))
        .then((result) => expect(result).toBe(confirm))
    })
  })

  describe('Method: Submit', () => {
    it('should add event listener to submit data form', () => {
      const container = document.querySelector('.form')
      Submit(container)
    })
  })
})
