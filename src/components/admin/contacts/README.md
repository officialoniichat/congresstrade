## Contact Management System

This directory contains the modular components for managing contacts/leads in the admin dashboard.

### Architecture

The contact management system follows a modular architecture with clear separation of concerns:

```
contacts/
├── README.md
├── components/
│   ├── ContactList/           # Main list view of contacts
│   │   ├── ContactRow.tsx    # Individual contact row
│   │   ├── ContactFilters.tsx # Search and filtering
│   │   └── index.tsx        # List container
│   ├── ContactDetails/        # Contact details view
│   │   ├── ContactInfo.tsx   # Contact information
│   │   ├── ContactNotes.tsx  # Notes management
│   │   └── ContactTags.tsx   # Tags management
│   └── ContactModals/         # Modal components
│       ├── EditModal.tsx     # Edit contact details
│       ├── DeleteModal.tsx   # Confirm deletion
│       └── AddNoteModal.tsx  # Add new note
├── hooks/                     # Custom hooks
│   ├── useContacts.ts        # Contact data management
│   └── useContactFilters.ts  # Filtering logic
├── types/                     # TypeScript types
│   └── index.ts
└── utils/                     # Utility functions
    ├── validation.ts
    └── formatting.ts

### Features

1. Contact List Management
   - View all contacts in a paginated list
   - Sort by various fields
   - Quick status updates
   - Bulk actions

2. Advanced Filtering
   - Search by name, email, phone
   - Filter by status
   - Date range filtering
   - Tag-based filtering

3. Contact Details
   - View complete contact information
   - Edit contact details
   - Add/edit/delete notes
   - Manage tags
   - View interaction history

4. Data Validation
   - Input validation for all fields
   - Phone number formatting
   - Email validation
   - Date validation

### Usage

```tsx
import { ContactList } from './components/admin/contacts';

function AdminDashboard() {
  return (
    <div>
      <ContactList />
    </div>
  );
}
```

### State Management

The contact management system uses React Context for state management:

```tsx
import { ContactProvider } from './contexts/ContactContext';

function App() {
  return (
    <ContactProvider>
      <AdminDashboard />
    </ContactProvider>
  );
}
```

### API Integration

The system integrates with the following API endpoints:

- GET /api/contacts - List all contacts
- GET /api/contacts/:id - Get contact details
- PUT /api/contacts/:id - Update contact
- DELETE /api/contacts/:id - Delete contact
- POST /api/contacts/:id/notes - Add note
- DELETE /api/contacts/:id/notes/:noteId - Delete note
- POST /api/contacts/:id/tags - Add tag
- DELETE /api/contacts/:id/tags/:tagId - Delete tag

### Error Handling

The system implements comprehensive error handling:

1. API Errors
   - Network errors
   - Validation errors
   - Server errors

2. User Input Validation
   - Required fields
   - Format validation
   - Business rule validation

3. Error Display
   - User-friendly error messages
   - Error boundaries
   - Loading states

### Performance Optimizations

1. List Virtualization
   - Only render visible rows
   - Smooth scrolling
   - Efficient updates

2. Caching
   - Cache API responses
   - Optimistic updates
   - Background data refresh

3. Debouncing
   - Search input debouncing
   - API request throttling
   - Auto-save delays