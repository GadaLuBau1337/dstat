export const metadata = {
  title: 'DSTAT Network',
  description: 'Realtime traffic monitor'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: '#0b0f14',
          color: '#e5e7eb',
          fontFamily: 'monospace'
        }}
      >
        {children}
      </body>
    </html>
  )
}
