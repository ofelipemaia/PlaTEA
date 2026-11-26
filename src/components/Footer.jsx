// Para incluir outro apoiador, acrescente uma linha nesta lista.
const LOGOS = [
  { arquivo: 'LogoCAPES.png', alt: 'Logotipo da CAPES' },
  { arquivo: 'LogoCNPq.png', alt: 'Logotipo do CNPq' },
  { arquivo: 'LogoUEL.png', alt: 'Logotipo da UEL' },
  { arquivo: 'LogoAraucaria.png', alt: 'Logotipo da Fundação Araucaria' }
  
]

export default function Footer() {
  return (
    <footer id="sobre" className="site-footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-notice">
            <h2>
              Esta plataforma possui caráter exclusivamente informativo e
              educativo.
            </h2>
            <p>
              O repositório cataloga jogos educativos com base em fontes
              públicas, atribuindo os devidos créditos aos autores e
              direcionando os usuários às fontes originais. Não hospeda,
              armazena ou distribui jogos ou arquivos de instalação.
            </p>
          </div>
        </div>
      </div>

      <div className="footer-support">
        <div className="container footer-support-inner">
          <span className="footer-support-label">Apoio</span>

          <ul className="footer-logos">
            {LOGOS.map(({ arquivo, alt }) => (
              <li key={arquivo}>
                <img
                  src={`${import.meta.env.BASE_URL}assets/${arquivo}`}
                  alt={alt}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}