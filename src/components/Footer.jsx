import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer id="sobre" className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h2>Repositório de Jogos</h2>
            <p>Um projeto de preservação e pesquisa de jogos digitais.</p>
          </div>
          <div>
            <h3>Links</h3>
            <div className="footer-links">
              <span className="footer-link">API</span>
              <span className="footer-link">Depositar Trabalho</span>
              <span className="footer-link">FAQ</span>
            </div>
          </div>
          <div>
            <h3>Institucional</h3>
            <div className="footer-links">
              <Link to="/#sobre">Sobre</Link>
              <span className="footer-link">Contato</span>
              <span className="footer-link">Termos de Uso</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2024 Repositório de Jogos. Todos os direitos reservados.</span>
          <span>Desenvolvido com ❤️</span>
        </div>
      </div>
    </footer>
  )
}