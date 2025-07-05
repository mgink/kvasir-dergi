# Kvasir Dergi Website

A modern Next.js TypeScript project for Kvasir Magazine e-commerce website with Bootstrap styling.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx        # Homepage
│   ├── store/          # Magazine store
│   ├── cart/           # Shopping cart
│   ├── checkout/       # Checkout process
│   ├── blog/           # Blog articles
│   ├── events/         # Events & workshops
│   ├── about/          # About page
│   ├── contact/        # Contact page
│   └── admin/          # Admin panel
├── components/         # Reusable React components
├── lib/               # Context providers & utilities
├── types/             # TypeScript type definitions
└── data/              # Mock data
```

## 🎨 Features

### ✅ Core Features
- **Modern UI**: Bootstrap 5.3 with responsive design
- **E-commerce**: Full shopping cart and checkout system
- **Admin Panel**: Real-time dashboard with analytics
- **Blog System**: Articles with categories and search
- **Events**: Workshop and event management
- **Search**: Global search with keyboard shortcuts (Ctrl+K)
- **Newsletter**: Email subscription system

### ✅ Advanced Features
- **Real-time Updates**: Auto-refresh admin dashboard
- **Toast Notifications**: User feedback system
- **Order Management**: Complete order tracking
- **Analytics Dashboard**: Revenue and statistics tracking
- **Mobile Responsive**: Works on all devices
- **SEO Optimized**: Meta tags and proper structure

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Bootstrap 5.3 + Custom CSS
- **Icons**: Font Awesome 6.4
- **Animations**: Animate.css
- **State Management**: React Context API
- **Type Safety**: Full TypeScript coverage

## 🔧 Configuration

### Admin Access
- **Username**: `admin`
- **Password**: `admin123`

### Environment Setup
Create `.env.local` for environment variables:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📝 Development Guidelines

### Component Structure
- Use Bootstrap classes for styling
- Implement TypeScript interfaces
- Add error handling and loading states
- Include responsive design considerations

### Code Standards
- Follow React best practices
- Use proper TypeScript types
- Implement proper error boundaries
- Add comments for complex logic

## 🚀 Deployment

The project is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any Node.js hosting service

## 📱 Mobile Experience

- Fully responsive design
- Touch-friendly interface
- Mobile navigation menu
- Optimized loading times

## 🎯 Key Pages

1. **Homepage** (`/`) - Hero section, featured magazines, articles
2. **Store** (`/store`) - Magazine catalog with filtering
3. **Cart** (`/cart`) - Shopping cart management
4. **Blog** (`/blog`) - Articles and content
5. **Events** (`/events`) - Workshops and events
6. **Admin** (`/admin`) - Management dashboard

## 🔍 Search Features

- Global search modal (Ctrl+K / Cmd+K)
- Magazine and content search
- Quick navigation shortcuts
- Category filtering

## 📊 Analytics

The admin dashboard provides:
- Revenue tracking
- Order statistics
- Popular magazines
- Customer analytics
- Monthly reports

## 🎨 Customization

To customize the theme:
1. Modify Bootstrap variables in `globals.css`
2. Update color schemes in components
3. Change typography and spacing
4. Add custom animations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is created for educational and demonstration purposes.

---

**Created with ❤️ using Next.js, TypeScript, and Bootstrap**
