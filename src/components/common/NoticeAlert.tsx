import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  X,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const noticeVariants = cva(
  'flex items-start justify-between rounded-lg border px-4 py-3 text-sm animate-in fade-in duration-200 gap-3',
  {
    variants: {
      variant: {
        success:
          'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
        error:
          'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
        warning:
          'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
      },
    },
    defaultVariants: {
      variant: 'error',
    },
  }
);

export type NoticeVariant = NonNullable<
  VariantProps<typeof noticeVariants>['variant']
>;

const variantMeta: Record<
  NoticeVariant,
  {
    icon: LucideIcon;
    iconClassName: string;
    dismissClassName: string;
  }
> = {
  success: {
    icon: CheckCircle2,
    iconClassName: 'text-emerald-600 dark:text-emerald-400',
    dismissClassName:
      'text-emerald-700 hover:text-emerald-900 dark:text-emerald-400',
  },
  error: {
    icon: AlertCircle,
    iconClassName: 'text-rose-600 dark:text-rose-400',
    dismissClassName: 'text-rose-700 hover:text-rose-900 dark:text-rose-400',
  },
  warning: {
    icon: AlertTriangle,
    iconClassName: 'text-amber-600 dark:text-amber-400',
    dismissClassName: 'text-amber-700 hover:text-amber-900 dark:text-amber-400',
  },
  info: {
    icon: Info,
    iconClassName: 'text-blue-600 dark:text-blue-400',
    dismissClassName: 'text-blue-700 hover:text-blue-900 dark:text-blue-400',
  },
};

export interface NoticeAlertProps
  extends React.ComponentProps<'div'>, VariantProps<typeof noticeVariants> {
  message?: React.ReactNode;
  title?: string;
  onDismiss?: () => void;
  action?: React.ReactNode;
}

export function NoticeAlert({
  variant = 'error',
  message,
  children,
  title,
  onDismiss,
  action,
  className,
  ...props
}: NoticeAlertProps) {
  const content = children ?? message;
  if (!content && !title) return null;

  const currentVariant = variant || 'error';
  const meta = variantMeta[currentVariant];
  const Icon = meta.icon;

  return (
    <div
      role={currentVariant === 'error' ? 'alert' : 'status'}
      className={cn(noticeVariants({ variant: currentVariant }), className)}
      {...props}
    >
      <div className="flex items-start gap-2.5 flex-1 min-w-0">
        <Icon
          className={cn('size-4 shrink-0 mt-0.5', meta.iconClassName)}
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0">
          {title && <p className="font-semibold leading-tight">{title}</p>}
          {content && (
            <div
              className={title ? 'text-xs mt-1 text-inherit/90' : 'font-medium'}
            >
              {content}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 self-start">
        {action}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className={cn(
              'cursor-pointer p-1 rounded-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors',
              meta.dismissClassName
            )}
            aria-label="Dismiss notice"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default NoticeAlert;
