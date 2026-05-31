# Virtual Try-On

A React-based web application for virtual clothing try-on. Upload a photo and select products to see a real-time preview of how clothing items look on you.

## Quick Start

### Prerequisites
- Node.js 16+ and npm

### Local Development
```bash
# 1. Install dependencies
npm install

# 2. Add Firebase credentials
# Edit src/utils/firebase.js with your Firebase project config

# 3. Start dev server
npm run dev

# 4. Open http://localhost:5173 in your browser
```

### Build for Production
```bash
npm run build      # Creates optimized dist/ folder
npm run preview    # Test production build locally
```

## Libraries Used

| Library | Purpose |
|---------|---------|
| **React 19** | UI framework |
| **React Router DOM 7** | Client-side routing |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **Firebase 11** | Authentication & backend services |
| **React Dropzone 14** | File upload handling |
| **Recharts 2** | Charts for admin dashboard |
| **Headless UI 2** | Unstyled accessible components |
| **Chart.js 4** | Additional charting support |

## Known Limitations

- **Product Positioning**: Product overlays on canvas use fixed positioning based on product category. Fine-tuning may be needed for different body shapes or photo angles.
- **Image Quality**: Canvas render quality depends on uploaded image resolution. Low-res photos produce lower-quality try-on results.
- **Browser Support**: Requires modern browser with Canvas API support (Chrome, Firefox, Safari, Edge).
- **Mobile**: UI optimized for desktop. Mobile experience is limited due to canvas drawing complexity.
- **Model Diversity**: Try-on accuracy varies based on model pose and lighting. Best results with front-facing, well-lit photos.
- **Firebase Config**: Requires valid Firebase credentials for authentication and data persistence.
- **No Offline Mode**: App requires internet connection for Firebase services.

## Project Structure

```
src/
├── pages/           # Page components (Landing, Auth, Products, etc.)
├── components/      # Reusable components (Navbar, TryOnCanvas, etc.)
├── context/         # React Context (Auth, TryOn state)
├── hooks/           # Custom hooks (useAuth, useTryOn)
├── utils/           # Utilities (Firebase, Canvas, positions)
└── data/            # Mock data for products
```

## Available Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page (public) |
| `/auth` | Login/signup (public) |
| `/products` | Product selection (protected) |
| `/upload` | Photo upload (protected) |
| `/try-on` | Try-on result preview (protected) |
| `/admin` | Admin dashboard (protected) |

## Development Commands

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions for Netlify, Vercel, and self-hosted options.
