import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import FeaturedStones from '@/components/FeaturedStones/FeaturedStones';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedStones />
    </main>
  );
}
