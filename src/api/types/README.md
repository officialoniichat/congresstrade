<content># API Types Documentation

## Contact
```typescript
interface Contact {
  id: number;
  name: string;
  phone: string;
  email?: string;
  preferred_date: string;
  preferred_time: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  investment_capacity?: string;
  risk_tolerance?: string;
  experience_level?: string;
  time_horizon?: string;
  preferred_package?: string;
  created_at: string;
  updated_at: string;
  notes: ContactNote[];
  tags?: string[];
}
```

## ContactNote
```typescript
interface ContactNote {
  id: number;
  contact_id: number;
  text: string;
  author: string;
  timestamp: string;
}
```

## User
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'agent';
  status: 'active' | 'inactive';
  last_login?: string;
  created_at: string;
}
```

## API Responses
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: Record<string, string>;
}
```

## Validation Rules
```typescript
interface ValidationRules {
  name: {
    required: true;
    minLength: 3;
  };
  phone: {
    required: true;
    pattern: /^[\d\s+()-]{10,}$/;
  };
  email: {
    required: false;
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  };
  preferred_date: {
    required: true;
    minDate: 'today';
  };
  preferred_time: {
    required: true;
    options: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
  };
}
```</content>