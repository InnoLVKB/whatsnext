import AuthContext from './AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <AuthContext>
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
