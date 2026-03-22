import React from 'react';

interface Props {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}

const FilterSidebar: React.FC<Props> = ({ selectedCategories, onChange }) => {
  const filters = [
    { id: 'electronics', label: 'Electronics' },
    { id: "men's clothing", label: "Men's Clothing" },
    { id: "women's clothing", label: "Women's Clothing" }
  ];

  const handleToggle = (id: string) => {
    if (selectedCategories.includes(id)) {
      onChange(selectedCategories.filter(c => c !== id));
    } else {
      onChange([...selectedCategories, id]);
    }
  };

  return (
    <div className="w-64 h-fit bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-xl shadow-lg border border-orange-500/20">
        <h2 className="text-lg font-semibold text-orange-400 mb-4">
          Categories
        </h2>
        <div className="space-y-3">
          {filters.map(filter => (
            <label key={filter.id} className="flex items-center gap-2 transition-all duration-200 hover:text-orange-400 cursor-pointer text-gray-300">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(filter.id)}
                  onChange={() => handleToggle(filter.id)}
                  className="accent-orange-500 scale-110 cursor-pointer"
                />
              <span>
                {filter.label}
              </span>
            </label>
          ))}
        </div>
      </div>
  );
};

export default FilterSidebar;
