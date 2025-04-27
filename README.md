# Font Lens

A simple web application for comparing and previewing fonts

## Overview

Font Lens is a font preview and comparison application that leverages the Google Fonts library. It allows designers and developers to display and compare multiple fonts simultaneously, making it easier to choose the perfect font for their projects.

**Try it now:** [fontlens.kage1020.com](https://fontlens.kage1020.com) - Available for free!

## Key Features

- Search and display popular Google Fonts
- Compare multiple fonts side by side
- Rearrange and customize font displays
- Adjust font weights and styles
- Responsive design

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Google Fonts API](https://developers.google.com/fonts) - Font data
- [shadcn/ui](https://ui.shadcn.com/) - UI components

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/kage1020/font-lens.git
cd font-lens

# Install dependencies
pnpm install

# Set up environment variables
# Create a .env.local file in the project root and set your Google Fonts API key
# GOOGLE_API_KEY=your_api_key

# Start the development server
pnpm dev
```

You can view the application in your browser at [http://localhost:3000](http://localhost:3000).

## Usage

1. Click the "Add Another Font" button on the homepage to add a font
2. Search for fonts using the search box
3. Selected fonts appear in the list for comparison
4. Use arrow buttons to change the order of fonts
5. Customize text, size, weight, and other properties for each font card

## TODO

- Add support for local fonts
- Include more monospace fonts and fonts with ligature support

## License

[MIT](LICENSE)
