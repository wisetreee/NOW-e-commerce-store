"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import SizeGrid from "../common/SizesGrid";
import { Category } from "@/sanity.types";
import { Checkbox } from "../ui/Checkbox";
import { useSearchParams } from 'next/navigation';

interface FilterPanelProps {
  panelOpen: boolean;
  setPanelOpen: (isOpen: boolean) => void;
  categories: Category[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({ panelOpen, setPanelOpen, categories}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [gender, setGender] = useState<string | null>(null);
  const [sizes, setSizes] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]); // Диапазон цены
  const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.getAll("categories") || []);
  

  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked
        ? [...prev, categoryName] // Добавляем категорию
        : prev.filter((name) => name !== categoryName) // Удаляем категорию
    );
  };
  
  const applyFilters = () => {
    const query: Record<string, string> = {};
  
    if (gender) query.gender = gender;
    if (sizes.length > 0) query.sizes = sizes.join(",");
    if (selectedCategories.length > 0) query.categories = selectedCategories.join(",");
    if (priceRange[1] - priceRange[0] > 0) {
      query.minPrice = priceRange[0].toString();
      query.maxPrice = priceRange[1].toString();
    }
  
    // Создаем строку параметров
    const queryString = new URLSearchParams(query).toString();
  
    router.push(`/catalog?${queryString}`);
  
    setPanelOpen(false); // Закрываем панель
  };
  return (
    <div
      className={`fixed z-20 bg-white top-0 h-screen w-[75%] sm:w-[50%] lg:w-[25%] overflow-scroll shadow-lg transition-all duration-500 ${
        panelOpen ? "right-0" : "-right-full"
      }`}
    >
      <div className="border-b">
        {/* Закрыть панель */}
        <div className="flex justify-between items-center p-4 pb-2">
          <h2 className="font-semibold">Фильтр</h2>
          <IconButton src="./x.svg" onClick={() => setPanelOpen(false)}></IconButton>
        </div>

        {/* Сброс фильтров */}
        <div className="p-4 pt-2">
          <button
            className="text-sm text-content_3"
            onClick={() => {
              setGender(null);
              setSizes([]);
              setSelectedCategories([]);
              setPriceRange([0, 0]);
            }}
          >
            Сбросить всё
          </button>
        </div>
      </div>

      {/* Пол */}
      <div className="pt-4 border-b">
        <h3 className="font-medium mb-4 text-lg mx-4">Пол</h3>
        <div className="flex flex-col">
          <button
            className={`p-4 text-left transition-all duration-300 ${
              gender === "male" ? "bg-content_2" : "bg-main_1"
            }`}
            onClick={() => gender === "male" ? setGender(null) : setGender("male")}
          >
            Мужской
          </button>
          <button
            className={`p-4 text-left transition-all duration-300 ${
              gender === "female" ? "bg-content_2" : "bg-main_1"
            }`}
            onClick={() => gender === "female" ? setGender(null) : setGender("female")}
          >
            Женский
          </button>
        </div>
      </div>

      {/* Размер */}
      <div className="p-4 border-b">
        <h3 className="font-medium mb-4 text-lg">Размер</h3>
        <SizeGrid selectedSizes={sizes} onSizeChange={setSizes} mode="multiple" />
      </div>

      {/* Категории */}
      <div className="p-4 border-b">
         <h3 className=" font-medium text-lg mb-4">Категории</h3>
         <div className="grid grid-cols-subgrid gap-2">
          {categories.map((category) => (
            <div key={category._id} className="flex items-center gap-2">
             <Checkbox  
             className="size-[18px]"   
              checked={selectedCategories.includes(category.slug?.current|| "")}
              onCheckedChange={(checked) =>
                handleCategoryChange(category.slug?.current || "", checked as boolean)}
              />
              <p>{category.name}</p>
            </div>
          ))}
         </div>
      </div>

      {/* Цена */}
      <div className="p-4">
        <h3 className="text-lg font-medium mb-4">Цена</h3>
        <div className="flex items-center gap-4">
          <input
            type="number"
            min="0"
            max={priceRange[1]}
            className="w-20 border p-2"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
          />
          <span>-</span>
          <input
            type="number"
            min="0"
            className="w-20 border p-2"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
          />
        </div>
      </div>

      {/* Кнопка применить */}
      <div className="p-4">
        <Button text="Применить" width="100%" onClick={applyFilters}></Button>
      </div>
    </div>
  );
};

export default FilterPanel;