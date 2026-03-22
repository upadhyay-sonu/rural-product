import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SortDropdown: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex items-center space-x-3">
      <span className="text-gray-400 mr-2">Sort by:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-900 text-white border border-orange-400/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 hover:border-orange-400 transition-all duration-200"
      >
        <option value="rating_desc">Best Rating (Default)</option>
        <option value="price_asc">Price: Low → High</option>
        <option value="price_desc">Price: High → Low</option>
        <option value="newest">Newest First</option>
      </select>
    </div>
  );
};

export default SortDropdown;
