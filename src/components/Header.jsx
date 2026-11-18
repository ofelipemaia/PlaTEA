import { Link, NavLink } from 'react-router'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="PlaTEA+, início">
          <span className="brand-mark" aria-hidden="true">▣</span>
          PlaTEA+
        </Link>

        <nav className="main-nav" aria-label="Navegação principal">
          <NavLink to="/resultados">Pesquisar</NavLink>
          <Link to="/#apoio">Conteúdos de apoio</Link>
          <Link to="/#sobre">Sobre</Link>
        </nav>
      </div>
    </header>
  )
}