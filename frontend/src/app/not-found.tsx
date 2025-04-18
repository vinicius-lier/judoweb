import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">Página não encontrada</p>
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          Ir para o Dashboard
        </Link>
      </div>
    </div>
  )
} 