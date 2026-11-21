// Cada grupo liga um parâmetro da URL a um campo do JSON.
// ordemPreferida define a ordem das opções; o que não estiver na lista vai ao final, em ordem alfabética.
export const GRUPOS_FILTRO = [
  {
    param: 'area',
    campo: 'areaConhecimento',
    titulo: 'Área do conhecimento',
  },
  {
    param: 'idade',
    campo: 'faixasEtarias',
    titulo: 'Faixa etária',
    ordemPreferida: ['Crianças', 'Adolescentes', 'Jovens', 'Geral'],
  },
  {
    param: 'nivel',
    campo: 'nivelEducacional',
    titulo: 'Nível educacional',
    ordemPreferida: [
      'Educação Infantil',
      'Anos iniciais do Ensino Fundamental',
      'Ensino Fundamental',
      'Ensino Médio',
      'Educação de Jovens e Adultos (EJA)',
    ],
  },
  {
    param: 'fundamentacao',
    campo: 'fundamentacaoPedagogica',
    titulo: 'Fundamentação pedagógica',
  },
]

// Campos pesquisados no texto, conforme a categoria escolhida na página inicial.
const CAMPOS_BUSCA = {
  assunto: ['titulo', 'descricao', 'conteudos'],
  area: ['areaConhecimento'],
  habilidade: ['habilidades'],
  idade: ['faixasEtarias', 'idade', 'nivelEducacional'],
}

const CAMPOS_BUSCA_PADRAO = [
  'titulo',
  'descricao',
  'autores',
  'areaConhecimento',
  'conteudos',
  'habilidades',
  'faixasEtarias',
  'idade',
  'nivelEducacional',
  'fundamentacaoPedagogica',
]

// Valores padrão da limpeza de dados: não viram filtro, badge nem resultado de busca.
const VALORES_PADRAO = ['nao informado', 'nao se aplica', 'nao fornecido']

// "Matemática" e "matematica" passam a ser comparáveis.
export function normalizar(texto) {
  return String(texto)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function ehValorPadrao(valor) {
  const v = normalizar(valor)
  return VALORES_PADRAO.some((padrao) => v.startsWith(padrao))
}

function valoresDoCampo(jogo, campo) {
  const valor = jogo[campo]
  if (valor == null) return []
  return Array.isArray(valor) ? valor : [valor]
}

export function listarOpcoes(jogos, { campo, ordemPreferida = [] }) {
  const unicos = [
    ...new Set(jogos.flatMap((jogo) => valoresDoCampo(jogo, campo))),
  ].filter((valor) => !ehValorPadrao(valor))

  const posicao = (valor) => {
    const i = ordemPreferida.indexOf(valor)
    return i === -1 ? Infinity : i
  }

  return unicos.sort((a, b) => {
    const pa = posicao(a)
    const pb = posicao(b)
    if (pa !== pb) return pa - pb
    return a.localeCompare(b, 'pt-BR')
  })
}

// Quebra o texto em palavras sem acento nem pontuação.
function palavras(texto) {
  return normalizar(texto)
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
}

// Cada palavra digitada precisa ser o começo de alguma palavra do texto:
// "matem" acha "Matemática", e "5" não acha "15".
function correspondeBusca(jogo, q, categoria) {
  const termos = palavras(q)
  if (termos.length === 0) return true

  const campos = CAMPOS_BUSCA[categoria] ?? CAMPOS_BUSCA_PADRAO
  const texto =
    ' ' +
    palavras(
      campos
        .flatMap((campo) => valoresDoCampo(jogo, campo))
        .filter((valor) => !ehValorPadrao(valor))
        .join(' ')
    ).join(' ')

  return termos.every((termo) => texto.includes(' ' + termo))
}

// Dentro de um grupo vale "qualquer um dos marcados" (OU);
// entre grupos diferentes vale "todos" (E).
function correspondeFiltros(jogo, selecionados) {
  return GRUPOS_FILTRO.every(({ param, campo }) => {
    const escolhidos = selecionados[param] ?? []
    if (escolhidos.length === 0) return true
    const valores = valoresDoCampo(jogo, campo)
    return escolhidos.some((escolhido) => valores.includes(escolhido))
  })
}

export function filtrarJogos(jogos, { q, categoria, selecionados }) {
  return jogos.filter(
    (jogo) =>
      correspondeBusca(jogo, q, categoria) &&
      correspondeFiltros(jogo, selecionados)
  )
}

export function ordenarJogos(lista, ordem) {
  const copia = [...lista]
  if (ordem === 'recentes') copia.sort((a, b) => b.ano - a.ano)
  if (ordem === 'nome') {
    copia.sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'))
  }
  return copia
}
