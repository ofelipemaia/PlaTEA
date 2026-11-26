// Monta o endereço de um arquivo da pasta "public", respeitando a base do site.
// urlPublica('assets/jogos/J1.png') -> '/PlaTEA/assets/jogos/J1.png' (online)
export function urlPublica(caminho) {
  return `${import.meta.env.BASE_URL}${caminho.replace(/^\//, '')}`
}