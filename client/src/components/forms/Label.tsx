import React from 'react';
import styles from './forms.module.css';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** The form field this label is associated with */
  htmlFor: string;
  /** Whether the field is required */
  required?: boolean;
  /** Optional text to display for required fields */
  requiredText?: string;
  /** Whether the field has an error */
  error?: boolean;
  /** Additional CSS classes */
  className?: string;
  children: React.ReactNode;
}

/**
 * Label component with full accessibility support
 * 
 * Features:
 * - Properly associates with form controls via htmlFor
 * - Visual indicator for required fields
 * - Error state styling
 * - Screen reader friendly
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    { 
      htmlFor, 
      required = false, 
      requiredText = '(required)',
      error = false,
      className = '',
      children,
      ...props 
    }, 
    ref
  ) => {
    const labelClasses = [
      styles.label,
      error && styles['label--error'],
      className,
    ].filter(Boolean).join(' ');

    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={labelClasses}
        {...props}
      >
        {children}
        {required && (
          <span className={styles.label__required} aria-label="required">
            {' '}*{' '}
            <span className={styles['label__required-text']}>
              {requiredText}
            </span>
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';
