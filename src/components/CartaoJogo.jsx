import { Link } from 'react-router'
import { ehValorPadrao } from '../utils/filtros'

const MAX_CONTEUDOS = 3

function Badges({ itens, cor }) {
  return itens.map((item) => (
    <span key={item} className={`badge badge-${cor}`}>
      {item}
    </span>
  ))
}

export default function CartaoJogo({ jogo }) {
  const areas = jogo.areaConhecimento.filter((v) => !ehValorPadrao(v))

  const conteudos = jogo.conteudos.filter((v) => !ehValorPadrao(v))
  const conteudosVisiveis = conteudos.slice(0, MAX_CONTEUDOS)
  const conteudosOcultos = conteudos.slice(MAX_CONTEUDOS)

  const faixas = jogo.faixasEtarias.filter((v) => !ehValorPadrao(v))
  if (!ehValorPadrao(jogo.idade)) faixas.push(jogo.idade)

  const niveis = jogo.nivelEducacional.filter((v) => !ehValorPadrao(v))

  return (
    <article className="result-card">
      <time className="result-year" dateTime={String(jogo.ano)}>
        {jogo.ano}
      </time>

      <div className="tags">
        <Badges itens={areas} cor="blue" />
        <Badges itens={conteudosVisiveis} cor="green" />
        {conteudosOcultos.length > 0 && (
          <span className="badge" title={conteudosOcultos.join(', ')}>
            +{conteudosOcultos.length}
          </span>
        )}
        <Badges itens={faixas} cor="purple" />
      </div>

      <h3>{jogo.titulo}</h3>
      <p className="result-author">{jogo.autores.join('; ')}</p>
      <p className="result-description">{jogo.descricao}</p>

      <div className="result-footer">
        <Link to={`/jogo/${jogo.id}`} aria-label={`Ver jogo ${jogo.titulo}`}>
          Ver jogo →
        </Link>
        {niveis.length > 0 && <small>{niveis.join(' · ')}</small>}
      </div>
    </article>
  )
}