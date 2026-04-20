import type { TextFieldType } from '@/types/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@components/ui/input-group';
import type React from 'react';
import { Field, FieldDescription, FieldLabel } from '@components/ui/field';
import { cn } from '@/lib/utils';

type Props = {
  type: TextFieldType;
  label?: string;
  labelRight?: React.ReactNode;
  id?: string;
  description?: string;
  placeholder?: string;
  value: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
  onChange: (value: string) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
};

const TextField = ({
  type,
  label,
  labelRight,
  id,
  description,
  placeholder,
  value,
  error,
  className,
  inputClassName,
  labelClassName,
  containerClassName,
  onChange,
  leftIcon,
  rightIcon,
  onRightIconClick,
}: Props) => {
  return (
    <Field className={className}>
      {(label || labelRight) && (
        <div className="flex items-center justify-between">
          {label && (
            <FieldLabel
              className={cn(
                'text-[14px] font-medium text-[var(--text-h)]',
                labelClassName
              )}
              htmlFor={id}
            >
              {label}
            </FieldLabel>
          )}
          {labelRight}
        </div>
      )}
      <InputGroup
        className={cn(
          `h-[50px] w-full rounded-[12px] border bg-[var(--block-bg)]
          border-2 border-zinc-300
          has-[[data-slot=input-group-control]:focus-visible]:border-[var(--accent)]
          has-[[data-slot=input-group-control]:focus-visible]:ring-0`,
          error && 'border-red-500 focus-within:ring-red-500',
          containerClassName
        )}
      >
        <InputGroupInput
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={cn(
            `h-full w-full bg-transparent pl-16 pr-16
            text-[16px] text-[var(--text-h)]
            placeholder:text-[16px] placeholder:[font-family:var(--font-sans)] placeholder:text-[var(--text-muted)]`,
            error && 'placeholder:text-red-400',
            inputClassName
          )}
        />
        {leftIcon && <InputGroupAddon>{leftIcon}</InputGroupAddon>}
        {rightIcon && (
          <InputGroupAddon
            align="inline-end"
            onClick={onRightIconClick}
            className={onRightIconClick ? 'cursor-pointer' : ''}
          >
            {rightIcon}
          </InputGroupAddon>
        )}
      </InputGroup>
      {description && <FieldDescription>{description}</FieldDescription>}
      {error && (
        <FieldDescription className="text-red-500">{error}</FieldDescription>
      )}
    </Field>
  );
};

export default TextField;
