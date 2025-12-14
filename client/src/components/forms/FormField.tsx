import React, { useId } from 'react';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';
import styles from './forms.module.css';

export interface FormFieldProps {
  /** Label text for the field */
  label: string;
  /** Optional ID (auto-generated if not provided) */
  id?: string;
  /** The form control element (input, select, textarea, etc.) */
  children: React.ReactElement;
  /** Error message to display */
  error?: string;
  /** Helper text to display below the field */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether to hide the label visually (still accessible to screen readers) */
  hideLabel?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
}

/**
 * FormField component - A flexible wrapper for any form control
 * 
 * Features:
 * - Auto-generated unique IDs for proper label association
 * - Integrated label, helper text, and error message
 * - Automatically passes necessary props to child control
 * - Proper ARIA attributes injection
 * - Works with any form control (input, select, textarea, custom components)
 * - Visual and screen reader error states
 * - Required field indicator
 * - Disabled state support
 * 
 * Usage:
 * <FormField label="Email" error={errors.email}>
 *   <input type="email" name="email" />
 * </FormField>
 */
export const FormField = ({
  label,
  id: providedId,
  children,
  error,
  helperText,
  required = false,
  disabled = false,
  hideLabel = false,
  className = '',
}: FormFieldProps) => {
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
    className,
  ].filter(Boolean).join(' ');

  const labelClasses = [
    hideLabel && styles['label--visuallyHidden'],
  ].filter(Boolean).join(' ');

  // Clone the child element and inject necessary props
  const childWithProps = React.cloneElement(children, {
    id,
    'aria-invalid': hasError,
    'aria-describedby': describedBy || undefined,
    'aria-required': required,
    disabled,
    // Preserve any existing props from the child
    ...children.props,
  });

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

      {childWithProps}

      {helperText && !hasError && (
        <p id={helperId} className={styles.helperText}>
          {helperText}
        </p>
      )}

      <ErrorMessage id={errorId} message={error} />
    </div>
  );
};

FormField.displayName = 'FormField';
