type Props = {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
}

export default function Chip({ children, active, onClick }: Props) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}
