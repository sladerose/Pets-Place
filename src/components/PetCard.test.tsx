import { render, screen } from '@testing-library/react';
import PetCard from '@/components/PetCard';

describe('PetCard', () => {
  const mockPet = {
    id: 1,
    breed: 'Golden Retriever',
    price: 'R 10,000',
        location: 'Cape Town, WC',
    image: 'https://placedog.net/640/480?id=1',
  };

  it('renders pet information correctly', () => {
    render(<PetCard pet={mockPet} />);

    expect(screen.getByText('Golden Retriever')).toBeInTheDocument();
    expect(screen.getByText('R 10,000')).toBeInTheDocument();
    expect(screen.getByText('Cape Town, WC')).toBeInTheDocument();
    expect(screen.getByAltText('Golden Retriever')).toBeInTheDocument();
  });

  it('links to the correct pet details page', () => {
    render(<PetCard pet={mockPet} />);

    const linkElement = screen.getByRole('link', { name: /Golden Retriever/i });
    expect(linkElement).toHaveAttribute('href', '/pets/1');
  });
});
