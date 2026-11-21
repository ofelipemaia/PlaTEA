function Icone({ tamanho, children }) {
  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

export function IconeLinkExterno() {
  return (
    <Icone tamanho={16}>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </Icone>
  )
}

export function IconeSeta() {
  return (
    <Icone tamanho={12}>
      <path d="m9 18 6-6-6-6" />
    </Icone>
  )
}
