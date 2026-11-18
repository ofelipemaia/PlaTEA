import { Link, useSearchParams } from 'react-router'
import jogos from '../data/jogos_educativos.json'
import FiltrosJogos from '../components/FiltrosJogos'
import CartaoJogo from '../components/CartaoJogo'
import Paginacao from '../components/Paginacao'
import {
  GRUPOS_FILTRO,
  listarOpcoes,
  filtrarJogos,
  ordenarJogos,
} from '../utils/filtros'

const POR_PAGINA = 5

// As opções dos filtros saem do próprio JSON (os dados são fixos).
const GRUPOS = GRUPOS_FILTRO.map((grupo) => ({
  ...grupo,
  opcoes: listarOpcoes(jogos, grupo),
}))

export default function Resultados() {
  const [params, setParams] = useSearchParams()

  const q = params.get('q') ?? ''
  const categoria = params.get('categoria') ?? ''
  const ordemParam = params.get('ordem')
  const ordem = ['recentes', 'nome'].includes(ordemParam) ? ordemParam : 'relevancia'
  const paginaPedida = Math.max(1, Number(params.get('pagina')) || 1)

  const selecionados = Object.fromEntries(
    GRUPOS_FILTRO.map(({ param }) => [param, params.getAll(param)])
  )

  const filtrados = ordenarJogos(
    filtrarJogos(jogos, { q, categoria, selecionados }),
    ordem
  )

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA))
  const paginaAtual = Math.min(paginaPedida, totalPaginas)
  const inicio = (paginaAtual - 1) * POR_PAGINA
  const visiveis = filtrados.slice(inicio, inicio + POR_PAGINA)

  const filtrosAtivos = GRUPOS_FILTRO.flatMap(({ param }) =>
    selecionados[param].map((valor) => ({ param, valor }))
  )

  // Copia os parâmetros atuais, aplica a mudança e grava na URL.
  function atualizar(mudar) {
    const proximo = new URLSearchParams(params)
    mudar(proximo)
    setParams(proximo)
  }

  function buscar(e) {
    e.preventDefault()
    const termo = new FormData(e.currentTarget).get('q').trim()
    atualizar((p) => {
      if (termo) p.set('q', termo)
      else p.delete('q')
      p.delete('categoria') // a busca desta página procura em todos os campos
      p.delete('pagina')
    })
  }

  function alternarFiltro(param, valor) {
    atualizar((p) => {
      const atuais = p.getAll(param)
      const novos = atuais.includes(valor)
        ? atuais.filter((v) => v !== valor)
        : [...atuais, valor]
      p.delete(param)
      novos.forEach((v) => p.append(param, v))
      p.delete('pagina')
    })
  }

  function limparFiltros() {
    atualizar((p) => {
      GRUPOS_FILTRO.forEach(({ param }) => p.delete(param))
      p.delete('pagina')
    })
  }

  function mudarOrdem(e) {
    const valor = e.target.value
    atualizar((p) => {
      if (valor === 'relevancia') p.delete('ordem')
      else p.set('ordem', valor)
      p.delete('pagina')
    })
  }

  function irParaPagina(n) {
    atualizar((p) => {
      if (n === 1) p.delete('pagina')
      else p.set('pagina', String(n))
    })
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      <nav className="breadcrumb" aria-label="Caminho de navegação">
        <Link to="/">Início</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">Pesquisa</span>
      </nav>

      <h1 className="page-title">Resultados da pesquisa</h1>
      <p>
        Consulte as informações de cada jogo. Clique no jogo para abrir a
        prévia. Depois, veja as informações completas ou feche a janela para
        ver outro jogo.
      </p>

      <div className="search-bar">
        <form onSubmit={buscar} role="search">
          <input
            key={q}
            type="search"
            name="q"
            defaultValue={q}
            aria-label="Termo da pesquisa"
          />
          <button className="button" type="submit">Pesquisar</button>
        </form>
        <a href="#filtros">Pesquisa avançada</a>
      </div>

      <div className="results-layout">
        <FiltrosJogos
          grupos={GRUPOS}
          selecionados={selecionados}
          onAlternar={alternarFiltro}
          onLimpar={limparFiltros}
        />

        <section aria-labelledby="titulo-resultados">
          <div className="results-toolbar">
            <div>
              <h2 id="titulo-resultados">
                {filtrados.length} {filtrados.length === 1 ? 'resultado' : 'resultados'}
                {q && <> para “{q}”</>}
              </h2>
              <p aria-live="polite">
                {filtrados.length > 0 &&
                  `Exibindo ${inicio + 1}–${inicio + visiveis.length} de ${filtrados.length} registros`}
              </p>
            </div>

            <div className="sort">
              <label htmlFor="ordenacao">Ordenar por</label>
              <select id="ordenacao" value={ordem} onChange={mudarOrdem}>
                <option value="relevancia">Relevância</option>
                <option value="recentes">Mais recentes</option>
                <option value="nome">Nome do jogo</option>
              </select>
            </div>
          </div>

          {(q || filtrosAtivos.length > 0) && (
            <div className="active-filters">
              <span>Filtros ativos:</span>
              {q && <span className="badge badge-blue">“{q}”</span>}
              {filtrosAtivos.map(({ param, valor }) => (
                <span key={`${param}-${valor}`} className="badge badge-blue">
                  {valor}
                </span>
              ))}
              <Link to="/resultados">Limpar todos</Link>
            </div>
          )}

          {visiveis.length > 0 ? (
            <div className="result-list">
              {visiveis.map((jogo) => (
                <CartaoJogo key={jogo.id} jogo={jogo} />
              ))}
            </div>
          ) : (
            <p>
              Nenhum jogo encontrado com esses critérios. Tente remover algum
              filtro ou usar outro termo.
            </p>
          )}

          <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onMudar={irParaPagina}
          />
        </section>
      </div>
    </>
  )
}