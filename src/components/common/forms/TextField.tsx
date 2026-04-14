import type { TextFieldType } from '@/types/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@components/ui/input-group';
import type React from 'react';
import { Field, FieldDescription, FieldLabel } from '@components/ui/field';

type Props = {
  type: TextFieldType;
  label?: string;
  description?: string;
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
};

const TextField = ({
  type,
  label,
  description,
  placeholder,
  value,
  error,
  onChange,
  leftIcon,
  rightIcon,
  onRightIconClick,
}: Props) => {
  return (
    <Field>
      {label && <FieldLabel className="text-sm">{label}</FieldLabel>}
      <InputGroup>
        <InputGroupInput
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`
                border transition
                ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
            `}
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
