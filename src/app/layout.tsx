import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="container mt-16 mb-8">
          <h1 className="text-5xl text-gray-900 mb-4 font-bold">Memory</h1>
          <h4 className="text-lg text-gray-500">
            Lust auf eine Runde Memory gegen deine Freunde oder den Computer?
            Dann bist du hier genau richtig! Finde mehr Paare als dein Gegner
            und gewinne das Spiel.
          </h4>
        </header>
        {children}
      </body>
    </html>
  );
}
