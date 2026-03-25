export const metadata = {
  title: "Olivieri SaaS",
  description: "Sistema SaaS completo"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
