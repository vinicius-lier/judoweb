import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sistema de Gestão - Academia de Judô',
  description: 'Sistema de gestão para academia de judô',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
} 