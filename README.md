# Gain

A fitness tracking application focused on strength training and workout progress.

## Features

- 💪 Track your workouts and exercises
- 📊 Visualize your training progress
- 📱 Mobile-first responsive design
- 🌙 Dark mode support
- 📈 Progress tracking and analytics
- 🎯 Set and monitor fitness goals
- 📝 Customizable workout templates

## Tech Stack

### Frontend

- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [TailwindCSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

### Backend

- [Hono](https://hono.dev)
- [Cloudflare Workers](https://workers.cloudflare.com)

## Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io)

## Development

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start development server:

   ```bash
   # Boot frontend server
   pnpm --filter frontend dev

   # Boot backend server
   pnpm --filter backend dev
   ```

3. Open your browser and navigate to:

   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:8787](http://localhost:8787)

4. Build for production:

   ```bash
   pnpm build
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Ryota Ikezawa <pavegy@gmail.com>
