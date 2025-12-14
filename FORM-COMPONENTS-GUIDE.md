# Form Components Guide

## Overview

A comprehensive collection of fully accessible, reusable form components built with React, TypeScript, and BEM CSS Modules. All components follow WCAG 2.1 AA accessibility guidelines and include full keyboard navigation support.

## Components

### 1. Label
A label component with built-in required field indicators and error states.

**Features:**
- Properly associates with form controls via `htmlFor`
- Visual indicator for required fields
- Error state styling
- Screen reader friendly

**Props:**
```typescript
interface LabelProps {
  htmlFor: string;           // Required - ID of the associated control
  required?: boolean;        // Shows required indicator
  requiredText?: string;     // Custom text for required (default: "(required)")
  error?: boolean;          // Error state styling
  className?: string;       // Additional CSS classes
  children: React.ReactNode;
}
```

**Usage:**
```tsx
<Label htmlFor="email" required error={hasError}>
  Email Address
</Label>
```

---

### 2. ErrorMessage
An accessible error message component that announces to screen readers.

**Features:**
- Unique ID for `aria-describedby` association
- `role="alert"` for screen reader announcements
- `aria-live="polite"` for dynamic updates
- Optional icon for visual users
- Only renders when there's a message

**Props:**
```typescript
interface ErrorMessageProps {
  id: string;              // Required - matches aria-describedby on input
  message?: string;        // Error message to display
  showIcon?: boolean;      // Show alert icon (default: true)
  className?: string;      // Additional CSS classes
}
```

**Usage:**
```tsx
<ErrorMessage 
  id="email-error" 
  message="Please enter a valid email address"
/>
```

---

### 3. TextInput
A complete text input with integrated label, error handling, and helper text.

**Features:**
- Auto-generated unique IDs
- Integrated label, input, helper text, and error message
- Proper ARIA attributes
- Required field indicator
- Disabled state support
- Multiple input types (text, email, password, tel, url, search, number)
- Hidden label option (still accessible)

**Props:**
```typescript
interface TextInputProps {
  label: string;                  // Required
  id?: string;                   // Auto-generated if not provided
  type?: 'text' | 'email' | ...  // Input type
  error?: string;                // Error message
  helperText?: string;           // Helper text below input
  hideLabel?: boolean;           // Visually hide label
  containerClassName?: string;   // Container CSS classes
  inputClassName?: string;       // Input CSS classes
  // + all standard input props
}
```

**Usage:**
```tsx
<TextInput
  label="Email Address"
  name="email"
  type="email"
  value={email}
  onChange={handleChange}
  error={errors.email}
  helperText="We'll never share your email"
  required
  placeholder="john@example.com"
/>
```

---

### 4. SelectInput
An accessible select dropdown with custom styling.

**Features:**
- Auto-generated unique IDs
- Integrated label, select, helper text, and error message
- Proper ARIA attributes
- Custom styled dropdown with icon
- Placeholder option handling
- Disabled options support
- Keyboard accessible

**Props:**
```typescript
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectInputProps {
  label: string;                // Required
  options: SelectOption[];      // Required - array of options
  id?: string;                 // Auto-generated if not provided
  placeholder?: string;        // Placeholder option text
  error?: string;              // Error message
  helperText?: string;         // Helper text below select
  hideLabel?: boolean;         // Visually hide label
  containerClassName?: string; // Container CSS classes
  selectClassName?: string;    // Select CSS classes
  // + all standard select props
}
```

**Usage:**
```tsx
<SelectInput
  label="Your Role"
  name="role"
  value={role}
  onChange={handleChange}
  options={[
    { value: 'developer', label: 'Developer' },
    { value: 'designer', label: 'Designer' },
    { value: 'manager', label: 'Manager' },
  ]}
  error={errors.role}
  helperText="Select your primary role"
  placeholder="Choose a role..."
  required
/>
```

---

### 5. TextArea
A textarea component with optional auto-resize functionality.

**Features:**
- Auto-generated unique IDs
- Integrated label, textarea, helper text, and error message
- Proper ARIA attributes
- Optional auto-resize as user types
- Character count support (via maxLength)
- Configurable rows

**Props:**
```typescript
interface TextAreaProps {
  label: string;               // Required
  id?: string;                // Auto-generated if not provided
  error?: string;             // Error message
  helperText?: string;        // Helper text below textarea
  hideLabel?: boolean;        // Visually hide label
  rows?: number;              // Number of visible text lines (default: 4)
  autoResize?: boolean;       // Auto-resize as user types
  containerClassName?: string;// Container CSS classes
  textareaClassName?: string; // Textarea CSS classes
  // + all standard textarea props
}
```

**Usage:**
```tsx
<TextArea
  label="Message"
  name="message"
  value={message}
  onChange={handleChange}
  error={errors.message}
  helperText="Tell us more about your request"
  required
  rows={5}
  autoResize
  maxLength={500}
/>
```

---

### 6. FormField
A flexible wrapper that works with any form control.

**Features:**
- Auto-generated unique IDs
- Automatically injects ARIA props to child
- Works with any form control (input, select, textarea, custom)
- Integrated label, helper text, and error message
- Visual and screen reader states

**Props:**
```typescript
interface FormFieldProps {
  label: string;               // Required
  children: React.ReactElement;// Required - single form control
  id?: string;                // Auto-generated if not provided
  error?: string;             // Error message
  helperText?: string;        // Helper text
  required?: boolean;         // Required indicator
  disabled?: boolean;         // Disabled state
  hideLabel?: boolean;        // Visually hide label
  className?: string;         // Container CSS classes
}
```

**Usage:**
```tsx
<FormField
  label="Custom Input"
  error={errors.custom}
  helperText="This is a custom input"
  required
>
  <input
    type="text"
    name="custom"
    value={customValue}
    onChange={handleChange}
  />
</FormField>
```

---

## Accessibility Features

### ARIA Support
All components include proper ARIA attributes:
- `aria-invalid` - Indicates field has error
- `aria-describedby` - Links to helper text and error messages
- `aria-required` - Indicates required fields
- `aria-label` - For screen reader context
- `role="alert"` - For error announcements
- `aria-live="polite"` - For dynamic error updates
- `aria-atomic="true"` - For complete error message reading

### Keyboard Navigation
- **Tab/Shift+Tab** - Navigate between fields
- **Enter/Space** - Activate buttons, open selects
- **Arrow Keys** - Navigate select options
- **Escape** - Close select dropdown (native)
- All interactive elements are keyboard accessible

### Screen Reader Support
- Labels properly associated with inputs
- Required fields announced
- Errors announced immediately when they appear
- Helper text read with field context
- Clear focus indicators for keyboard navigation

### Visual Accessibility
- High contrast mode support
- Focus visible indicators
- Error states with color + icon + text
- Sufficient color contrast ratios
- Disabled state indicators

### Responsive & Adaptive
- Works on all screen sizes
- Touch-friendly hit areas (min 44x44px)
- Respects user preferences:
  - `prefers-reduced-motion` - Disables animations
  - `prefers-contrast: high` - Enhances borders and outlines
  - `prefers-color-scheme: dark` - Dark mode support

---

## Complete Form Example

```tsx
import React, { useState } from 'react';
import { TextInput, SelectInput, TextArea } from '@/components/forms';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Submit form
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <TextInput
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
        placeholder="John Doe"
      />

      <TextInput
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
        placeholder="john@example.com"
      />

      <SelectInput
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        options={[
          { value: 'developer', label: 'Developer' },
          { value: 'designer', label: 'Designer' },
        ]}
        error={errors.role}
        placeholder="Choose a role..."
        required
      />

      <TextArea
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        required
        rows={5}
        autoResize
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Styling

All components use CSS Modules with BEM methodology. The styles are in `forms.module.css`.

### Custom Styling

You can customize components using:

1. **CSS Classes:**
```tsx
<TextInput
  label="Name"
  containerClassName="my-custom-container"
  inputClassName="my-custom-input"
/>
```

2. **CSS Variables:**
Override design tokens in your CSS:
```css
.myForm {
  --color-primary-400: #your-color;
  --radius-md: 12px;
  --spacing-4: 1.5rem;
}
```

3. **Direct Styles:**
Use the `style` prop for inline styles:
```tsx
<TextInput label="Name" style={{ maxWidth: '300px' }} />
```

---

## Best Practices

### 1. Always Provide Labels
```tsx
// ✅ Good
<TextInput label="Email" />

// ❌ Bad - no label for screen readers
<input type="email" placeholder="Email" />
```

### 2. Use Descriptive Error Messages
```tsx
// ✅ Good - specific and actionable
error="Please enter a valid email address (e.g., john@example.com)"

// ❌ Bad - too vague
error="Invalid input"
```

### 3. Provide Helper Text
```tsx
// ✅ Good - helpful context
helperText="We'll never share your email with anyone"

// ❌ Bad - missing helpful context
```

### 4. Clear Errors on Input Change
```tsx
// ✅ Good - clear error when user starts fixing it
const handleChange = (e) => {
  if (errors[e.target.name]) {
    setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
  }
};
```

### 5. Use noValidate on Forms
```tsx
// ✅ Good - use custom validation
<form onSubmit={handleSubmit} noValidate>

// ❌ Bad - browser validation conflicts with custom errors
<form onSubmit={handleSubmit}>
```

---

## Testing

### Manual Testing Checklist
- [ ] Keyboard navigation works (Tab, Shift+Tab, Enter, Space)
- [ ] Screen reader announces labels, errors, and helper text
- [ ] Focus indicators are visible
- [ ] Error messages appear and are announced
- [ ] Required fields show asterisk
- [ ] Disabled states prevent interaction
- [ ] Form submits correctly
- [ ] Validation works as expected

### Automated Testing Example
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from './TextInput';

test('shows error message when provided', () => {
  render(
    <TextInput 
      label="Email" 
      error="Invalid email"
    />
  );
  
  expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
});

test('associates label with input', () => {
  render(<TextInput label="Email" />);
  
  const input = screen.getByLabelText('Email');
  expect(input).toBeInTheDocument();
});
```

---

## Migration from Existing Forms

### Step 1: Replace Input Elements
```tsx
// Before
<label htmlFor="email">Email</label>
<input id="email" type="email" />
{error && <span>{error}</span>}

// After
<TextInput label="Email" type="email" error={error} />
```

### Step 2: Update State Management
No changes needed - components work with standard React state.

### Step 3: Update Validation
Components handle ARIA automatically. Just pass error strings.

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

---

## Contributing

When adding new form components:
1. Follow the existing pattern (Label, Error, ARIA support)
2. Use TypeScript with proper types
3. Include full accessibility support
4. Add CSS using BEM methodology
5. Write documentation and examples
6. Test with keyboard and screen readers

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)
