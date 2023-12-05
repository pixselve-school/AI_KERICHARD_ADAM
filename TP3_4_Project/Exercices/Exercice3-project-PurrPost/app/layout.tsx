import type { Metadata } from "next";
import "./globals.css";
import { CatIcon } from "@/components/cat-icon";

export const metadata: Metadata = {
  title: "PurrPost",
  description: "Votre petit chaton de compagnie!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="max-w-3xl mx-auto bg-gray-100">
        <header className="bg-blue-500 text-white p-4 mb-6">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CatIcon className="h-6"></CatIcon>
              <h1 className="text-lg font-bold">PurrPost</h1>
            </div>
            <nav>
              <p>❤️ Pour les amoureux de chatons</p>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
