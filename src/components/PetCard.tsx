import Link from 'next/link';

interface PetCardProps {
  pet: {
    id: string;
    breed: string;
    price: number;
    location: string;
    image: string[];
    created_at: string; // Using created_at from Supabase
  };
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const listedDate = new Date(pet.created_at).toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <Link
      href={{
        pathname: `/pets/${pet.id}`,
      }}
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group">
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={pet.image[0]}
            alt={pet.breed}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white px-3 py-1 rounded-tr-lg text-xl font-bold">
            R {pet.price.toLocaleString()}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{pet.breed}</h3>
          <p className="text-sm text-gray-500 mt-1 truncate">{pet.location}</p>
          <p className="text-xs text-gray-400 mt-1">Listed: {listedDate}</p>
        </div>
      </div>
    </Link>
  );
};

export default PetCard;
