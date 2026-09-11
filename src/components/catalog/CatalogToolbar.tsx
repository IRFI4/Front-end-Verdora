import { LayoutGrid, List } from 'lucide-react';

export type ViewMode = 'grid' | 'list';

type Props = {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  selectedSort?: string;
  onSortChange?: (sortId: string) => void;
};

const SORT_OPTIONS = [
  { id: 'rating', label: 'Rating' },
  { id: 'price-asc', label: 'Price ↑' },
  { id: 'price-desc', label: 'Price ↓' },
  { id: 'date', label: 'Newest' },
  { id: 'az', label: 'A–Z' },
  { id: 'za', label: 'Z–A' },
];

const CatalogToolbar = ({
  viewMode,
  onViewModeChange,
  selectedSort = 'rating',
  onSortChange,
}: Props) => {
  return (
    <div className="bg-[#fcfdfb] border border-border rounded-xl p-3 sm:p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
      <div className="flex items-center gap-2.5 flex-wrap">
        <span className="text-sm font-medium text-text shrink-0">Sort by</span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {SORT_OPTIONS.map(sort => {
            const isActive = selectedSort === sort.id;
            return (
              <button
                key={sort.id}
                type="button"
                onClick={() => onSortChange?.(sort.id)}
                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                    : 'bg-background text-text border-border hover:bg-muted/70 hover:text-text-h'
                }`}
              >
                {sort.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-1 bg-background border border-border rounded-lg p-1 self-end md:self-auto shrink-0">
        <button
          type="button"
          onClick={() => onViewModeChange('grid')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium cursor-pointer transition-all ${
            viewMode === 'grid'
              ? 'bg-secondary text-secondary-foreground shadow-xs'
              : 'text-text hover:text-text-h'
          }`}
          aria-label="Grid view"
        >
          <LayoutGrid className="size-4" />
          <span>Grid</span>
        </button>

        <button
          type="button"
          onClick={() => onViewModeChange('list')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium cursor-pointer transition-all ${
            viewMode === 'list'
              ? 'bg-secondary text-secondary-foreground shadow-xs'
              : 'text-text hover:text-text-h'
          }`}
          aria-label="List view"
        >
          <List className="size-4" />
          <span>List</span>
        </button>
      </div>
    </div>
  );
};

export default CatalogToolbar;
