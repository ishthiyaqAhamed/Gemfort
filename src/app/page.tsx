import Hero from '@/components/Hero/Hero';
import FeaturedStones from '@/components/FeaturedStones/FeaturedStones';
import PortraitShowcase from '@/components/PortraitShowcase/PortraitShowcase';
import AboutPreview from '@/components/AboutPreview/AboutPreview';
import ValueProps from '@/components/ValueProps/ValueProps';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedStones />
      <PortraitShowcase />
      <AboutPreview />
      <ValueProps />
    </main>
  );
}
