# Transform with Irini

This repository contains the frontend for the "Transform with Irini" project, built using [Next.js](https://nextjs.org) and integrated with [Sanity Studio](https://www.sanity.io/). The project is designed to provide a seamless content management and preview workflow for editors.

## Features

- **Dynamic Content Management**: Integrated with Sanity Studio for managing content.
- **Draft Mode Previews**: Editors can preview draft content in staging and production environments.
- **Custom Components**: A variety of reusable components tailored for the "Transform with Irini" project.
- **Responsive Design**: Optimized for all devices using Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm, yarn, or pnpm
- Sanity CLI (for managing the Sanity Studio backend)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zoitsa/transform-with-irini.git
   cd transform-with-irini
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Preview Workflow

- **Enable Draft Mode**: Visit `/api/preview` to enable draft mode and preview unpublished content.
- **Disable Draft Mode**: Visit `/api/exit-preview` to exit draft mode and view published content.

## Deployment

The project is deployed using [Vercel](https://vercel.com). For deployment instructions, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
