import { useState } from 'react'

const LIMITE_INICIAL = 5

function GrupoFiltro({ grupo, selecionados, onAlternar }) {
  const [expandido, setExpandido] = useState(false)
  const { param, titulo, opcoes } = grupo

  // Recolhido, mostra as 5 primeiras opções e qualquer opção já marcada.
  const visiveis = expandido
    ? opcoes
    : opcoes.filter((opcao, i) => i < LIMITE_INICIAL || selecionados.includes(opcao))

  return (
    <fieldset>
      <legend>{titulo}</legend>

      {visiveis.map((opcao) => (
        <label key={opcao} className="check">
          <input
            type="checkbox"
            checked={selecionados.includes(opcao)}
            onChange={() => onAlternar(param, opcao)}
          />
          {opcao}
        </label>
      ))}

      {opcoes.length > LIMITE_INICIAL && (
        <button
          className="text-button"
          type="button"
          aria-expanded={expandido}
          onClick={() => setExpandido(!expandido)}
        >
          {expandido ? 'Ver menos' : 'Ver mais'}
        </button>
      )}
    </fieldset>
  )
}

export default function FiltrosJogos({ grupos, selecionados, onAlternar, onLimpar }) {
  return (
    <aside id="filtros" className="filters" aria-labelledby="titulo-filtros">
      <div className="filters-heading">
        <h2 id="titulo-filtros">Filtros</h2>
        <button className="text-button" type="button" onClick={onLimpar}>
          Limpar
        </button>
      </div>

      {grupos
        .filter((grupo) => grupo.opcoes.length > 0)
        .map((grupo) => (
          <GrupoFiltro
            key={grupo.param}
            grupo={grupo}
            selecionados={selecionados[grupo.param]}
            onAlternar={onAlternar}
          />
        ))}

      <p className="muted">Combine filtros para refinar sua pesquisa.</p>
    </aside>
  )
}