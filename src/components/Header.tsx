'use client'

import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Overview', id: 'overview' },
    { href: '/cost-optimisation', label: 'Cost Optimisation', id: 'cost-optimisation' },
    { href: '/automation', label: 'Automation', id: 'automation' },
    { href: '#', label: 'Settings', id: 'settings' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href)
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl text-primary bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">CloudPilot</h1>
        <nav className="flex flex-wrap gap-3 sm:gap-6 text-sm sm:text-base">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={
                isActive(link.href)
                  ? 'text-blue-700 font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

