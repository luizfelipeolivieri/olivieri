import "./globals.css";

export const metadata = {
  title: "Sistema Administrativo",
  description: "Projeto base com Next.js e Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
