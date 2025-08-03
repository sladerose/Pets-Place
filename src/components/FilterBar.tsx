'use client';

import { useState, useEffect, useRef } from 'react';

interface FilterBarProps {
  breeds: string[];
  locations: string[];
  onBreedChange: (breed: string, isChecked: boolean) => void;
  onLocationChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedLocation: string;
  onMinAgeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxAgeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOrderByChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedBreeds: string[];
  minAge: string;
  maxAge: string;
  minPrice: string;
  maxPrice: string;
  orderBy: string;
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
  onOrderByChange,
  selectedBreeds,
  selectedLocation,
  minAge,
  maxAge,
  minPrice,
  maxPrice,
  orderBy,
}) => {
  const [isBreedDropdownOpen, setIsBreedDropdownOpen] = useState(false);
  const breedDropdownRef = useRef<HTMLDivElement>(null);
  const breedButtonRef = useRef<HTMLButtonElement>(null);
  const breedOptionsRef = useRef<HTMLLabelElement[]>([]);

  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const locationButtonRef = useRef<HTMLButtonElement>(null);
  const locationOptionsRef = useRef<HTMLDivElement[]>([]);

  const [isOrderByDropdownOpen, setIsOrderByDropdownOpen] = useState(false);
  const orderByDropdownRef = useRef<HTMLDivElement>(null);
  const orderByButtonRef = useRef<HTMLButtonElement>(null);
  const orderByOptionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (breedDropdownRef.current && !breedDropdownRef.current.contains(event.target as Node)) {
        setIsBreedDropdownOpen(false);
      }
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target as Node)) {
        setIsLocationDropdownOpen(false);
      }
      if (orderByDropdownRef.current && !orderByDropdownRef.current.contains(event.target as Node)) {
        setIsOrderByDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent, dropdownType: 'breed' | 'location' | 'orderBy') => {
    if (event.key === 'Escape') {
      if (dropdownType === 'breed') {
        setIsBreedDropdownOpen(false);
        breedButtonRef.current?.focus();
      } else if (dropdownType === 'location') {
        setIsLocationDropdownOpen(false);
        locationButtonRef.current?.focus();
      } else if (dropdownType === 'orderBy') {
        setIsOrderByDropdownOpen(false);
        orderByButtonRef.current?.focus();
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      let optionsRef: (HTMLLabelElement | HTMLDivElement)[] = [];
      let isOpen = false;
      if (dropdownType === 'breed' && isBreedDropdownOpen) {
        optionsRef = breedOptionsRef.current;
        isOpen = true;
      } else if (dropdownType === 'location' && isLocationDropdownOpen) {
        optionsRef = locationOptionsRef.current;
        isOpen = true;
      } else if (dropdownType === 'orderBy' && isOrderByDropdownOpen) {
        optionsRef = orderByOptionsRef.current;
        isOpen = true;
      }

      if (isOpen) {
        const currentIndex = optionsRef.findIndex(option => option === document.activeElement);
        const nextIndex = (currentIndex + 1) % optionsRef.length;
        optionsRef[nextIndex]?.focus();
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      let optionsRef: (HTMLLabelElement | HTMLDivElement)[] = [];
      let isOpen = false;
      if (dropdownType === 'breed' && isBreedDropdownOpen) {
        optionsRef = breedOptionsRef.current;
        isOpen = true;
      } else if (dropdownType === 'location' && isLocationDropdownOpen) {
        optionsRef = locationOptionsRef.current;
        isOpen = true;
      } else if (dropdownType === 'orderBy' && isOrderByDropdownOpen) {
        optionsRef = orderByOptionsRef.current;
        isOpen = true;
      }

      if (isOpen) {
        const currentIndex = optionsRef.findIndex(option => option === document.activeElement);
        const prevIndex = (currentIndex - 1 + optionsRef.length) % optionsRef.length;
        optionsRef[prevIndex]?.focus();
      }
    }
  };

  const inputClasses = "w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="flex flex-row flex-wrap gap-4 mb-6">
      <div className="relative flex-1 " ref={breedDropdownRef}>
        <label id="breed-label" className={labelClasses}>Breed</label>
        <button
          ref={breedButtonRef}
          onClick={() => setIsBreedDropdownOpen(!isBreedDropdownOpen)}
          className={`${inputClasses} text-left`}
          aria-haspopup="listbox"
          aria-expanded={isBreedDropdownOpen}
          aria-labelledby="breed-label"
          onKeyDown={(e) => handleKeyDown(e, 'breed')}
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

      <div className="relative flex-1 ">
        <label id="location-label" className={labelClasses}>Location</label>
        <button
          ref={locationButtonRef}
          onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
          className={`${inputClasses} text-left`}
          aria-haspopup="listbox"
          aria-expanded={isLocationDropdownOpen}
          aria-labelledby="location-label"
          onKeyDown={(e) => handleKeyDown(e, 'location')}
        >
          {selectedLocation || 'All Locations'}
        </button>
        {isLocationDropdownOpen && (
          <div
            role="listbox"
            aria-labelledby="location-label"
            className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto"
            tabIndex={-1}
          >
            <div
              key="all-locations"
              role="option"
              aria-selected={!selectedLocation}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                onLocationChange({ target: { value: '' } } as React.ChangeEvent<HTMLSelectElement>);
                setIsLocationDropdownOpen(false);
              }}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  onLocationChange({ target: { value: '' } } as React.ChangeEvent<HTMLSelectElement>);
                  setIsLocationDropdownOpen(false);
                }
                handleKeyDown(e, 'location');
              }}
              ref={el => { if (el) locationOptionsRef.current[0] = el as HTMLDivElement; }}
            >
              All Locations
            </div>
            {locations.map((location, index) => (
              <div
                key={location}
                role="option"
                aria-selected={selectedLocation === location}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    onLocationChange({ target: { value: location } } as React.ChangeEvent<HTMLSelectElement>);
                    setIsLocationDropdownOpen(false);
                  }
                  handleKeyDown(e, 'location');
                }}
                ref={el => { if (el) locationOptionsRef.current[index + 1] = el as HTMLDivElement; }}
              >
                {location}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 ">
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

      <div className="flex-1 ">
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

      <div className="flex-1 ">
        <label id="order-by-label" className={labelClasses}>Order By</label>
        <button
          ref={orderByButtonRef}
          onClick={() => setIsOrderByDropdownOpen(!isOrderByDropdownOpen)}
          className={`${inputClasses} text-left`}
          aria-haspopup="listbox"
          aria-expanded={isOrderByDropdownOpen}
          aria-labelledby="order-by-label"
          onKeyDown={(e) => handleKeyDown(e, 'orderBy')}
        >
          {orderBy === 'created_at_asc' ? 'Date Listed (Ascending)' : orderBy === 'created_at_desc' ? 'Date Listed (Descending)' : 'Default'}
        </button>
        {isOrderByDropdownOpen && (
          <div
            role="listbox"
            aria-labelledby="order-by-label"
            className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto"
            tabIndex={-1}
          >
            <div
              key="default-order"
              role="option"
              aria-selected={!orderBy}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  onOrderByChange({ target: { value: '' } } as React.ChangeEvent<HTMLSelectElement>);
                  setIsOrderByDropdownOpen(false);
                }
                handleKeyDown(e, 'orderBy');
              }}
              ref={el => { if (el) orderByOptionsRef.current[0] = el as HTMLDivElement; }}
            >
              Default
            </div>
            <div
              key="created_at_asc"
              role="option"
              aria-selected={orderBy === 'created_at_asc'}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  onOrderByChange({ target: { value: 'created_at_asc' } } as React.ChangeEvent<HTMLSelectElement>);
                  setIsOrderByDropdownOpen(false);
                }
                handleKeyDown(e, 'orderBy');
              }}
              ref={el => { if (el) orderByOptionsRef.current[1] = el as HTMLDivElement; }}
            >
              Date Listed (Ascending)
            </div>
            <div
              key="created_at_desc"
              role="option"
              aria-selected={orderBy === 'created_at_desc'}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  onOrderByChange({ target: { value: 'created_at_desc' } } as React.ChangeEvent<HTMLSelectElement>);
                  setIsOrderByDropdownOpen(false);
                }
                handleKeyDown(e, 'orderBy');
              }}
              ref={el => { if (el) orderByOptionsRef.current[2] = el as HTMLDivElement; }}
            >
              Date Listed (Descending)
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
