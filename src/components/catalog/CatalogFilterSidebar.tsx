import { RotateCcw } from 'lucide-react';
import { Slider } from '@components/ui/slider';
import { Checkbox } from '@components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

type Props = {
  onResetAll?: () => void;
};

const SAMPLE_CATEGORIES = [
  { id: 1, name: 'Planting material', count: 6 },
  { id: 2, name: 'Tools', count: 4 },
  { id: 3, name: 'Equipment', count: 4 },
  { id: 4, name: 'Protective products', count: 3 },
  { id: 5, name: 'Pots & Planters', count: 3 },
  { id: 6, name: 'Fertilizer', count: 2 },
];

const CatalogFilterSidebar = ({ onResetAll }: Props) => {
  return (
    <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-24">
      <ScrollArea className="w-full rounded-xl border border-border bg-[#fcfdfb] shadow-xs max-h-[calc(100dvh-7rem)]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-[#fcfdfb] sticky top-0 z-10">
          <span className="font-heading font-semibold text-text-h text-base">
            Filters
          </span>
          <button
            type="button"
            onClick={onResetAll}
            className="text-xs text-text hover:text-primary flex items-center gap-1 underline underline-offset-3 cursor-pointer transition-colors"
          >
            <RotateCcw className="size-3" />
            <span>Reset all</span>
          </button>
        </div>
        <div className="p-5 border-b border-border space-y-3.5">
          <div className="text-[11px] font-semibold tracking-wider uppercase text-text">
            Price range, ₴
          </div>
          <div className="flex items-center gap-2.5">
            <input
              type="number"
              placeholder="0"
              defaultValue="0"
              className="w-full rounded-md border border-border bg-white px-3 py-1.5 text-sm text-text-h [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
            />
            <span className="text-text-muted">—</span>
            <input
              type="number"
              placeholder="9000"
              defaultValue="9000"
              className="w-full rounded-md border border-border bg-white px-3 py-1.5 text-sm text-text-h [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
            />
          </div>
          <Slider
            defaultValue={[0, 9000]}
            max={9000}
            step={100}
            className="mx-auto w-full max-w-xs cursor-pointer"
          />
          <div className="flex items-center justify-between text-xs text-text">
            <span>0 ₴</span>
            <span>9000 ₴</span>
          </div>
        </div>

        <div className="p-5 border-b border-border space-y-3">
          <div className="text-[11px] font-semibold tracking-wider uppercase text-text">
            Category
          </div>
          <div className="flex flex-col gap-1.5">
            {SAMPLE_CATEGORIES.map(category => (
              <label
                key={category.id}
                className="flex items-center gap-2.5 py-1.5 px-2 rounded-md hover:bg-muted/60 cursor-pointer text-sm transition-colors group"
              >
                <Checkbox id={`cat-${category.id}`} />
                <span className="flex-1 text-text group-hover:text-text-h select-none">
                  {category.name}
                </span>
                <span className="text-xs text-text-muted">
                  {category.count}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="p-5 space-y-3">
          <div className="text-[11px] font-semibold tracking-wider uppercase text-text">
            Offers
          </div>
          <label className="flex items-center gap-2.5 py-1.5 px-2 rounded-md hover:bg-muted/60 cursor-pointer text-sm transition-colors group">
            <Checkbox id="offer-sale" />
            <span className="flex-1 text-text group-hover:text-text-h select-none">
              On sale only
            </span>
            <span className="text-[11px] font-semibold text-white bg-[#FA1105] rounded px-1.5 py-0.5 leading-none">
              %
            </span>
          </label>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default CatalogFilterSidebar;
