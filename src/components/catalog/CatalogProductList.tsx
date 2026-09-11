import type { ViewMode } from './CatalogToolbar';
import CatalogProductCard, { type CatalogProduct } from './CatalogProductCard';

type Props = {
  viewMode: ViewMode;
  onToggleFavorite?: (id: number) => void;
  onAddToCart?: (id: number) => void;
};

const PLACEHOLDER_ITEMS: CatalogProduct[] = [
  {
    id: 1,
    name: 'Monstera Deliciosa',
    category: 'Planting material',
    price: 2400,
    oldPrice: 2990,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/2/2e/Monstera_deliciosa2.jpg',
  },
  {
    id: 2,
    name: 'Spider Plant seedling',
    category: 'Planting material',
    price: 420,
    oldPrice: 560,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/3a/Spiderplant1.jpg',
  },
  {
    id: 3,
    name: 'Areca Palm, 90 cm',
    category: 'Planting material',
    price: 3200,
    oldPrice: 3800,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/2/22/%E6%95%A3%E5%B0%BE%E8%91%B5Dypsis_lutescens_20210511145013_05.jpg',
  },
  {
    id: 4,
    name: 'Rubber Plant (Ficus elastica)',
    category: 'Planting material',
    price: 1609,
    oldPrice: 2000,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/1/16/Ficus_elastica_leaves_02.JPG',
  },
  {
    id: 5,
    name: "Snake Plant 'Laurentii'",
    category: 'Planting material',
    price: 1350,
    oldPrice: 1700,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/f/fb/Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg',
  },
  {
    id: 6,
    name: 'Sweet Briar Rose bush',
    category: 'Planting material',
    price: 690,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/e/e6/Rosa_rubiginosa_1.jpg',
  },
];

const CatalogProductList = ({
  viewMode,
  onToggleFavorite,
  onAddToCart,
}: Props) => {
  const isGrid = viewMode === 'grid';

  return (
    <div
      className={
        isGrid
          ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
          : 'flex flex-col gap-4'
      }
    >
      {PLACEHOLDER_ITEMS.map(product => (
        <CatalogProductCard
          key={product.id}
          product={product}
          viewMode={viewMode}
          onToggleFavorite={onToggleFavorite}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default CatalogProductList;
