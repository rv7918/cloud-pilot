import { render, screen } from '@testing-library/react'
import CloudSpendCard from '../CloudSpendCard'

const mockData = [
  { name: 'AWS', spend: 5420, trend: 99.8, color: 'hsl(221.2 83.2% 53.3%)', bgColor: '#EFF6FF' },
  { name: 'Azure', spend: 1340, trend: 54.8, color: 'hsl(280 100% 70%)', bgColor: '#EEF2FF' },
]

describe('CloudSpendCard', () => {
  it('renders cloud provider names', () => {
    render(<CloudSpendCard data={mockData} />)
    expect(screen.getByText('AWS')).toBeInTheDocument()
    expect(screen.getByText('Azure')).toBeInTheDocument()
  })

  it('displays spend amounts', () => {
    render(<CloudSpendCard data={mockData} />)
    expect(screen.getByText('$5,420')).toBeInTheDocument()
    expect(screen.getByText('$1,340')).toBeInTheDocument()
  })

  it('displays trend percentages', () => {
    render(<CloudSpendCard data={mockData} />)
    expect(screen.getByText('99.8%')).toBeInTheDocument()
    expect(screen.getByText('54.8%')).toBeInTheDocument()
  })
})

