# Organic AI 🌱

A modern web application that helps users make healthier choices by analyzing product labels and recommending alternatives with cleaner ingredients.

## Features

- 📸 Scan product labels using your device's camera
- 🔍 Barcode scanning support
- 📤 Upload product images from your device
- 🤖 AI-powered ingredient analysis
- 💚 Health score assessment
- 🔄 Alternative product recommendations
- 📱 Mobile-first, responsive design

## Tech Stack

- Next.js 14 (React framework)
- TypeScript
- TailwindCSS (Styling)
- OpenAI GPT-4 Vision (Image analysis)
- Cloudinary (Image hosting)
- QuaggaJS (Barcode scanning)

## Getting Started

1. Clone the repository:
\`\`\`bash
git clone https://github.com/YourUsername/organic-ai.git
cd organic-ai
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a \`.env.local\` file in the root directory with the following variables:
\`\`\`
OPENAI_API_KEY=your_openai_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

- \`OPENAI_API_KEY\`: Your OpenAI API key for GPT-4 Vision
- \`CLOUDINARY_CLOUD_NAME\`: Your Cloudinary cloud name
- \`CLOUDINARY_API_KEY\`: Your Cloudinary API key
- \`CLOUDINARY_API_SECRET\`: Your Cloudinary API secret

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for providing the GPT-4 Vision API
- Cloudinary for image hosting and optimization
- QuaggaJS for barcode scanning capabilities