import { useParams, Link } from 'react-router-dom';
import LayoutPage from '@components/layout/pageLayout/LayoutPage';
import Breadcrumbs from '@components/common/Breadcrumbs';
import { useGetProductById } from '@api/product/product.hooks';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@components/ui/button';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const isValidId = Number.isInteger(productId) && productId > 0;

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductById(productId, isValidId);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/catalog' },
    { label: product?.name || (isValidId ? `Product #${id}` : 'Product') },
  ];

  return (
    <LayoutPage>
      <div className="w-full max-w-5xl mx-auto py-6 px-4 space-y-6">
        <Breadcrumbs items={breadcrumbItems} />

        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to catalog</span>
        </Link>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12 border border-border rounded-[22px] bg-card">
            <Loader2 className="size-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-text-muted">Loading product #{id}...</p>
          </div>
        ) : isError || !isValidId ? (
          <div className="flex flex-col items-center justify-center p-12 text-center border border-border rounded-[22px] bg-card space-y-3">
            <div className="size-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <AlertCircle className="size-6" />
            </div>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Product not found
            </h2>
            <p className="text-sm text-text-muted">
              Product with ID #{id} could not be loaded.
            </p>
            <Button asChild variant="outline" size="sm">
              <Link to="/catalog">Back to Catalog</Link>
            </Button>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-[22px] p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
              <span>Product ID:</span>
              <span className="font-mono text-foreground bg-muted px-2 py-0.5 rounded-md">
                {product?.productId ?? id}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground">
              {product?.name}
            </h1>

            {product?.description && (
              <p className="text-sm text-text max-w-2xl">
                {product.description}
              </p>
            )}

            {product?.price !== undefined && (
              <div className="pt-2 text-xl font-bold text-foreground">
                {product.discountPrice ?? product.price}₴
              </div>
            )}
          </div>
        )}
      </div>
    </LayoutPage>
  );
};

export default ProductDetails;
