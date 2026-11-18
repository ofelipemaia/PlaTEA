import { useSearchParams } from 'react-router'

export default function Resultados() {
  const [params] = useSearchParams()

  return (
    <>
      <h1 className="page-title">Resultados da busca</h1>
      <p>Categoria: {params.get('categoria')} | Termo: {params.get('q')}</p>
    </>
  )
}