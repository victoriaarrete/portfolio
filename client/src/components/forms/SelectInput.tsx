import React, { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';
import styles from './forms.module.css';

export interface SelectOption {
  /** The value of the option */
  value: string;
  /** The display text for the option */
  label: string;
  /** Whether the option is disabled */
  disabled?: boolean;
}

export interface SelectInputProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  /** Label text for the select */
  label: string;
  /** Optional ID (auto-generated if not provided) */
  id?: string;
  /** Array of options to display */
  options: SelectOption[];
  /** Placeholder option text */
  placeholder?: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display below the select */
  helperText?: string;
  /** Whether to hide the label visually (still accessible to screen readers) */
  hideLabel?: boolean;
  /** Additional CSS classes for the container */
  containerClassName?: string;
  /** Additional CSS classes for the select */
  selectClassName?: string;
}

/**
 * SelectInput component with full accessibility support
 * 
 * Features:
 * - Auto-generated unique IDs for proper label association
 * - Integrated label, select, helper text, and error message
 * - Proper ARIA attributes (aria-invalid, aria-describedby, aria-required)
 * - Visual and screen reader error states
 * - Required field indicator
 * - Disabled state support (both for the select and individual options)
 * - Keyboard accessible (arrow keys, enter, space)
 * - Custom styled dropdown with icon
 * - Placeholder option handling
 */
export const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
  (
    {
      label,
      id: providedId,
      options,
      placeholder,
      error,
      helperText,
      hideLabel = false,
      required = false,
      disabled = false,
      containerClassName = '',
      selectClassName = '',
      className,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const id = providedId || autoId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    const hasError = Boolean(error);

    // Build aria-describedby based on what's present
    const describedBy = [
      helperText && helperId,
      error && errorId,
    ].filter(Boolean).join(' ');

    const containerClasses = [
      styles.formField,
      hasError && styles['formField--error'],
      disabled && styles['formField--disabled'],
      containerClassName,
    ].filter(Boolean).join(' ');

    const selectWrapperClasses = [
      styles.selectWrapper,
      hasError && styles['selectWrapper--error'],
    ].filter(Boolean).join(' ');

    const selectClasses = [
      styles.select,
      hasError && styles['select--error'],
      selectClassName,
      className,
    ].filter(Boolean).join(' ');

    const labelClasses = [
      hideLabel && styles['label--visuallyHidden'],
    ].filter(Boolean).join(' ');

    return (
      <div className={containerClasses}>
        <Label
          htmlFor={id}
          required={required}
          error={hasError}
          className={labelClasses}
        >
          {label}
        </Label>

        <div className={selectWrapperClasses}>
          <select
            ref={ref}
            id={id}
            className={selectClasses}
            aria-invalid={hasError}
            aria-describedby={describedBy || undefined}
            aria-required={required}
            disabled={disabled}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown 
            className={styles.selectWrapper__icon} 
            aria-hidden="true"
          />
        </div>

        {helperText && !hasError && (
          <p id={helperId} className={styles.helperText}>
            {helperText}
          </p>
        )}

        <ErrorMessage id={errorId} message={error} />
      </div>
    );
  }
);

SelectInput.displayName = 'SelectInput';
