import { getHero } from "@/sanity/lib/hero/getHero";
import { imageUrl } from "@/sanity/lib/imageUrl";
import Image from "next/image";
import Button from "./Button";

export default async function HeroSection() {
    const hero = await getHero();
  return (
    <section className="mb-16">
    <div className="img-container relative w-full aspect-[16/5] flex flex-col items-center justify-center">
        {/* Фон с изображением */}
        <div className="w-full h-full">
            <Image 
                src={imageUrl(hero.image).url()}
                alt=""
                fill
                quality={100}
                className="object-cover"
            />
        </div>
        {/* Слой с текстом */}
        <div className="container z-10 text-white relative -top-1/2">
        <div className="w-4/5 sm:w-1/2 md:w-1/2 xl:w-1/3">
            <h1 className="text-accent_1 font-medium lg:text-4xl">{hero.title}</h1>
            <p className="mt-2 mb-8 lg:text-2xl">{hero.description}</p>
            <Button width = "75%" theme="primary" text={hero.buttonText}/>
            </div>
        </div>
    </div>
</section>
  );
}
