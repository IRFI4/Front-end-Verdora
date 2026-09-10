import React from 'react';
import DialogComponent from '@components/common/dialog/DialogComponent';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Package, FolderOpen, DollarSign, Tag, Pencil } from 'lucide-react';
import type { Product } from '@/types/product';
import { formatCurrency } from '@/utils/order.utils';

type ProductDetailsDialogProps = {
  product: Product | null;
  categoryName: string;
  onClose: () => void;
  onEdit: (product: Product) => void;
};

export const ProductDetailsDialog: React.FC<ProductDetailsDialogProps> = ({
  product,
  categoryName,
  onClose,
  onEdit,
}) => {
  return (
    <DialogComponent
      open={!!product}
      onOpenChange={open => {
        if (!open) onClose();
      }}
      headerTitle={product?.name || 'Product Details'}
      headerDescription={`Product ID: #${product?.productId}`}
      contentClassName="sm:max-w-xl"
      cancelText="Close"
    >
      {product && (
        <div className="space-y-4 py-2">
          <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start p-4 rounded-lg bg-muted/40 border border-border">
            <div className="size-24 rounded-lg border border-border bg-background overflow-hidden flex items-center justify-center shrink-0">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="size-full object-cover"
                />
              ) : (
                <Package className="size-10 text-muted-foreground/60" />
              )}
            </div>
            <div className="space-y-1.5 flex-1 min-w-0 text-center sm:text-left">
              <h4 className="font-semibold text-base text-foreground">
                {product.name}
              </h4>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge variant="secondary" className="text-xs">
                  <FolderOpen className="size-3 mr-1" />
                  {categoryName}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground pt-1">
                {product.description || 'No description provided.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded-md bg-card border border-border space-y-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <DollarSign className="size-3.5" /> Base Price
              </span>
              <p className="font-semibold text-base">
                {formatCurrency(product.price)}
              </p>
            </div>

            <div className="p-3 rounded-md bg-card border border-border space-y-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Tag className="size-3.5" /> Discount Price
              </span>
              <p className="font-semibold text-base text-emerald-600 dark:text-emerald-400">
                {product.discountPrice && product.discountPrice > 0
                  ? formatCurrency(product.discountPrice)
                  : 'None'}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const prod = product;
                onClose();
                onEdit(prod);
              }}
              className="cursor-pointer"
            >
              <Pencil className="size-3.5 mr-1" />
              Edit Product
            </Button>
          </div>
        </div>
      )}
    </DialogComponent>
  );
};

export default ProductDetailsDialog;
