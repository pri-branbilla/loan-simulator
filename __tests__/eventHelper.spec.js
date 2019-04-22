import {
  changeInputElement,
  getFormValues,
  toStringFormValues,
  updateMaxValue
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
              <input type="range" required name="valor-garantia-range" id="valor-garantia-range" min=3750 max=9000000 value=123455 step="100" />
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
            <input type="text" required name="valor-emprestimo" id="valor-emprestimo" value="R$ 90.455,00" />
          </div>
          <div class="field">
            <div class="range">
              <input type="range" required name="valor-emprestimo-range" id="valor-emprestimo-range" min=3000 max=100000 value=90455 step="100" />
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

  describe('Method: changeInputElement', () => {
    it('should change the text and range inputs', () => {
      const input = document.getElementById('valor-emprestimo')
      const range = document.getElementById('valor-emprestimo-range')
      changeInputElement(input, range, 30000, 4500000)
      expect(input.value).toBe('R$2,812,500.00')
      expect(range.value).toBe('2812500')
    })
  })

  describe('Method: toStringFormValues', () => {
    it('should return a message with form values', () => {
      const form = document.querySelector('.form')
      expect(toStringFormValues(getFormValues(form))).toBe(confirm)
    })
  })

  describe('Method: updateMaxValue', () => {
    it('should update max value of a range', () => {
      const range = document.getElementById('valor-emprestimo-range')
      updateMaxValue(6000000, range)
      expect(range.getAttribute('max')).toBe('6000000')
    })
  })
})
