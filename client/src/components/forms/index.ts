/**
 * Form Components Library
 * 
 * A collection of fully accessible, reusable form components
 * built with React, TypeScript, and BEM CSS Modules.
 * 
 * All components include:
 * - Full ARIA support
 * - Keyboard navigation
 * - Screen reader compatibility
 * - Error state management
 * - Required field indicators
 * - Helper text support
 * - Disabled state handling
 * - Auto-generated unique IDs
 */

// Core components
export { Label, type LabelProps } from './Label';
export { ErrorMessage, type ErrorMessageProps } from './ErrorMessage';
export { FormField, type FormFieldProps } from './FormField';

// Input components
export { TextInput, type TextInputProps } from './TextInput';
export { SelectInput, type SelectInputProps, type SelectOption } from './SelectInput';
export { TextArea, type TextAreaProps } from './TextArea';
