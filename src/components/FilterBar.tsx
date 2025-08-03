'use client';

import { useState, useEffect, useRef } from 'react';

interface FilterBarProps {
  breeds: string[];
  locations: string[];
  onBreedChange: (breed: string, isChecked: boolean) => void;
  onLocationChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onMinAgeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxAgeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateListedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedBreeds: string[];
  minAge: string;
  maxAge: string;
  minPrice: string;
  maxPrice: string;
  dateListed: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  breeds,
  locations,
  onBreedChange,
  onLocationChange,
  onMinAgeChange,
  onMaxAgeChange,
  onMinPriceChange,
  onMaxPriceChange,
  onDateListedChange,
  selectedBreeds,
  minAge,
  maxAge,
  minPrice,
  maxPrice,
  dateListed,
}) => {
  const [isBreedDropdownOpen, setIsBreedDropdownOpen] = useState(false);
  const breedDropdownRef = useRef<HTMLDivElement>(null);
  const breedButtonRef = useRef<HTMLButtonElement>(null);
  const breedOptionsRef = useRef<HTMLLabelElement[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (breedDropdownRef.current && !breedDropdownRef.current.contains(event.target as Node)) {
        setIsBreedDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsBreedDropdownOpen(false);
      breedButtonRef.current?.focus();
    } else if (event.key === 'ArrowDown' && isBreedDropdownOpen) {
      event.preventDefault();
      const currentIndex = breedOptionsRef.current.findIndex(option => option === document.activeElement);
      const nextIndex = (currentIndex + 1) % breedOptionsRef.current.length;
      breedOptionsRef.current[nextIndex]?.focus();
    } else if (event.key === 'ArrowUp' && isBreedDropdownOpen) {
      event.preventDefault();
      const currentIndex = breedOptionsRef.current.findIndex(option => option === document.activeElement);
      const prevIndex = (currentIndex - 1 + breedOptionsRef.current.length) % breedOptionsRef.current.length;
      breedOptionsRef.current[prevIndex]?.focus();
    }
  };

  const inputClasses = "w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="flex flex-col space-y-4 mb-6">
      <div className="relative" ref={breedDropdownRef}>
        <label id="breed-label" className={labelClasses}>Breed</label>
        <button
          ref={breedButtonRef}
          onClick={() => setIsBreedDropdownOpen(!isBreedDropdownOpen)}
          className={`${inputClasses} text-left`}
          aria-haspopup="listbox"
          aria-expanded={isBreedDropdownOpen}
          aria-labelledby="breed-label"
          onKeyDown={handleKeyDown}
        >
          {selectedBreeds.length > 0 ? `Breeds (${selectedBreeds.length})` : 'All Breeds'}
        </button>
        {isBreedDropdownOpen && (
          <div
            role="listbox"
            aria-labelledby="breed-label"
            className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto"
            tabIndex={-1}
          >
            {breeds.map((breed, index) => (
              <label
                key={breed}
                role="option"
                aria-selected={selectedBreeds.includes(breed)}
                className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    onBreedChange(breed, !selectedBreeds.includes(breed));
                  }
                  handleKeyDown(e);
                }}
                ref={el => { if (el) breedOptionsRef.current[index] = el; }}
              >
                <input
                  type="checkbox"
                  checked={selectedBreeds.includes(breed)}
                  onChange={(e) => onBreedChange(breed, e.target.checked)}
                  className="mr-2 pointer-events-none"
                  tabIndex={-1}
                />
                {breed}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <label htmlFor="location-select" className={labelClasses}>Location</label>
        <select
          id="location-select"
          onChange={onLocationChange}
          className={inputClasses}
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClasses}>Age (Years)</label>
        <div className="flex items-center gap-2">
          <input
            id="min-age"
            type="number"
            value={minAge}
            onChange={onMinAgeChange}
            placeholder="Min"
            className={`${inputClasses} w-1/2`}
          />
          <span className="text-gray-500">-</span>
          <input
            id="max-age"
            type="number"
            value={maxAge}
            onChange={onMaxAgeChange}
            placeholder="Max"
            className={`${inputClasses} w-1/2`}
          />
        </div>
      </div>

      <div>
        <label className={labelClasses}>Price (R)</label>
        <div className="flex items-center gap-2">
          <input
            id="min-price"
            type="number"
            value={minPrice}
            onChange={onMinPriceChange}
            placeholder="Min"
            className={`${inputClasses} w-1/2`}
          />
          <span className="text-gray-500">-</span>
          <input
            id="max-price"
            type="number"
            value={maxPrice}
            onChange={onMaxPriceChange}
            placeholder="Max"
            className={`${inputClasses} w-1/2`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="date-listed" className={labelClasses}>Date Listed</label>
        <input
          id="date-listed"
          type="date"
          value={dateListed}
          onChange={onDateListedChange}
          className={inputClasses}
        />
      </div>
    </div>
  );
};

export default FilterBar;
