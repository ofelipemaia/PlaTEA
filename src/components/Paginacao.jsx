export default function Paginacao({ paginaAtual, totalPaginas, onMudar }) {
  if (totalPaginas <= 1) return null

  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1)

  return (
    <nav className="pagination" aria-label="Paginação dos resultados">
      <small>Página {paginaAtual} de {totalPaginas}</small>

      <button
        className="page-number"
        type="button"
        disabled={paginaAtual === 1}
        onClick={() => onMudar(paginaAtual - 1)}
      >
        Anterior
      </button>

      {paginas.map((n) =>
        n === paginaAtual ? (
          <span key={n} className="page-number" aria-current="page">{n}</span>
        ) : (
          <button key={n} className="page-number" type="button" onClick={() => onMudar(n)}>
            {n}
          </button>
        )
      )}

      <button
        className="page-number"
        type="button"
        disabled={paginaAtual === totalPaginas}
        onClick={() => onMudar(paginaAtual + 1)}
      >
        Próxima
      </button>
    </nav>
  )
}