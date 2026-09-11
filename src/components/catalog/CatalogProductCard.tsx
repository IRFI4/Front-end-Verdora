import { useState } from 'react';
import { Card } from '@components/ui/card';
import { Heart } from 'lucide-react';
import type { ViewMode } from './CatalogToolbar';

export type CatalogProduct = {
  id: number;
  name: string;
  category?: string;
  price: number;
  oldPrice?: number;
  imageUrl?: string;
  rating?: number;
};

type Props = {
  product: CatalogProduct;
  viewMode?: ViewMode;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
  onAddToCart?: (id: number) => void;
};

export const CatalogProductCard = ({
  product,
  viewMode = 'grid',
  isFavorite = false,
  onToggleFavorite,
  onAddToCart,
}: Props) => {
  const [internalFav, setInternalFav] = useState(isFavorite);
  const isGrid = viewMode === 'grid';
  const hasDiscount = Boolean(
    product.oldPrice && product.oldPrice > product.price
  );

  const handleToggleFavorite = () => {
    setInternalFav(prev => !prev);
    onToggleFavorite?.(product.id);
  };

  const handleAddToCart = () => {
    onAddToCart?.(product.id);
  };

  return (
    <Card
      className={`border border-border bg-[#fcfdfb] rounded-[22px] overflow-hidden p-4 shadow-xs hover:shadow-md transition-all duration-200 ${
        isGrid
          ? 'flex flex-col gap-3.5'
          : 'flex flex-col sm:flex-row items-center gap-5'
      }`}
    >
      <div
        className={`flex items-start justify-between gap-3 w-full ${
          !isGrid ? 'order-2 flex-1' : ''
        }`}
      >
        <h3 className="font-heading font-medium text-[16px] leading-[1.3] text-[#0C0C0C] tracking-tight line-clamp-2 flex-1 min-w-0">
          {product.name}
        </h3>

        <div className="flex items-center gap-2.5 shrink-0">
          {/* Wishlist / Favorite Button */}
          <button
            type="button"
            onClick={handleToggleFavorite}
            className={`size-9 rounded-full border flex items-center justify-center cursor-pointer transition-colors bg-white ${
              internalFav
                ? 'border-[#FA1105]/40 text-[#FA1105]'
                : 'border-[#D9DEDB] text-[#0C0C0C] hover:border-zinc-400'
            }`}
            aria-label="Add to favourites"
          >
            <Heart
              className={`size-4 stroke-[1.6] ${
                internalFav ? 'fill-[#FA1105]' : ''
              }`}
            />
          </button>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="size-9 rounded-full bg-[#3E8D35] hover:bg-[#34782c] text-white flex items-center justify-center cursor-pointer transition-colors shadow-xs"
            aria-label="Add to cart"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 8V6.5A3 3 0 0 1 15 6.5V8" />
              <path d="M4 8h16l-1.3 10.2a2 2 0 0 1-2 1.8H7.3a2 2 0 0 1-2-1.8L4 8Z" />
              <path d="M10 12v3M14 12v3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Image Area with Price Overlay */}
      <div
        className={`relative w-full rounded-[14px] overflow-hidden bg-[#F2F3F0] flex items-center justify-center shrink-0 ${
          isGrid ? 'h-52 sm:h-56' : 'h-48 sm:w-64 sm:h-44 order-1'
        }`}
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-text-muted text-xs font-medium">
            Product Image
          </div>
        )}

        {/* Price Badges placed directly on the image */}
        <div className="absolute left-3.5 bottom-3.5 flex items-center gap-1.5 z-10">
          <span
            className={`font-heading text-[15px] font-bold px-3 py-1 rounded-[7px] leading-tight tracking-tight shadow-xs ${
              hasDiscount
                ? 'bg-[#FA1105] text-white'
                : 'bg-[#D9DEDB] text-[#0C0C0C]'
            }`}
          >
            {product.price}₴
          </span>

          {hasDiscount && (
            <span className="font-heading text-[12px] font-medium px-2.5 py-1 rounded-[7px] line-through leading-tight text-white bg-[#4C5C4A] shadow-xs">
              {product.oldPrice}₴
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CatalogProductCard;
