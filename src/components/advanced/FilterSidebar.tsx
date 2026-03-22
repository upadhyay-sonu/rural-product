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
    <div className="w-64 h-fit bg-gradient-to-br from-[#1e293b] to-[#020617] p-6 rounded-xl shadow-xl border border-white/10 backdrop-blur-md transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(251,146,60,0.2)] hover:scale-[1.02]">
        <h2 className="text-xl font-bold text-orange-400 mb-6 tracking-wide drop-shadow-sm flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
          Categories
        </h2>
        <div className="space-y-4">
          {filters.map(filter => (
            <label key={filter.id} className="flex items-center gap-3 transition-all duration-300 hover:text-orange-400 cursor-pointer text-gray-300 group">
                <div className="relative flex items-center justify-center w-5 h-5 rounded border border-gray-500 group-hover:border-orange-400 transition-colors duration-300 overflow-hidden bg-[#0f172a]">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(filter.id)}
                    onChange={() => handleToggle(filter.id)}
                    className="absolute opacity-0 w-full h-full cursor-pointer z-10"
                  />
                  {selectedCategories.includes(filter.id) && (
                    <svg className="w-3.5 h-3.5 text-orange-500 pointer-events-none drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  )}
                </div>
              <span className="font-medium tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                {filter.label}
              </span>
            </label>
          ))}
        </div>
      </div>
  );
};

export default FilterSidebar;
