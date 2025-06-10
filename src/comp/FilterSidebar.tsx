import { useState } from "react";
// import { ChevronDown, ChevronUp, X } from "lucide-react";

interface FilterSection {
  title: string;
  options: string[];
}

const filterSections: FilterSection[] = [
  {
    title: "Categories",
    options: [
      "Electronics",
      "Fashion",
      "Home & Garden",
      "Sports",
      "Books",
      "Beauty",
    ],
  },
  {
    title: "Brands",
    options: ["Apple", "Samsung", "Nike", "Adidas", "Sony", "Canon"],
  },
  {
    title: "Rating",
    options: ["4+ Stars", "3+ Stars", "2+ Stars", "1+ Stars"],
  },
];

const FilterSidebar: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["Categories"])
  );
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleSection = (title: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedSections(newExpanded);
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    setPriceRange([0, 500]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 p-6 sticky top-24 h-fit transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Filters
        </h3>
        {selectedFilters.length > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Active Filters */}
      {selectedFilters.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Active Filters
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filter) => (
              <span
                key={filter}
                className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full"
              >
                {filter}
                <button
                  onClick={() => toggleFilter(filter)}
                  className="ml-2 hover:text-blue-900 dark:hover:text-blue-200"
                >
                  {/* <X className="h-3 w-3" /> */}
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Price Range
        </h4>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([parseInt(e.target.value), priceRange[1]])
              }
              className="w-20 px-2 py-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Min"
            />
            <span className="text-gray-400 dark:text-gray-500">-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
              className="w-20 px-2 py-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* Filter Sections */}
      {filterSections.map((section) => (
        <div key={section.title} className="mb-6 last:mb-0">
          <button
            onClick={() => toggleSection(section.title)}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {section.title}
            </h4>
            {/* {expandedSections.has(section.title) ? (
              <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            )} */}
          </button>

          {expandedSections.has(section.title) && (
            <div className="space-y-2">
              {section.options.map((option) => (
                <label
                  key={option}
                  className="flex items-center cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(option)}
                    onChange={() => toggleFilter(option)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 border-2 rounded mr-3 flex items-center justify-center transition-colors duration-200 ${
                      selectedFilters.includes(option)
                        ? "bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500"
                        : "border-gray-300 dark:border-gray-600 group-hover:border-blue-400 dark:group-hover:border-blue-500"
                    }`}
                  >
                    {selectedFilters.includes(option) && (
                      <svg
                        className="w-2 h-2 text-white\"
                        fill="currentColor\"
                        viewBox="0 0 20 20"
                      >
                        {/* <path
                          fillRule="evenodd\"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z\"
                          clipRule="evenodd"
                        /> */}
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Apply Filters Button */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 mt-6">
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
