import React, { useId } from 'react';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';
import styles from './forms.module.css';

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  /** Label text for the input */
  label: string;
  /** Optional ID (auto-generated if not provided) */
  id?: string;
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number';
  /** Error message to display */
  error?: string;
  /** Helper text to display below the input */
  helperText?: string;
  /** Whether to hide the label visually (still accessible to screen readers) */
  hideLabel?: boolean;
  /** Additional CSS classes for the container */
  containerClassName?: string;
  /** Additional CSS classes for the input */
  inputClassName?: string;
}

/**
 * TextInput component with full accessibility support
 * 
 * Features:
 * - Auto-generated unique IDs for proper label association
 * - Integrated label, input, helper text, and error message
 * - Proper ARIA attributes (aria-invalid, aria-describedby, aria-required)
 * - Visual and screen reader error states
 * - Required field indicator
 * - Disabled state support
 * - Keyboard accessible
 * - Screen reader friendly helper text
 */
export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      id: providedId,
      type = 'text',
      error,
      helperText,
      hideLabel = false,
      required = false,
      disabled = false,
      containerClassName = '',
      inputClassName = '',
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

    const inputClasses = [
      styles.input,
      hasError && styles['input--error'],
      inputClassName,
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

        <input
          ref={ref}
          id={id}
          type={type}
          className={inputClasses}
          aria-invalid={hasError}
          aria-describedby={describedBy || undefined}
          aria-required={required}
          disabled={disabled}
          {...props}
        />

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

TextInput.displayName = 'TextInput';
