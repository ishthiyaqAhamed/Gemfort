import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is not defined in .env');
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding Gemfort database...');

  // 1. Create or ensure categories
  const categoriesData = [
    { name: 'Sapphires', slug: 'sapphires', description: 'Royal Ceylon, Cornflower, and Vivid Pink sapphires.' },
    { name: 'Rubies', slug: 'rubies', description: 'Unheated Pigeon Blood and fine red natural corundum.' },
    { name: 'Padparadscha', slug: 'padparadscha', description: 'The rare lotus-hued sunset sapphire of Ceylon.' },
    { name: 'Alexandrite', slug: 'alexandrite', description: 'Phenomenal color-changing chrysoberyl specimens.' },
    { name: 'Spinels', slug: 'spinels', description: 'Vivid neon and cobalt untreated spinels.' },
  ];

  const categories: Record<string, any> = {};

  for (const cat of categoriesData) {
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    categories[cat.slug] = record;
  }

  console.log('Categories created or verified.');

  // 2. Initial luxury gemstones
  const gemstonesData = [
    {
      name: 'Royal Blue Sapphire',
      slug: 'royal-blue-sapphire-3-45ct',
      description: 'An exceptional unheated Royal Blue Sapphire of peerless Ceylon provenance. Sourced directly from the artisanal gravels of Ratnapura, Sri Lanka. This collector stone showcases a deep, velvety cornflower-to-royal hue with remarkable transparency and vivid natural scintillation.',
      price: 4250,
      weight: 3.45,
      color: 'Royal Blue (Vivid)',
      shape: 'Cushion Mixed Cut',
      origin: 'Ratnapura, Sri Lanka',
      treatment: '100% Unheated & Untreated',
      status: 'AVAILABLE',
      images: ['/images/guide/blue-sapphire.png'],
      certificate: 'GRS-2024-88419',
      categoryId: categories['sapphires'].id,
    },
    {
      name: 'Pigeon Blood Ruby',
      slug: 'pigeon-blood-ruby-2-10ct',
      description: 'An ultra-rare Pigeon Blood Ruby with mesmerizing fire and supreme crystalline purity. Exhibits the coveted incandescent crimson fluorescence under direct light, signifying the finest unheated corundum specimen.',
      price: 6800,
      weight: 2.10,
      color: 'Pigeon Blood Red',
      shape: 'Cushion Step Cut',
      origin: 'Montepuez, Mozambique',
      treatment: 'Unheated (Certified Natural)',
      status: 'AVAILABLE',
      images: ['/images/guide/ruby.png'],
      certificate: 'GIA-2024-54109',
      categoryId: categories['rubies'].id,
    },
    {
      name: 'Sunset Padparadscha',
      slug: 'sunset-padparadscha-1-85ct',
      description: 'The pinnacle of Ceylon gemstones — a sovereign Padparadscha Sapphire manifesting the delicate harmony of lotus petal pink and tropical orange sunset. Certified completely unheated with superb optical clarity.',
      price: 8500,
      weight: 1.85,
      color: 'Sunset Pink-Orange',
      shape: 'Oval Brilliant Cut',
      origin: 'Balangoda, Sri Lanka',
      treatment: '100% Natural & Untreated',
      status: 'AVAILABLE',
      images: ['/images/guide/padparadscha.png'],
      certificate: 'GRS-2024-91024',
      categoryId: categories['padparadscha'].id,
    },
    {
      name: 'Vivid Pink Sapphire',
      slug: 'vivid-pink-sapphire-4-20ct',
      description: 'An eye-clean, vibrant Pink Sapphire radiating intense magenta brilliance. Masterfully faceted with precision symmetry to accentuate its high luster and dazzling electric luster.',
      price: 3900,
      weight: 4.20,
      color: 'Vivid Neon Pink',
      shape: 'Cushion Mixed Cut',
      origin: 'Ratnapura, Sri Lanka',
      treatment: '100% Unheated & Untreated',
      status: 'AVAILABLE',
      images: ['/images/guide/pink-sapphire.png'],
      certificate: 'GIC-2024-11820',
      categoryId: categories['sapphires'].id,
    },
    {
      name: 'Color Change Alexandrite',
      slug: 'color-change-alexandrite-1-50ct',
      description: 'Phenomenal natural Alexandrite displaying a dramatic 90% color shift from lush teal-green in natural daylight to radiant incandescent raspberry amethyst under evening halogen lighting.',
      price: 12000,
      weight: 1.50,
      color: 'Teal Green to Raspberry Red',
      shape: 'Round Brilliant Cut',
      origin: 'Minas Gerais, Brazil',
      treatment: '100% Untreated Natural',
      status: 'AVAILABLE',
      images: ['/images/guide/alexandrite.png'],
      certificate: 'SSEF-2024-00921',
      categoryId: categories['alexandrite'].id,
    },
    {
      name: 'Golden Yellow Sapphire',
      slug: 'golden-yellow-sapphire-5-10ct',
      description: 'A luminous, unheated canary-to-golden Ceylon sapphire resembling distilled sunlight. Uncommonly clean crystal with exceptional brilliance.',
      price: 3200,
      weight: 5.10,
      color: 'Canary Golden Yellow',
      shape: 'Oval Brilliant Cut',
      origin: 'Ratnapura, Sri Lanka',
      treatment: 'Unheated Ceylon Corundum',
      status: 'AVAILABLE',
      images: ['/images/guide/yellow-sapphire.png'],
      certificate: 'GRS-2024-39918',
      categoryId: categories['sapphires'].id,
    },
    {
      name: 'Neon Spinel',
      slug: 'neon-spinel-3-05ct',
      description: 'A fiery, fluorescent hot neon pink Spinel originating from the renowned deposits of Mahenge. Boasts an extraordinarily high refractive index and crystalline brilliance.',
      price: 2100,
      weight: 3.05,
      color: 'Electric Hot Pink',
      shape: 'Cushion Brilliant',
      origin: 'Mahenge, Tanzania',
      treatment: 'Natural (No Treatments Known)',
      status: 'AVAILABLE',
      images: ['/images/guide/spinel.png'],
      certificate: 'GIA-2024-41908',
      categoryId: categories['spinels'].id,
    },
  ];

  for (const stone of gemstonesData) {
    await prisma.gemstone.upsert({
      where: { slug: stone.slug },
      update: {},
      create: stone,
    });
  }

  console.log('Gemstones seeded successfully.');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
