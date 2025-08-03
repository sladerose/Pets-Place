import { render, screen, fireEvent } from '@testing-library/react';
import FilterSidebar from '@/components/FilterSidebar';

describe('FilterSidebar', () => {
  const mockBreeds = ['Golden Retriever', 'Labrador', 'Poodle'];
  const mockLocations = ['Cape Town, WC', 'Johannesburg, GP'];
  const mockOnBreedChange = jest.fn();
  const mockOnLocationChange = jest.fn();
  const mockOnSearchChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input, breed dropdown, and location select', () => {
    render(
      <FilterSidebar
        breeds={mockBreeds}
        locations={mockLocations}
        onBreedChange={mockOnBreedChange}
        onLocationChange={mockOnLocationChange}
        onSearchChange={mockOnSearchChange}
        selectedBreeds={[]}
        searchTerm=""
      />
    );

    expect(screen.getByLabelText(/Search/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Breed/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
  });

  it('updates search term on input change', () => {
    render(
      <FilterSidebar
        breeds={mockBreeds}
        locations={mockLocations}
        onBreedChange={mockOnBreedChange}
        onLocationChange={mockOnLocationChange}
        onSearchChange={mockOnSearchChange}
        selectedBreeds={[]}
        searchTerm=""
      />
    );

    const searchInput = screen.getByLabelText(/Search/i);
    fireEvent.change(searchInput, { target: { value: 'golden' } });
    expect(mockOnSearchChange).toHaveBeenCalledTimes(1);
    expect(mockOnSearchChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: 'golden' }),
    }));
  });

  it('toggles breed dropdown visibility', () => {
    render(
      <FilterSidebar
        breeds={mockBreeds}
        locations={mockLocations}
        onBreedChange={mockOnBreedChange}
        onLocationChange={mockOnLocationChange}
        onSearchChange={mockOnSearchChange}
        selectedBreeds={[]}
        searchTerm=""
      />
    );

    const breedButton = screen.getByRole('button', { name: /Breed/i });
    fireEvent.click(breedButton);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    fireEvent.click(breedButton);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('calls onBreedChange when a breed checkbox is clicked', () => {
    render(
      <FilterSidebar
        breeds={mockBreeds}
        locations={mockLocations}
        onBreedChange={mockOnBreedChange}
        onLocationChange={mockOnLocationChange}
        onSearchChange={mockOnSearchChange}
        selectedBreeds={[]}
        searchTerm=""
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Breed/i }));
    const goldenRetrieverCheckbox = screen.getByLabelText('Golden Retriever');
    fireEvent.click(goldenRetrieverCheckbox);
    expect(mockOnBreedChange).toHaveBeenCalledWith('Golden Retriever', true);
  });

  it('calls onLocationChange when a location is selected', () => {
    render(
      <FilterSidebar
        breeds={mockBreeds}
        locations={mockLocations}
        onBreedChange={mockOnBreedChange}
        onLocationChange={mockOnLocationChange}
        onSearchChange={mockOnSearchChange}
        selectedBreeds={[]}
        searchTerm=""
      />
    );

    const locationSelect = screen.getByLabelText(/Location/i);
    fireEvent.change(locationSelect, { target: { value: 'Cape Town, WC' } });
    expect(mockOnLocationChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: 'Cape Town, WC' }),
    }));
  });
});