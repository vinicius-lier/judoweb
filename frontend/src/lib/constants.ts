export const FAIXAS = {
  BRANCA: {
    nome: 'Branca',
    valor: 'branca',
    ordem: 1
  },
  P_CINZA: {
    nome: 'Ponta Cinza',
    valor: 'p_cinza',
    ordem: 2
  },
  CINZA: {
    nome: 'Cinza',
    valor: 'cinza',
    ordem: 3
  },
  P_AZUL: {
    nome: 'Ponta Azul',
    valor: 'p_azul',
    ordem: 4
  },
  AZUL: {
    nome: 'Azul',
    valor: 'azul',
    ordem: 5
  },
  P_AMARELA: {
    nome: 'Ponta Amarela',
    valor: 'p_amarela',
    ordem: 6
  },
  AMARELA: {
    nome: 'Amarela',
    valor: 'amarela',
    ordem: 7
  },
  P_LARANJA: {
    nome: 'Ponta Laranja',
    valor: 'p_laranja',
    ordem: 8
  },
  LARANJA: {
    nome: 'Laranja',
    valor: 'laranja',
    ordem: 9
  },
  VERDE: {
    nome: 'Verde',
    valor: 'verde',
    ordem: 10
  },
  ROXA: {
    nome: 'Roxa',
    valor: 'roxa',
    ordem: 11
  },
  MARROM: {
    nome: 'Marrom',
    valor: 'marrom',
    ordem: 12
  }
} as const

export const FAIXAS_LIST = Object.values(FAIXAS).sort((a, b) => a.ordem - b.ordem)

export const FAIXAS_OPTIONS = FAIXAS_LIST.map(faixa => ({
  value: faixa.valor,
  label: faixa.nome
})) 