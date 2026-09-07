import LayoutPage from '@components/layout/pageLayout/LayoutPage';
import { Button } from '@components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import CartIcon from '@assets/icons/cart.svg?react';
import CartItem from '@components/common/cards/CartItem';
import OrderSummary from '@components/common/cards/OrderSummary';
import { useMemo } from 'react';
import { useProceedToCheckout } from '@hooks/useProceedToCheckout';
import { rateLimit } from '@/utils/rateLimit';
import CartItemSkeleton from '@components/common/cards/CartItemSkeleton';
import CartHeader from '@components/layout/pageComponents/CartHeader';
import { EmptySection } from '@components/common/section/EmptySection';
import ErrorSection from '@components/common/section/ErrorSection';
import {
  useGetCart,
  useRemoveItemFromCart,
  useUpdateCartItemQuantity,
} from '@api/cart/cart.hooks';

const Cart = () => {
  const navigate = useNavigate();
  const canSubmit = useMemo(() => rateLimit(2000), []);

  const { data: cart, isLoading, error: queryError, refetch } = useGetCart();
  const updateQuantityMutation = useUpdateCartItemQuantity();
  const removeItemMutation = useRemoveItemFromCart();

  const items = cart?.items || [];
  const totalPrice = cart?.totalPrice ?? 0;
  const shippingCost = cart?.shippingCost ?? 0;
  const itemsCount = items.length;

  const {
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
    watch,
  } = useProceedToCheckout();

  const agreeToTerms = watch('agreeToTerms');
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleIncrease = (id: number) => {
    const item = items.find(i => i.cartItemId === id);
    if (item) {
      updateQuantityMutation.mutate({
        cartItemId: id,
        quantity: item.quantity + 1,
      });
    }
  };

  const handleDecrease = (id: number) => {
    const item = items.find(i => i.cartItemId === id);
    if (item && item.quantity > 1) {
      updateQuantityMutation.mutate({
        cartItemId: id,
        quantity: item.quantity - 1,
      });
    }
  };

  const handleRemove = (id: number) => {
    removeItemMutation.mutate({ cartItemId: id });
  };

  const handleAgreeToTerms = (value: boolean) => {
    setValue('agreeToTerms', value, { shouldValidate: true });
  };

  const handleProceedToCheckout = handleSubmit(() => {
    if (!canSubmit()) return;
    navigate('/checkout');
  });

  if (isLoading) {
    return (
      <LayoutPage>
        <CartHeader itemsCount={0} />
        <div className="flex flex-col gap-4 mt-8 max-w-4xl mx-auto px-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <CartItemSkeleton key={i} />
          ))}
        </div>
      </LayoutPage>
    );
  }

  if (queryError) {
    return (
      <LayoutPage>
        <CartHeader itemsCount={0} />
        <ErrorSection
          title="Failed to load cart"
          message={queryError.response?.data?.message || queryError.message}
          retryText="Retry"
          onRetry={() => refetch()}
        />
      </LayoutPage>
    );
  }

  if (itemsCount === 0) {
    return (
      <LayoutPage>
        <CartHeader itemsCount={itemsCount} />
        <EmptySection
          title="Cart is empty"
          description="You haven't added any products yet. Browse our collection and find something you love."
          className="flex-1 p-4"
          icon={<CartIcon className="size-4" />}
          action={
            <Button variant="default" asChild>
              <Link to="/catalog">Continue Shopping</Link>
            </Button>
          }
        />
      </LayoutPage>
    );
  }

  const mutationError =
    updateQuantityMutation.error?.response?.data?.message ||
    removeItemMutation.error?.response?.data?.message;

  return (
    <LayoutPage>
      <CartHeader itemsCount={itemsCount} />
      {mutationError && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm [font-family:var(--font-sans)]">
          {mutationError}
        </div>
      )}

      <div className="flex flex-col lg:flex-row items-start gap-8 mt-8">
        <div className="flex flex-col gap-4 flex-1 w-full">
          {items.map(item => (
            <CartItem
              key={item.cartItemId}
              productName={item.productName}
              productImage={item.imageUrl}
              price={item.price}
              discountPrice={item.discountPrice}
              quantity={item.quantity}
              onIncrease={() => handleIncrease(item.cartItemId)}
              onDecrease={() => handleDecrease(item.cartItemId)}
              onRemove={() => handleRemove(item.cartItemId)}
            />
          ))}
        </div>

        <OrderSummary
          totalItems={totalItems}
          totalItemsPrice={totalPrice - shippingCost}
          shippingCost={shippingCost}
          totalCost={totalPrice}
          agreeToTerms={agreeToTerms}
          agreeToTermsError={formErrors.agreeToTerms?.message}
          onAgreeToTermsChange={handleAgreeToTerms}
          handleProceedToCheckout={handleProceedToCheckout}
          loading={
            updateQuantityMutation.isPending || removeItemMutation.isPending
          }
        />
      </div>
    </LayoutPage>
  );
};

export default Cart;
