import React from 'react';
import { AlertCircle } from 'lucide-react';
import styles from './forms.module.css';

export interface ErrorMessageProps {
  /** Unique ID for the error message (should match aria-describedby on input) */
  id: string;
  /** The error message to display */
  message?: string;
  /** Whether to show an icon */
  showIcon?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ErrorMessage component with full accessibility support
 * 
 * Features:
 * - Unique ID for aria-describedby association
 * - role="alert" for screen readers to announce changes
 * - aria-live="polite" for dynamic error updates
 * - Optional icon for visual users
 * - Only renders when there's a message
 */
export const ErrorMessage = React.forwardRef<HTMLDivElement, ErrorMessageProps>(
  ({ id, message, showIcon = true, className = '' }, ref) => {
    if (!message) {
      return null;
    }

    const errorClasses = [
      styles.errorMessage,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        id={id}
        className={errorClasses}
        role="alert"
        aria-live="polite"
        aria-atomic="true"
      >
        {showIcon && (
          <AlertCircle 
            className={styles.errorMessage__icon} 
            aria-hidden="true"
          />
        )}
        <span className={styles.errorMessage__text}>{message}</span>
      </div>
    );
  }
);

ErrorMessage.displayName = 'ErrorMessage';
