import { render, screen } from '@testing-library/react'
import Header from '../Header'
import { usePathname } from 'next/navigation'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

describe('Header', () => {
  it('renders CloudPilot title', () => {
    jest.mocked(usePathname).mockReturnValue('/')
    render(<Header />)
    expect(screen.getByText('CloudPilot')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    jest.mocked(usePathname).mockReturnValue('/')
    render(<Header />)
    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('Cost Optimisation')).toBeInTheDocument()
    expect(screen.getByText('Automation')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('highlights active link', () => {
    jest.mocked(usePathname).mockReturnValue('/cost-optimisation')
    render(<Header />)
    const activeLink = screen.getByText('Cost Optimisation')
    expect(activeLink).toHaveClass('text-blue-700')
  })
})

