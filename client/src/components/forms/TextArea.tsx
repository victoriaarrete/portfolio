import React, { useId } from 'react';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';
import styles from './forms.module.css';

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  /** Label text for the textarea */
  label: string;
  /** Optional ID (auto-generated if not provided) */
  id?: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display below the textarea */
  helperText?: string;
  /** Whether to hide the label visually (still accessible to screen readers) */
  hideLabel?: boolean;
  /** Number of visible text lines */
  rows?: number;
  /** Whether the textarea should resize automatically */
  autoResize?: boolean;
  /** Additional CSS classes for the container */
  containerClassName?: string;
  /** Additional CSS classes for the textarea */
  textareaClassName?: string;
}

/**
 * TextArea component with full accessibility support
 * 
 * Features:
 * - Auto-generated unique IDs for proper label association
 * - Integrated label, textarea, helper text, and error message
 * - Proper ARIA attributes (aria-invalid, aria-describedby, aria-required)
 * - Visual and screen reader error states
 * - Required field indicator
 * - Disabled state support
 * - Keyboard accessible
 * - Optional auto-resize functionality
 * - Character count support (via maxLength)
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      id: providedId,
      error,
      helperText,
      hideLabel = false,
      required = false,
      disabled = false,
      rows = 4,
      autoResize = false,
      containerClassName = '',
      textareaClassName = '',
      className,
      onChange,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const id = providedId || autoId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    const hasError = Boolean(error);

    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    // Handle auto-resize
    const handleResize = React.useCallback(() => {
      const textarea = textareaRef.current;
      if (autoResize && textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [autoResize]);

    React.useEffect(() => {
      handleResize();
    }, [handleResize]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleResize();
      onChange?.(e);
    };

    // Combine refs
    const setRefs = React.useCallback(
      (element: HTMLTextAreaElement | null) => {
        textareaRef.current = element;
        if (typeof ref === 'function') {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }
      },
      [ref]
    );

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

    const textareaClasses = [
      styles.textarea,
      autoResize && styles['textarea--autoResize'],
      hasError && styles['textarea--error'],
      textareaClassName,
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

        <textarea
          ref={setRefs}
          id={id}
          className={textareaClasses}
          rows={rows}
          aria-invalid={hasError}
          aria-describedby={describedBy || undefined}
          aria-required={required}
          disabled={disabled}
          onChange={handleChange}
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

TextArea.displayName = 'TextArea';
