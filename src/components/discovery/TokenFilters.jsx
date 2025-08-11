import React from 'react';
import { ChevronDown, TrendingUp, BarChart3, Grid, List } from 'lucide-react';

const TokenFilters = ({
  categories,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange
}) => {
  const sortOptions = [
    { value: 'trending', label: 'Trending', icon: TrendingUp },
    { value: 'price', label: 'Price', icon: BarChart3 },
    { value: 'change', label: '24h Change', icon: TrendingUp },
    { value: 'volume', label: 'Volume', icon: BarChart3 },
    { value: 'marketcap', label: 'Market Cap', icon: BarChart3 },
  ];

  return (
    <div className="token-filters">
      {/* Category Filter */}
      <div className="filter-group">
        <label className="filter-label">Category</label>
        <div className="category-pills">
          {categories.map(category => (
            <button
              key={category}
              className={`category-pill ${activeCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              {category === 'all' ? 'All Categories' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="filter-group">
        <label className="filter-label">Sort By</label>
        <div className="sort-dropdown">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-select"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="dropdown-icon" size={16} />
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="filter-group">
        <label className="filter-label">View</label>
        <div className="view-toggle">
          <button
            className={`view-option ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => onViewModeChange('grid')}
            title="Grid View"
          >
            <Grid size={16} />
          </button>
          <button
            className={`view-option ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => onViewModeChange('list')}
            title="List View"
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenFilters;