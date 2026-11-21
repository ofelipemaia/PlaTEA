import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import jogos from '../data/jogos_educativos.json'
import ConteudosApoio from '../components/ConteudosApoio'
import { IconeLinkExterno, IconeSeta } from '../components/Icones'
import { ehValorPadrao } from '../utils/filtros'

const SECOES = [
  { id: 'caracteristicas', titulo: 'Características educacionais' },
  { id: 'fundamentacao', titulo: 'Fundamentação pedagógica' },
  { id: 'publico', titulo: 'Perfil do público-alvo' },
  { id: 'acessibilidade', titulo: 'Interação e acessibilidade' },
  { id: 'evidencias', titulo: 'Evidências científicas' },
  { id: 'galeria', titulo: 'Imagens do Jogo' },
]

// ---------- Funções auxiliares ----------

const semPadrao = (lista) => lista.filter((valor) => !ehValorPadrao(valor))

function listaOuNaoInformado(lista) {
  const valores = semPadrao(lista)
  return valores.length > 0 ? valores.join(', ') : 'Não informado'
}

const temLink = (valor) => /^https?:\/\//.test(valor)

function formatarSuporte(valor) {
  if (ehValorPadrao(valor)) return 'Não informado'
  if (/^\d+$/.test(valor)) return `Nível ${valor}`
  if (/^\d+( e \d+)+$/.test(valor)) return `Níveis ${valor}`
  return valor
}

// Marca no menu lateral a seção que está na tela.
function useSecaoAtiva(chave) {
  const [ativa, setAtiva] = useState(chave.split('|')[0])

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.find((e) => e.isIntersecting)
        if (visivel) setAtiva(visivel.target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )

    chave.split('|').forEach((id) => {
      const elemento = document.getElementById(id)
      if (elemento) observador.observe(elemento)
    })

    return () => observador.disconnect()
  }, [chave])

  return [ativa, setAtiva]
}

// ---------- Pedaços da página ----------

function Secao({ id, titulo, children }) {
  return (
    <section id={id} className="detail-section">
      <h2 className="section-title">{titulo}</h2>
      {children}
    </section>
  )
}

function Etiquetas({ itens, cor, classe = 'tag-list' }) {
  const valores = semPadrao(itens)
  if (valores.length === 0) return <p className="muted-text">Não informado</p>

  return (
    <div className={classe}>
      {valores.map((valor) => (
        <span key={valor} className={`tag ${cor}`}>{valor}</span>
      ))}
    </div>
  )
}

function Lista({ itens }) {
  return (
    <ul className="bullet-list">
      {itens.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function JogoNaoEncontrado({ id }) {
  return (
    <div className="pagina-jogo">
      <h1>Jogo não encontrado</h1>
      <p>Não encontramos nenhum jogo com o código “{id}”.</p>
      <Link to="/resultados">Voltar para a pesquisa</Link>
    </div>
  )
}

// ---------- Página ----------

function DetalhesJogo({ jogo }) {
  const galeria = jogo.galeria ?? []
  const secoes = SECOES.filter((s) => s.id !== 'galeria' || galeria.length > 0)
  const [ativa, setAtiva] = useSecaoAtiva(secoes.map((s) => s.id).join('|'))

  useEffect(() => {
    const tituloAnterior = document.title
    document.title = `${jogo.titulo} | PlaTEA+`
    return () => {
      document.title = tituloAnterior
    }
  }, [jogo.titulo])

  const faixas = semPadrao(jogo.faixasEtarias)
  const idadeConhecida = !ehValorPadrao(jogo.idade)
  const faixaEtaria =
    faixas.length > 0
      ? faixas.join(', ') + (idadeConhecida ? ` (${jogo.idade})` : '')
      : idadeConhecida
        ? jogo.idade
        : 'Não informado'

  const detalheIdade = idadeConhecida
    ? faixas.join(', ')
    : faixas.length > 0
      ? 'Idade não informada'
      : ''

  const totalRecursos = jogo.recursosAcessibilidade.length

  return (
    <div className="pagina-jogo">
      {/* APRESENTAÇÃO DO JOGO */}
      <section className="intro-section">
        <nav className="breadcrumbs" aria-label="Caminho de navegação">
          <span className="breadcrumb-step">
            <Link to="/">Início</Link>
            <IconeSeta />
          </span>
          <span className="breadcrumb-step">
            <Link to="/resultados">Pesquisa</Link>
            <IconeSeta />
          </span>
          <span aria-current="page">{jogo.titulo}</span>
        </nav>

        <div className="game-overview">
          {jogo.imagem ? (
            <img
              className="cover-image"
              src={jogo.imagem}
              alt={`Capa do jogo ${jogo.titulo}`}
            />
          ) : (
            <div className="cover-image cover-placeholder">
              Capa do jogo não disponível
            </div>
          )}

          <article className="game-card">
            <div className="game-header">
              <h1>{jogo.titulo}</h1>

              <div className="byline">
                <span className="year-badge">{jogo.ano}</span>
                <span>{jogo.autores.join('; ')}</span>
              </div>

              <p className="game-summary">{jogo.descricao}</p>
            </div>

            <dl className="game-facts">
              <div>
                <dt>Plataformas</dt>
                <dd>{listaOuNaoInformado(jogo.plataformas)}</dd>
              </div>
              <div>
                <dt>Faixa etária</dt>
                <dd>{faixaEtaria}</dd>
              </div>
              <div>
                <dt>Nível educacional</dt>
                <dd>{listaOuNaoInformado(jogo.nivelEducacional)}</dd>
              </div>
              <div>
                <dt>Recursos de acessibilidade</dt>
                <dd>
                  {totalRecursos}{' '}
                  {totalRecursos === 1 ? 'recurso descrito' : 'recursos descritos'}
                </dd>
              </div>
            </dl>

            <div className="access-block">
              <h2>Acesso ao Jogo</h2>

              <div className="action-row">
                {temLink(jogo.linkAcesso) ? (
                  <a
                    className="primary-action"
                    href={jogo.linkAcesso}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Acessar Jogo
                    <IconeLinkExterno />
                  </a>
                ) : (
                  <span className="primary-action is-disabled" aria-disabled="true">
                    Acesso indisponível
                  </span>
                )}

                {temLink(jogo.linkArtigo) && (
                  <a
                    className="secondary-action"
                    href={jogo.linkArtigo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ler artigo científico
                    <IconeLinkExterno />
                  </a>
                )}
              </div>

              {!temLink(jogo.linkAcesso) && (
                <p className="access-note">{jogo.linkAcesso}</p>
              )}
            </div>
          </article>
        </div>
      </section>

      {/* CONTEÚDO ACADÊMICO */}
      <div className="details-layout">
        <aside className="section-guide" aria-label="Navegação entre seções">
          <h2>Ir para</h2>

          <nav className="guide-links">
            {secoes.map(({ id, titulo }) => (
              <a
                key={id}
                href={`#${id}`}
                className={id === ativa ? 'selected' : undefined}
                aria-current={id === ativa ? 'location' : undefined}
                onClick={() => setAtiva(id)}
              >
                {titulo}
              </a>
            ))}
          </nav>
        </aside>

        <article className="academic-card">
          <Secao id="caracteristicas" titulo="Características educacionais">
            <div className="taxonomy-grid">
              <div>
                <h3>Área do conhecimento</h3>
                <Etiquetas itens={jogo.areaConhecimento} cor="blue" />
              </div>
              <div>
                <h3>Conteúdo ou assunto</h3>
                <Etiquetas itens={jogo.conteudos} cor="green" />
              </div>
            </div>

            <div className="text-group">
              <h3>Objetivos de aprendizagem</h3>
              <p className="body-text">{jogo.objetivosAprendizagem}</p>
            </div>

            <div className="text-group">
              <h3>Habilidades desenvolvidas</h3>
              <Lista itens={jogo.habilidades} />
            </div>

            <div className="text-group">
              <h3>Alinhamento à BNCC</h3>
              {jogo.alinhamentoBNCC ? (
                <>
                  <span className="tag green">Sim</span>
                  {!ehValorPadrao(jogo.alinhamentoDetalhe) && (
                    <p className="body-text">{jogo.alinhamentoDetalhe}</p>
                  )}
                </>
              ) : (
                <>
                  <span className="tag orange">Não</span>
                  <p className="warning-text">Alinhamento não documentado.</p>
                </>
              )}
            </div>
          </Secao>

          <Secao id="fundamentacao" titulo="Fundamentação pedagógica">
            <div className="text-group">
              <h3>Métodos e Abordagens</h3>
              <Etiquetas
                itens={jogo.fundamentacaoPedagogica}
                cor="neutral"
                classe="method-list"
              />
            </div>
          </Secao>

          <Secao id="publico" titulo="Perfil do público-alvo">
            <div className="audience-cards">
              <div className="audience-card highlighted">
                <h3>Faixa etária</h3>
                <strong>
                  {idadeConhecida ? jogo.idade : listaOuNaoInformado(jogo.faixasEtarias)}
                </strong>
                {detalheIdade && <p>{detalheIdade}</p>}
              </div>

              <div className="audience-card">
                <h3>Nível educacional</h3>
                <strong>{listaOuNaoInformado(jogo.nivelEducacional)}</strong>
              </div>

              <div className="audience-card">
                <h3>Nível de suporte</h3>
                <strong>{formatarSuporte(jogo.nivelSuporte)}</strong>
              </div>
            </div>
          </Secao>

          <Secao id="acessibilidade" titulo="Interação e acessibilidade">
            <div className="text-group">
              <h3>Mecânicas de jogo</h3>
              <Lista itens={jogo.mecanicas} />
            </div>

            <div className="text-group">
              <h3>Recursos de acessibilidade</h3>
              <Lista itens={jogo.recursosAcessibilidade} />
            </div>
          </Secao>

          <Secao id="evidencias" titulo="Evidências científicas">
            <Lista itens={jogo.evidenciasCientificas} />
          </Secao>

          {galeria.length > 0 && (
            <Secao id="galeria" titulo="Imagens do Jogo">
              <div className="game-gallery">
                {galeria.map((imagem) => (
                  <img key={imagem.src} src={imagem.src} alt={imagem.alt} />
                ))}
              </div>
            </Secao>
          )}
        </article>
      </div>

      <ConteudosApoio />
    </div>
  )
}

export default function Jogo() {
  const { id } = useParams()
  const jogo = jogos.find((j) => j.id === id)

  if (!jogo) return <JogoNaoEncontrado id={id} />

  return <DetalhesJogo key={jogo.id} jogo={jogo} />
}
