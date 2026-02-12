# Oxygenix Hire

Enterprise-grade hiring platform built with Next.js, TypeScript, and MongoDB.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB database
- OpenAI API key (for AI-powered job descriptions)
- Gemini API key (optional, for alternative AI provider)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create `.env.local` file with required environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key (optional)
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Development Workflow

### Code Quality Standards

This project enforces enterprise-grade code quality through automated Git hooks:

- **Pre-commit**: Runs ESLint and Prettier on staged files
- **Pre-push**: Runs TypeScript type checking
- **Commit-msg**: Validates commit message format

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
npm run typecheck    # Run TypeScript type checking
npm run format       # Format all files with Prettier
npm run format:check # Check if files are formatted
npm run validate     # Run all checks (typecheck + lint + format)
```

### Commit Message Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Commit messages must follow this format:

```
<type>: <description>

[optional body]

[optional footer]
```

**Allowed types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `revert`, `ci`, `build`

**Examples**:

```bash
git commit -m "feat: add candidate filtering"
git commit -m "fix: resolve authentication redirect issue"
git commit -m "docs: update API documentation"
```

### Before Committing

The pre-commit hook will automatically:

1. Run ESLint on staged TypeScript files
2. Format staged files with Prettier
3. Validate your commit message format

If any check fails, the commit will be blocked. Fix the issues and try again.

### Before Pushing

The pre-push hook will run TypeScript type checking. Ensure your code has no type errors before pushing.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI
- **Forms**: React Hook Form + Zod
- **AI Integration**: OpenAI GPT-4 & Google Gemini

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utility functions and configs
├── models/                # Mongoose models
├── types/                 # TypeScript type definitions
└── .husky/                # Git hooks
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)

## Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
