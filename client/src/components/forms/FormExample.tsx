import React, { useState } from 'react';
import { TextInput, SelectInput, TextArea, FormField } from './index';

/**
 * FormExample - Comprehensive demonstration of form components
 * 
 * This example shows:
 * 1. TextInput with validation
 * 2. SelectInput with options
 * 3. TextArea with auto-resize
 * 4. FormField wrapper for custom controls
 * 5. Error handling
 * 6. Form submission
 * 7. Required fields
 * 8. Helper text
 * 9. Disabled states
 */
export const FormExample = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    message: '',
    customField: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
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
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
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
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
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

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        role: '',
        message: '',
        customField: '',
      });
    }, 1000);
  };

  const roleOptions = [
    { value: 'developer', label: 'Developer' },
    { value: 'designer', label: 'Designer' },
    { value: 'manager', label: 'Manager' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1>Form Components Demo</h1>
      <p style={{ marginBottom: '2rem' }}>
        This form demonstrates all the accessible form components with validation.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {/* TextInput Example */}
        <TextInput
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          helperText="Enter your full name as it appears on official documents"
          required
          placeholder="John Doe"
          disabled={isSubmitting}
        />

        {/* Email TextInput Example */}
        <TextInput
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          helperText="We'll never share your email with anyone"
          required
          placeholder="john@example.com"
          disabled={isSubmitting}
          autoComplete="email"
        />

        {/* SelectInput Example */}
        <SelectInput
          label="Your Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          options={roleOptions}
          error={errors.role}
          helperText="Select the role that best describes you"
          placeholder="Choose a role..."
          required
          disabled={isSubmitting}
        />

        {/* TextArea Example */}
        <TextArea
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          helperText="Tell us more about yourself and your interests"
          required
          placeholder="Write your message here..."
          rows={5}
          autoResize
          disabled={isSubmitting}
          maxLength={500}
        />

        {/* FormField with custom input example */}
        <FormField
          label="Custom Field (Optional)"
          helperText="This demonstrates FormField wrapper with a custom input"
        >
          <input
            type="text"
            name="customField"
            value={formData.customField}
            onChange={handleChange}
            placeholder="Any additional information..."
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              border: '1px solid #333',
              borderRadius: '0.5rem',
              backgroundColor: '#0a0a0a',
              color: '#fff',
            }}
          />
        </FormField>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#fff',
            backgroundColor: '#3b82f6',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            opacity: isSubmitting ? 0.6 : 1,
            transition: 'all 0.2s',
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Form'}
        </button>

        {/* Form Data Display (for demo purposes) */}
        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#1a1a1a', borderRadius: '0.5rem' }}>
          <h3 style={{ marginTop: 0 }}>Current Form Data:</h3>
          <pre style={{ fontSize: '0.875rem', overflow: 'auto' }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </form>
    </div>
  );
};
