# AI Help Center

A bilingual website for an AI consulting and services company, built with Next.js and Tailwind CSS.

## Features

- Responsive design for all device sizes
- Bilingual support (English and Bulgarian)
- Modern, animated UI components using Framer Motion
- Portfolio showcase with Supabase integration
- Contact form with validation

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase
- **Icons**: Feather Icons
- **Fonts**: Roboto and Roboto Mono (with Latin and Cyrillic support)

## Getting Started

### Prerequisites

- Node.js (v18.17.0 or newer)
- npm (v9.6.7 or newer)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd ai-help-center
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
ai-help-center/
├── public/              # Static assets (images, logos, etc.)
├── src/
│   ├── app/             # Next.js app directory
│   │   ├── about/       # About page
│   │   ├── contact/     # Contact page
│   │   ├── portfolio/   # Portfolio page
│   │   ├── services/    # Services page
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Homepage
│   ├── components/      # Reusable components
│   ├── context/         # Context providers (Language context)
│   ├── lib/             # Utility functions and Supabase client
│   └── types/           # TypeScript type definitions
└── ...                  # Config files
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Customization

### Adding New Languages

To add a new language:

1. Extend the `Language` type in `src/context/LanguageContext.tsx`
2. Add translations for the new language in each component

### Adding New Pages

Create a new directory in `src/app/` with a `page.tsx` file following the pattern of existing pages.

## License

[MIT](LICENSE)

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Supabase](https://supabase.com/)
- [Feather Icons](https://feathericons.com/)
