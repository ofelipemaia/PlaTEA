import { useState } from 'react'
import { useNavigate } from 'react-router'
import ConteudosApoio from '../components/ConteudosApoio'

// O exemplo mostrado no campo muda conforme a categoria escolhida.
const CATEGORIAS = [
  {
    valor: 'assunto',
    rotulo: 'Assunto',
    exemplo: 'Ex.: Alfabetização, Emoções, Higiene',
  },
  {
    valor: 'area',
    rotulo: 'Área do conhecimento',
    exemplo: 'Ex.: Matemática, Língua Portuguesa',
  },
  {
    valor: 'habilidade',
    rotulo: 'Habilidade',
    exemplo: 'Ex.: Atenção, Raciocínio lógico',
  },
  {
    valor: 'idade',
    rotulo: 'Faixa etária',
    exemplo: 'Ex.: Crianças, Jovens etc.',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const [categoria, setCategoria] = useState(CATEGORIAS[0].valor)

  const { exemplo } = CATEGORIAS.find((c) => c.valor === categoria)

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
            
              Selecione uma opção no campo <strong>Categoria</strong>. 
              Em seguida, digite uma palavra-chave relacionada no campo<strong> Termo</strong> e clique em <strong>Pesquisar</strong>.
  
          </p>
          <small>Exemplo: Área do conhecimento - Matemática.</small>
        </div>

        <form className="search-form" onSubmit={handleSubmit} role="search">
          <div className="field">
            <label htmlFor="categoria">Categoria</label>
            <select
              id="categoria"
              name="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              {CATEGORIAS.map(({ valor, rotulo }) => (
                <option key={valor} value={valor}>
                  {rotulo}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="termo">Termo</label>
            <input
              id="termo"
              name="q"
              type="search"
              placeholder={exemplo}
              autoComplete="off"
            />
          </div>

          <button className="button" type="submit">Pesquisar</button>
        </form>
      </section>

      <ConteudosApoio />
    </>
  )
}