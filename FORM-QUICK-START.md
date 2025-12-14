# Form Components Quick Start

Get up and running with accessible form components in 5 minutes.

## Installation

Components are already in your project at `client/src/components/forms/`.

## Basic Usage

### 1. Import Components

```tsx
import { TextInput, SelectInput, TextArea } from '@/components/forms';
```

### 2. Create a Simple Form

```tsx
import { useState } from 'react';
import { TextInput, SelectInput, TextArea } from '@/components/forms';

function MyForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <TextInput
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
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
        placeholder="Choose..."
        required
      />

      <TextArea
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        rows={4}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

### 3. Add Validation

```tsx
const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};
  
  if (!formData.name) {
    newErrors.name = 'Name is required';
  }
  
  if (!formData.email) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Email is invalid';
  }
  
  return newErrors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  
  const validationErrors = validate();
  
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  
  // Submit form
  console.log('Valid form data:', formData);
};

// In your form:
<TextInput
  label="Email"
  name="email"
  type="email"
  value={formData.email}
  onChange={handleChange}
  error={errors.email}  // ← Add error prop
  required
/>
```

### 4. Add Helper Text

```tsx
<TextInput
  label="Email"
  name="email"
  type="email"
  value={formData.email}
  onChange={handleChange}
  helperText="We'll never share your email"  // ← Add helper text
  required
/>
```

## Common Patterns

### Clear Errors on Input Change

```tsx
const handleChange = (e) => {
  const { name, value } = e.target;
  
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
  
  // Clear error when user types
  if (errors[name]) {
    setErrors(prev => ({
      ...prev,
      [name]: undefined
    }));
  }
};
```

### Loading State

```tsx
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    await submitToAPI(formData);
  } finally {
    setIsSubmitting(false);
  }
};

// Disable all fields during submission
<TextInput
  label="Name"
  disabled={isSubmitting}
  // ...
/>
```

### With React Hook Form

```tsx
import { useForm } from 'react-hook-form';
import { TextInput } from '@/components/forms';

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Email"
        type="email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Invalid email'
          }
        })}
        error={errors.email?.message}
      />
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Component Cheat Sheet

### TextInput

```tsx
<TextInput
  label="Field Name"          // Required
  name="fieldName"            // For form data
  type="email"                // text, email, password, tel, url, search, number
  value={value}               // Controlled value
  onChange={handleChange}     // Change handler
  error="Error message"       // Show error
  helperText="Helper text"    // Show help
  required                    // Show required indicator
  disabled                    // Disable field
  placeholder="Placeholder"   // Placeholder text
/>
```

### SelectInput

```tsx
<SelectInput
  label="Field Name"          // Required
  name="fieldName"            // For form data
  value={value}               // Controlled value
  onChange={handleChange}     // Change handler
  options={[                  // Required - array of options
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2', disabled: true },
  ]}
  placeholder="Choose..."     // Placeholder option
  error="Error message"       // Show error
  helperText="Helper text"    // Show help
  required                    // Show required indicator
  disabled                    // Disable field
/>
```

### TextArea

```tsx
<TextArea
  label="Field Name"          // Required
  name="fieldName"            // For form data
  value={value}               // Controlled value
  onChange={handleChange}     // Change handler
  rows={5}                    // Number of rows
  autoResize                  // Auto-resize as user types
  maxLength={500}             // Character limit
  error="Error message"       // Show error
  helperText="Helper text"    // Show help
  required                    // Show required indicator
  disabled                    // Disable field
  placeholder="Placeholder"   // Placeholder text
/>
```

### FormField (for custom controls)

```tsx
<FormField
  label="Custom Field"        // Required
  error="Error message"       // Show error
  helperText="Helper text"    // Show help
  required                    // Show required indicator
  disabled                    // Disable field
>
  <YourCustomInput />         // Any form control
</FormField>
```

## Styling

### Using CSS Classes

```tsx
<TextInput
  label="Name"
  containerClassName="my-container"
  inputClassName="my-input"
/>
```

### Using Inline Styles

```tsx
<TextInput
  label="Name"
  style={{ maxWidth: '400px' }}
/>
```

### Custom CSS Variables

```css
.myForm {
  --color-primary-400: #your-color;
  --radius-md: 8px;
  --spacing-4: 1rem;
}
```

## Accessibility Tips

✅ **Always provide labels** - Don't use placeholder as label  
✅ **Use descriptive errors** - "Email is required" not "Invalid"  
✅ **Add helper text** - Provide context before errors occur  
✅ **Clear errors on change** - Give immediate feedback  
✅ **Use noValidate** - Disable browser validation: `<form noValidate>`  
✅ **Group related fields** - Use fieldset for related inputs  
✅ **Provide keyboard shortcuts** - All components are keyboard accessible  

## Examples

See `client/src/components/forms/FormExample.tsx` for a complete working example.

## Documentation

- **Full Guide:** `FORM-COMPONENTS-GUIDE.md` - Complete API documentation
- **Summary:** `FORM-REFACTORING-SUMMARY.md` - Technical details
- **This File:** `FORM-QUICK-START.md` - Get started fast

## Need Help?

1. Check the FormExample.tsx component for working code
2. Read the full guide in FORM-COMPONENTS-GUIDE.md
3. All components have TypeScript types for autocomplete

## Common Issues

### "Cannot find module '@/components/forms'"

Check your tsconfig.json has the path alias:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./client/src/*"]
    }
  }
}
```

### "Ref is not a valid prop"

Use React.forwardRef for custom components:
```tsx
const MyInput = React.forwardRef((props, ref) => (
  <input ref={ref} {...props} />
));
```

### "ID conflicts"

Don't manually set IDs - let components auto-generate them:
```tsx
// ✅ Good - auto-generated ID
<TextInput label="Name" />

// ❌ Bad - can cause conflicts
<TextInput label="Name" id="name" />
```

## Next Steps

1. Try the basic example above
2. Add validation
3. Style to match your design
4. Read full documentation for advanced features
5. Check FormExample.tsx for more patterns

Happy coding! 🚀
