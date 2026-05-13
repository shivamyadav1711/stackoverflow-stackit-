import "./globals.css";
import FloatingNavbar from "@/components/ui/FloatingNavbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <FloatingNavbar />
        <main className="pt-24">{children}</main>
      </body>
    </html>
  );
}