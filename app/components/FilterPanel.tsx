"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import IconButton from "./IconButton";

interface FilterPanelProps {
  panelOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setPanelOpen: (isOpen: boolean) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ panelOpen, setPanelOpen}) => {
  const router = useRouter();
  const [gender, setGender] = useState<string | null>(null);
  const [sizes, setSizes] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]); // Диапазон цены

  const handleSizeClick = (num: number) => {
    if (sizes.includes(num)) {
      setSizes(sizes.filter((size) => size !== num)); // Удаляем размер, если он уже выбран
    } else {
      setSizes([...sizes, num]); // Добавляем размер, если он не выбран
    }
  };
  const applyFilters = () => {
    const query: Record<string, string> = {};
  
    if (gender) query.gender = gender;
    if (sizes.length > 0) query.sizes = sizes.join(",");
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
      className={`fixed z-20 bg-white top-0 h-screen w-[75%] sm:w-[50%] lg:w-[25%] shadow-lg transition-all duration-500 ${
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
              setPriceRange([0, 0]);
            }}
          >
            Сбросить всё
          </button>
        </div>
      </div>

      {/* Пол */}
      <div className="py-4 border-b">
        <h3 className="font-medium mb-2 mx-4">Пол</h3>
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
        <h3 className=" font-medium mb-2">Размер</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {[31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45].map(
            (num) => (
              <button
                key={num}
                className={`w-full aspect-square p-2 border transition-all duration-300  ${
                  sizes.includes(num) ?  "bg-content_2" : "bg-main_1"
                }`}
                onClick={() => handleSizeClick(num)}
              >
                {num}
              </button>
            )
          )}
        </div>
      </div>

      {/* Цена */}
      <div className="p-4">
        <h3 className="text-md font-medium mb-2">Цена</h3>
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
        {/* <button
          onClick={applyFilters}
          className="w-full bg-blue-500 text-white py-2 "
        >
          Применить
        </button> */}
      </div>
    </div>
  );
};

export default FilterPanel;