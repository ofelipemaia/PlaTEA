import { useNavigate } from 'react-router'

const conteudosApoio = [
  {
    id: 1,
    ano: 2023,
    titulo: 'Narrativa e Identidade em “The Last of Us”',
    descricao:
      'Uma análise da construção de personagens e do impacto emocional na série The Last of Us, explorando temas de perda e resiliência.',
  },
  {
    id: 2,
    ano: 2022,
    titulo: 'Mechanics as Metaphor: O Design de “Papers, Please”',
    descricao:
      'Investigação sobre como os mecanismos de jogo em Papers, Please servem como metáfora para a burocracia e o controle social.',
  },
  {
    id: 3,
    ano: 2024,
    titulo: 'A Evolução do Gênero Roguelike: De “Rogue” a “Hades”',
    descricao:
      'Um estudo histórico sobre a evolução dos jogos roguelike, desde os primórdios em ASCII até as produções contemporâneas.',
  },
]

export default function Home() {
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const dados = new FormData(e.currentTarget)
    navigate({
      pathname: '/resultados',
      search: `?${new URLSearchParams(dados)}`,
    })
  }

  return (
    <>
      <section className="hero" aria-labelledby="titulo">
        <h1 id="titulo">
          Plataforma de Jogos Educacionais
          <br />
          para Estudantes Autistas
        </h1>

        <p className="hero-description">
          Encontre jogos educacionais adequados a estudantes com TEA
          considerando as diferentes necessidades e especificidades de cada
          estudante. Consulte informações sobre cada jogo, e escolha o que
          melhor atende às necessidades do estudante.
        </p>

        <div className="search-help">
          <p>
            <strong>
              Escolha uma categoria. Depois, digite uma palavra-chave
              relacionada a ela. Por fim, clique em “Pesquisar”.
            </strong>
          </p>
          <small>Exemplo: Área do conhecimento — Matemática.</small>
        </div>

        <form className="search-form" onSubmit={handleSubmit} role="search">
          <div className="field">
            <label htmlFor="categoria">Categoria</label>
            <select id="categoria" name="categoria">
              <option value="assunto">Assunto</option>
              <option value="area">Área do conhecimento</option>
              <option value="habilidade">Habilidade</option>
              <option value="idade">Faixa etária</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="termo">Termo</label>
            <input
              id="termo"
              name="q"
              type="search"
              placeholder="Digite o termo da pesquisa..."
            />
          </div>

          <button className="button" type="submit">Pesquisar</button>
        </form>
      </section>

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
    </>
  )
}