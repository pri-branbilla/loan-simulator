export const guaranteeOptions = {
  vehicle: {
    minLoan: 3000,
    maxLoan: 100000,
    installments: [
      {
        value: 24,
        label: "24"
      },
      {
        value: 36,
        label: "36"
      },
      {
        value: 48,
        label: "48"
      },

    ]
  },
  realty: {
    minLoan: 30000,
    maxLoan: 4500000,
    installments: [
      {
        value: 120,
        label: "120"
      },
      {
        value: 180,
        label: "180"
      },
      {
        value: 240,
        label: "240"
      },

    ]
  }
}

export const selectGuarantee = [
  {
    value: "vehicle",
    label: "Veículo"
  },
  {
    value: "realty",
    label: "Imóvel"
  }
]
