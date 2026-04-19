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
            <FieldLabel className={cn('text-sm', labelClassName)}>
              {label}
            </FieldLabel>
          )}
          {labelRight}
        </div>
      )}
      <InputGroup
        className={cn(
          'h-[50px] rounded-[12px] bg-[var(--block-bg)] border border-zinc-300 transition focus-within:ring-2 focus-within:ring-[var(--accent)]',
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
            'h-full px-16 text-[16px] focus:outline-none',
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
