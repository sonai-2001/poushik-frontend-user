# Poshik User Dashboard

<div align="center">
  <strong>Next.js Admin Dashboard with TypeScript & Shadcn UI</strong><br />
  A modern, feature-rich admin dashboard built with Next.js 15, Tailwind CSS, App Router, TypeScript, and Shadcn UI.
</div>

## 🚀 Features

- **Modern Tech Stack**
  - Next.js 15 with App Router
  - TypeScript for type safety
  - Tailwind CSS for styling
  - Shadcn UI components
  - React Query for data fetching
  - React Hook Form with Zod validation

- **Authentication & Authorization**
  - Secure login system
  - Role-based access control (RBAC)
  - Password reset functionality
  - Token-based authentication

- **Dashboard Features**
  - User Management
  - Content Management System (CMS)
  - SEO Management
  - FAQ Management
  - Service Management
  - Special Offers
  - Reviews & Ratings
  - Profile Management

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (external)/          # Public pages
│   ├── (main)/              # Main application
│   │   ├── dashboard/       # Dashboard routes
│   │   │   ├── cms/        # CMS management
│   │   │   ├── seo/        # SEO tools
│   │   │   ├── management/ # User management
│   │   │   ├── profile/    # Profile management
│   │   │   └── about/      # About section
│   │   ├── auth/           # Authentication
│   │   └── unauthorized/   # Unauthorized access
│   └── layout.tsx          # Root layout
│
├── components/              # React components
│   ├── ui/                 # Shadcn UI components
│   ├── icons/             # Custom icons
│   └── theme-provider.tsx # Theme configuration
│
├── module/                 # Feature modules
│   ├── auth/              # Authentication module
│   ├── user/              # User management module
│   ├── cms/               # CMS module
│   ├── seo/               # SEO module
│   └── shared/            # Shared module components
│
├── api/                    # API integration
│   ├── hooks/             # API hooks
│   ├── axiosInstance/     # Axios configuration
│   └── endpoints.ts       # API endpoints
│
├── hooks/                  # Custom React hooks
│   ├── useAuth.ts         # Authentication hook
│   ├── useTableFilter.ts  # Table filtering
│   └── use-mobile.ts      # Mobile detection
│
├── lib/                    # Utility libraries
├── types/                  # TypeScript types
├── utils/                  # Helper functions
├── context/               # React context
├── config/                # App configuration
└── constants/             # Static values
```

## 📦 Module Management

### Module Structure
Each module in the `src/module` directory follows this structure:
```
module/
├── [module-name]/
│   ├── components/        # Module-specific components
│   ├── hooks/            # Module-specific hooks
│   ├── types/            # Module-specific types
│   ├── utils/            # Module-specific utilities
│   ├── constants.ts      # Module constants
│   └── index.ts          # Module exports
```

### Creating a New Module
1. Create a new directory in `src/module` with your module name
2. Follow the module structure above
3. Export your module components and utilities in `index.ts`
4. Import and use the module in your pages

Example:
```typescript
// src/module/user/index.ts
export * from './components';
export * from './hooks';
export * from './types';
export * from './utils';
export * from './constants';

// Using the module in a page
import { UserList, useUserData } from '@/module/user';
```

### Module Best Practices
1. **Encapsulation**: Keep module-specific code within the module
2. **Reusability**: Create shared components in `module/shared`
3. **Type Safety**: Define types in the module's `types` directory
4. **Testing**: Include tests within the module
5. **Documentation**: Add README.md for complex modules

## 🛠️ Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd super-admin-shadcn-ui
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   NEXT_PUBLIC_BASE_URL=your_api_base_url
   ```

4. **Start the development server**
   ```bash
   yarn dev
   # or
   npm run dev
   ```

5. **Build for production**
   ```bash
   yarn build
   # or
   npm run build
   ```

## 🔧 Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
- `format` - Format code with Prettier
- `check-types` - Run TypeScript type checking

## 📚 API Integration

The application integrates with a RESTful API with endpoints for:
- Authentication
- User Management
- Role Management
- CMS Content
- FAQ Management
- Category Management
- Service Management
- Special Offers
- Reviews & Ratings

## 🎨 UI Components

The project uses Shadcn UI components including:
- Form elements (inputs, selects, checkboxes)
- Navigation components (sidebar, breadcrumb, tabs)
- Data display (tables, cards, charts)
- Feedback components (alerts, toasts, dialogs)
- Layout components (accordion, collapsible, drawer)
- Rich text editor
- File upload components
- Theme switching

## 🔐 Security Features

- Token-based authentication
- Password reset functionality
- Role-based access control
- Secure API endpoints
- Environment variable protection

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



---

<div align="center">
  Made with ❤️ by Webskitters
</div> 