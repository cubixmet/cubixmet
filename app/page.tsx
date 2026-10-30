import SiteHeader from "../components/home/SiteHeader";
import HeroSection from "../components/home/HeroSection";
import HomeSections from "../components/home/HomeSections";
import SiteFooter from "../components/home/SiteFooter";
import { projects } from "../data/projects";
import { products } from "../data/products";
import { freeTools } from "../data/freeTools";
import { getAvailablePortfolioVideos } from "../data/portfolioVideos.server";

export default function Home() {
  const availableVideoPaths = getAvailablePortfolioVideos([
    ...projects.map((project) => project.video),
    ...products.map((product) => product.video),
    ...freeTools.map((tool) => tool.video),
  ]);
  return (
    <main className="overflow-x-clip bg-[#050505] text-white">
      <SiteHeader />
      <HeroSection />
      <HomeSections availableVideoPaths={availableVideoPaths} />
      <SiteFooter />
    </main>
  );
}
