import AboutSection from "../components/mainPage/AboutSection";
import HeroSection from "../components/mainPage/HeroSection";
import NewProductsSection from "../components/mainPage/NewProductsSection";
import PopularCategoriesSection from "../components/mainPage/PopularCategoriesSection";

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
