# 🇮🇪 IrelandGo - Premium Travel Booking Platform

A modern, full-featured travel booking platform for exploring Ireland, built with Next.js 16, TypeScript, and Tailwind CSS. IrelandGo offers comprehensive booking solutions for airport transfers, hourly rentals, day trips, and multi-day tours with separate dashboards for travel agents and users.

![IrelandGo Banner](public/ireland-hero-bg.jpg)

## ✨ Features

### 🚗 Booking Services

#### Airport Transfers
- **Route Planning**: Interactive map-based route selection with OpenStreetMap integration
- **Journey Details**: Comprehensive trip information with pickup/dropoff locations
- **Transfer Routes**: Browse popular airport transfer routes across Ireland
- **Real-time Tracking**: Live tracking of your transfer vehicle

#### By the Hour
- **Flexible Rentals**: Book vehicles by the hour for custom itineraries
- **Multiple Stops**: Add multiple destinations to your journey
- **Professional Drivers**: Local drivers with extensive knowledge of Ireland

#### Day Trips
- **1500+ Tours**: Explore Ireland's wonders with curated day trip packages
- **Scenic Routes**: Visit Cliffs of Moher, Giant's Causeway, and more
- **Detailed Itineraries**: Complete trip information with timing and highlights
- **Easy Booking**: Streamlined booking flow from search to confirmation

#### Multi-Day Tours
- **Extended Adventures**: Multi-day tour packages across Ireland
- **Comprehensive Planning**: Accommodation, transport, and activities included
- **Customizable**: Tailor tours to your preferences

### 👤 User Features
- **Dashboard Overview**: View booking statistics, recent bookings, and activity feed
- **Booking Management**: Create, view, and manage travel bookings with detailed information
- **Profile Management**: Update personal information and preferences
- **Payment Methods**: Securely add and manage payment methods
- **Saved Trips**: Bookmark favorite destinations and tours
- **Notifications**: Real-time notifications for bookings, payments, and updates
- **Support**: Access customer support and help resources

### 🎯 Agent Features
- **Comprehensive Dashboard**: Monitor total bookings, revenue, and commission earnings
- **Client Management**: View and manage client information, booking history, and contact details
- **Booking Management**: Create and manage bookings for clients with full CRUD operations
- **Recent Clients Table**: Quick access to the 5 most recent clients
- **Activity Feed**: Track recent bookings, payments, and client registrations
- **Notifications**: Stay updated on new bookings, payments, and client activities
- **Payment Methods**: Manage payment options for seamless transactions

### 🔐 Authentication System
- **User Login/Signup**: Secure authentication for travelers
- **Agent Login/Signup**: Separate authentication flow for travel agents
- **Password Recovery**: Forgot password and reset password functionality
- **Email Verification**: Verification code system for account security
- **Role-based Access**: Different dashboards and permissions for users and agents

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) with Radix UI primitives
- **Icons**: [Lucide React](https://lucide.dev/)
- **Maps**: [Leaflet](https://leafletjs.com/) with React Leaflet
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with Zod validation
- **Authentication**: [NextAuth.js v5](https://next-auth.js.org/)
- **Carousel**: [Embla Carousel](https://www.embla-carousel.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Date Handling**: [date-fns](https://date-fns.org/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## 📁 Project Structure

```
IrelandGo-web/
├── app/                          # Next.js App Router
│   ├── about/                    # About page
│   ├── agent/                    # Agent dashboard routes
│   │   ├── bookings/             # Booking management
│   │   ├── clients/              # Client management
│   │   ├── notifications/        # Notifications page
│   │   ├── payment-methods/      # Payment methods page
│   │   ├── profile/              # Agent profile
│   │   ├── layout.tsx            # Agent layout with sidebar
│   │   └── page.tsx              # Agent dashboard
│   ├── airport-transfers/        # Airport transfer booking
│   │   ├── journey-details/      # Journey details page
│   │   ├── transfer-routes/      # Popular routes
│   │   └── page.tsx              # Airport transfers home
│   ├── auth/                     # Authentication pages
│   │   ├── login/                # Login page
│   │   ├── signup/               # Signup page
│   │   ├── forgot-password/      # Password recovery
│   │   ├── verify-code/          # Email verification
│   │   └── reset-password/       # Password reset
│   ├── booking-flow/             # Multi-step booking process
│   │   ├── step-2/               # Vehicle selection
│   │   ├── step-3/               # Booking details
│   │   ├── step-3-details/       # Additional details
│   │   ├── payment/              # Payment processing
│   │   ├── booking-confirmation/ # Confirmation page
│   │   └── real-time-tracking/   # Live tracking
│   ├── by-the-hour/              # Hourly rental service
│   ├── contact/                  # Contact page
│   ├── dashboard/                # Dashboard routes
│   │   ├── agent/                # Agent dashboard
│   │   └── user/                 # User dashboard
│   ├── day-trips/                # Day trips service
│   │   ├── day-trip-details/     # Trip details page
│   │   └── page.tsx              # Day trips home
│   ├── multi-day-tours/          # Multi-day tour packages
│   ├── settings/                 # Settings pages
│   │   ├── privacy-policy/       # Privacy policy
│   │   └── terms-of-service/     # Terms of service
│   ├── transfer/                 # Transfer services
│   │   ├── private-car-transfer/ # Private transfers
│   │   └── transfer-search/      # Search transfers
│   ├── user/                     # User dashboard routes
│   │   ├── bookings/             # User bookings
│   │   ├── dashboard/            # User dashboard
│   │   ├── notifications/        # Notifications page
│   │   ├── payment-methods/      # Payment methods page
│   │   ├── profile/              # User profile
│   │   ├── saved/                # Saved trips
│   │   ├── support/              # Support page
│   │   ├── layout.tsx            # User layout with sidebar
│   │   └── page.tsx              # User home
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   ├── airport-transfers/        # Airport transfer components
│   ├── auth/                     # Authentication components
│   ├── booking-flow/             # Booking flow components
│   ├── by-the-hour/              # Hourly rental components
│   ├── common/                   # Shared components
│   │   ├── header.tsx            # Site header
│   │   ├── footer.tsx            # Site footer
│   │   └── PageHeader.tsx        # Page header component
│   ├── day-trips/                # Day trip components
│   │   ├── day-trips-hero.tsx    # Hero section
│   │   └── day-trips-details/    # Detail components
│   ├── home/                     # Home page components
│   ├── layout/                   # Layout components
│   ├── multi-day-tours/          # Multi-day tour components
│   └── ui/                       # UI components (shadcn/ui)
├── contexts/                     # React contexts
│   └── BookingContext.tsx        # Booking state management
├── hooks/                        # Custom React hooks
│   ├── use-mobile.tsx            # Mobile detection hook
│   └── use-toast.ts              # Toast notification hook
├── lib/                          # Utility functions
│   └── utils.ts                  # Helper utilities
├── public/                       # Static assets
│   ├── ireland-hero-bg.jpg       # Hero background images
│   ├── cliffs-of-moher-*.jpg     # Destination images
│   └── ...                       # Other assets
├── styles/                       # Global styles
│   └── globals.css               # Global CSS
├── components.json               # shadcn/ui configuration
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Project dependencies
```

## 🎨 Key Features Breakdown

### Modern UI/UX Design
- **Glassmorphism Effects**: Modern frosted glass UI elements
- **Gradient Backgrounds**: Rich, vibrant color schemes
- **Smooth Animations**: Micro-interactions for enhanced user experience
- **Responsive Design**: Mobile-first approach with seamless tablet and desktop views
- **Dark Mode Support**: Theme switching with next-themes
- **Premium Aesthetics**: State-of-the-art design patterns

### Interactive Maps
- **OpenStreetMap Integration**: Interactive route planning with Leaflet
- **Location Search**: Search Irish settlements and landmarks
- **Route Visualization**: Visual representation of pickup and dropoff locations
- **Real-time Updates**: Live tracking of vehicle location

### Booking Flow
- **Multi-step Process**: Guided booking experience
  1. Service selection (Transfer/Hourly/Day Trip/Multi-day)
  2. Vehicle selection with detailed information
  3. Booking details and passenger information
  4. Payment processing
  5. Confirmation and tracking
- **Progress Indicator**: Clear visual feedback on booking progress
- **Form Validation**: Comprehensive validation with Zod schemas
- **Secure Payments**: Payment method management

### Dashboard Design
- **Metrics Cards**: Display key statistics with color-coded icons
- **Professional Tables**: Clean table design with filtering and sorting
- **Recent Activity**: Timeline view of recent actions
- **Charts & Analytics**: Visual representation of data with Recharts

## 🎯 Usage

### For Travelers

1. **Browse Services**: Explore airport transfers, hourly rentals, day trips, and multi-day tours
2. **Search & Filter**: Find the perfect trip using the search functionality
3. **Book Your Trip**: Follow the guided booking flow
4. **Manage Bookings**: View and manage your bookings in the user dashboard
5. **Track in Real-time**: Monitor your vehicle location during the trip

### For Travel Agents

1. **Access Agent Dashboard**: Navigate to `/agent`
2. **View Metrics**: See total bookings, revenue, and commission
3. **Manage Clients**: Go to `/agent/clients` to view and manage clients
4. **Create Bookings**: Use the booking management system at `/agent/bookings`
5. **Check Notifications**: View updates at `/agent/notifications`

## 🗺️ Main Routes

### Public Routes
- `/` - Home page with service overview
- `/airport-transfers` - Airport transfer booking
- `/by-the-hour` - Hourly rental service
- `/day-trips` - Day trip packages
- `/multi-day-tours` - Multi-day tour packages
- `/about` - About IrelandGo
- `/contact` - Contact page

### Authentication Routes
- `/auth/login` - User/Agent login
- `/auth/signup` - User/Agent registration
- `/auth/forgot-password` - Password recovery
- `/auth/verify-code` - Email verification
- `/auth/reset-password` - Password reset

### User Routes
- `/user` - User dashboard
- `/user/bookings` - View and manage bookings
- `/user/profile` - Profile management
- `/user/payment-methods` - Payment methods
- `/user/saved` - Saved trips
- `/user/notifications` - Notifications
- `/user/support` - Customer support

### Agent Routes
- `/agent` - Agent dashboard
- `/agent/clients` - Client management
- `/agent/bookings` - Booking management
- `/agent/profile` - Agent profile
- `/agent/payment-methods` - Payment methods
- `/agent/notifications` - Notifications

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


**Made with ❤️ for travelers exploring the beauty of Ireland** 🇮🇪
