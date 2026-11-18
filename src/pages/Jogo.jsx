import { useParams } from 'react-router'

export default function Jogo() {
  const { id } = useParams()

  return <h1 className="page-title">Jogo {id}</h1>
}