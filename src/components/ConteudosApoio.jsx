import conteudosApoio from '../data/conteudosApoio'

export default function ConteudosApoio() {
  return (
    <section id="apoio" className="section" aria-labelledby="titulo-apoio">
      <div className="section-heading">
        <h2 id="titulo-apoio">Conteúdos de apoio em destaque</h2>
        <button
          className="text-button"
          type="button"
          disabled
          title="Destino não fornecido no design"
        >
          Ver todos
        </button>
      </div>

      <div className="card-grid">
        {conteudosApoio.map((item) => (
          <article key={item.id} className="card support-card">
            <div className="card-meta">
              <span className="badge">Artigo</span>
              <time dateTime={String(item.ano)}>{item.ano}</time>
            </div>
            <h3>{item.titulo}</h3>
            <p>{item.descricao}</p>
            <button
              className="text-button"
              type="button"
              disabled
              title="URL do artigo não fornecida"
            >
              Abrir
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
