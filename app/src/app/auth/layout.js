import "../styles/globals.css";

export const metadata = {
  title: "Auth",
  description: "Authentication layout for the application",
};

export default function AuthLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex justify-center items-center w-screen h-screen px-32 py-12">{children}</body>
    </html>
  );
}
