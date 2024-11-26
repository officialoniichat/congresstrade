## Consultation Form Components

This directory contains the modular components for the consultation form functionality.

### Component Structure

- `ConsultationForm`: Main container component that manages form state and submission
- `FormHeader`: Header section with title and FOMO disclaimer
- `FormInput`: Reusable input component with validation
- `FormSuccess`: Success message shown after form submission
- `DateTimeInputs`: Date and time selection inputs
- `ValidationTypes`: TypeScript types for form validation

### Usage

```tsx
import { ConsultationForm } from './components/consultation';

function App() {
  return (
    <ConsultationForm onClose={() => {}} />
  );
}
```

### Components

#### ConsultationForm
Main container that manages form state and submission logic.

#### FormHeader
Header section with title and FOMO disclaimer.

Props:
- `title`: string
- `subtitle`: string

#### FormInput
Reusable input component with validation.

Props:
- `label`: string
- `type`: 'text' | 'tel' | 'email' | 'date'
- `value`: string
- `onChange`: (value: string) => void
- `error`: string | undefined
- `required`: boolean
- `icon`: LucideIcon
- `placeholder`: string

#### FormSuccess
Success message shown after form submission.

Props:
- `onClose`: () => void

#### DateTimeInputs
Date and time selection inputs grouped together.

Props:
- `date`: string
- `time`: string
- `onDateChange`: (date: string) => void
- `onTimeChange`: (time: string) => void
- `dateError`: string | undefined