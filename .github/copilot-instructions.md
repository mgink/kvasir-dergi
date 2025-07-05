# Kvasir Dergi - Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a Next.js TypeScript project for Kvasir Dergi, a magazine e-commerce website.

## Project Structure
- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Pages**: Home, Store, About, Contact, Admin Panel
- **Features**: E-commerce functionality, shopping cart, admin management

## Code Standards
- Use TypeScript for type safety
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling with responsive design
- Implement proper error handling and loading states
- Use Next.js App Router for routing
- Create reusable components in `src/components`
- Use proper TypeScript interfaces for data types

## Magazine Data Structure
```typescript
interface Magazine {
  id: string;
  title: string;
  issue: number;
  coverImage: string;
  price: number;
  description: string;
  publishDate: string;
  isAvailable: boolean;
  digitalVersion?: string;
}
```

## E-commerce Features
- Product listing and filtering
- Shopping cart functionality
- Checkout process
- Order management
- Admin panel for content management

## UI/UX Guidelines
- Modern, clean design
- Mobile-first responsive approach
- Consistent color scheme and typography
- Smooth transitions and animations
- Accessible components
