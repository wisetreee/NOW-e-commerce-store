"use client";

interface SizeGridProps {
  selectedSizes: number[] ; // массив размеров
  onSizeChange: (sizes:  number[] ) => void; // Функция для обновления выбранных размеров
  mode?: "single" | "multiple"; // Режим работы: один размер или несколько
  availableSizes?: number[];
}


const SizeGrid: React.FC<SizeGridProps> = ({
  selectedSizes,
  onSizeChange,
  mode = "single", // По умолчанию режим "single"
  availableSizes = []
}) => {
  // Список всех размеров
  const sizes = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

  // Обработчик выбора размера
  const handleSizeClick = (size: number) => {
    

    if (mode === "single") {
      // Режим выбора одного размера
      if (!availableSizes.includes(size)) return;     
      onSizeChange(selectedSizes.includes(size) ? [] : [size]);
    } else {
      // Режим выбора нескольких размеров
      const currentSizes = Array.isArray(selectedSizes) ? selectedSizes : [];
      const updatedSizes = currentSizes.includes(size)
        ? currentSizes.filter((s) => s !== size) // Удаляем размер, если он уже выбран
        : [...currentSizes, size]; // Добавляем размер, если он не выбран
      onSizeChange(updatedSizes);
    }
  };

   return (
    <div className="grid grid-cols-[repeat(auto-fill,3rem)] auto-rows-[3rem] gap-2">
      {sizes.map((size) => {
        const isAvailable = availableSizes.includes(size);
        const isSelected = selectedSizes.includes(size);

        return (
          <button
            key={size}
            className={`p-2 border transition duration-300 
              ${isAvailable || mode=="multiple" ? (isSelected ? "bg-content_2 " : "bg-main_1") : "bg-main_1 text-content_3 cursor-not-allowed"}`}
            onClick={() => handleSizeClick(size)}
            disabled={!isAvailable && mode!="multiple"}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
};

export default SizeGrid;
