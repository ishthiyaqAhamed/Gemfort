import Navbar from '@/components/Navbar/Navbar';
import PageHeader from '@/components/PageHeader/PageHeader';
import FeaturedStones from '@/components/FeaturedStones/FeaturedStones';

export default function GemstonesPage() {
  return (
    <main>
      <Navbar />
      <PageHeader 
        title="Gemstones" 
        subtitle="Explore our full collection of natural sapphires, rubies, spinels, and more."
      />
      <FeaturedStones />
    </main>
  );
}
