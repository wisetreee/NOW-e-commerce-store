import AboutSection from "../components/AboutSection";
import HeroSection from "../components/HeroSection";
import NewProductsSection from "../components/NewProductsSection";
import PopularCategoriesSection from "../components/PopularCategoriesSection";

export default function Home() {

  return (
    <main>
      <HeroSection/> 
      <NewProductsSection/>  
      <PopularCategoriesSection/>
      <AboutSection/>
    </main>

  );
}
