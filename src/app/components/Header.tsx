'use client'

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl text-primary bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">CloudPilot</h1>
        <nav className="flex flex-wrap gap-3 sm:gap-6 text-sm sm:text-base">
          <a href="#" className="text-blue-700 font-medium">Overview</a>
          <a href="#" className="text-muted-foreground hover:text-foreground">Cost Optimisation</a>
          <a href="#" className="text-muted-foreground hover:text-foreground">Automation</a>
          <a href="#" className="text-muted-foreground hover:text-foreground">Settings</a>
        </nav>
      </div>
    </header>
  )
}

