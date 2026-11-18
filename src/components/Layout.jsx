import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import ScrollToHash from './ScrollToHash'

export default function Layout() {
  return (
    <>
      <ScrollToHash />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo" className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}