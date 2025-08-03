import { createClient } from '@supabase/supabase-js';
import { allPets } from '../src/lib/data';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../../.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anon Key environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function updatePetAges() {
  console.log('Updating pet ages in Supabase...');

  for (const pet of allPets) {
    // Generate a random age between 1 and 10 (for demonstration)
    const randomAge = Math.floor(Math.random() * 10) + 1;

    console.log(`Attempting to update age for pet with ID: ${pet.id} to ${randomAge}`);
    const { data, error } = await supabase
      .from('pets')
      .update({ age: randomAge })
      .eq('id', pet.id);

    if (error) {
      console.error(`Error updating age for ${pet.breed}:`, error);
    } else {
      console.log(`Successfully updated age for ${pet.breed}`);
    }
  }
  console.log('Age update complete.');
}

updatePetAges();