# PhD-Level Sports Betting Analysis Prompt Generator

A comprehensive React TypeScript application that generates PhD-level sports betting analysis prompts using AI. The system extracts match data and odds from images and creates professional, academic-level prompts for sports betting analysis.

## 🚀 Features

### Core Functionality
- **AI-Powered Image Analysis**: Extract match data and odds from betting screenshots
- **PhD-Level Prompt Generation**: Create academic-level sports betting analysis prompts
- **Multi-Sport Support**: Football, Tennis, Basketball, and other sports
- **Multi-Language Support**: Generates prompts in English regardless of source language
- **Comprehensive Data Extraction**: Date, time, teams, league, venue, odds, and more

### Advanced Features
- **Real-time AI Processing**: Uses OpenAI GPT-4 for intelligent prompt generation
- **Multi-Image Support**: Process multiple screenshots simultaneously
- **Professional Analytics**: Track prompt usage, success rates, and ROI
- **Export/Import System**: Backup and share prompt collections
- **Responsive Design**: Modern UI with dark/light mode support

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom animations
- **Build Tool**: Vite
- **AI Integration**: OpenAI GPT-4 API
- **State Management**: React Hooks + Local Storage
- **Icons**: Lucide React
- **Code Quality**: ESLint + Prettier

## 📁 Project Structure

```
project/
├── src/
│   ├── components/          # React components
│   │   ├── AIGenerationModal.tsx    # AI prompt generation modal
│   │   ├── AIPromptPage.tsx         # AI prompts display page
│   │   ├── AnalyticsModal.tsx       # Analytics and statistics
│   │   ├── CategoryFilter.tsx       # Filtering components
│   │   ├── ExportImportModal.tsx    # Data export/import
│   │   ├── LoadingScreen.tsx        # Loading animations
│   │   ├── PromptCard.tsx           # Individual prompt cards
│   │   ├── PromptModal.tsx          # Prompt editing modal
│   │   └── SearchBar.tsx            # Search functionality
│   ├── data/               # Static data and prompts
│   │   ├── evScannerPrompts.ts      # EV scanner prompts
│   │   ├── initialPrompts.ts        # Default prompts
│   │   └── sportsData.ts            # Sports categories
│   ├── hooks/              # Custom React hooks
│   │   ├── useLazyLoading.ts        # Lazy loading functionality
│   │   ├── useLocalStorage.ts       # Local storage management
│   │   └── usePromptAnalytics.ts    # Analytics tracking
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts                 # Main type definitions
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   ├── index.css           # Global styles
│   └── vite-env.d.ts       # Vite environment types
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## 🎯 Key Components

### AIGenerationModal.tsx
Handles AI-powered prompt generation from images:
- Image upload via drag & drop, file picker, or clipboard paste
- Multi-image processing
- OpenAI API integration
- Match data extraction from betting screenshots
- PhD-level prompt generation

### App.tsx
Main application logic:
- State management for prompts and UI
- AI generation workflow
- Prompt management (CRUD operations)
- Analytics tracking
- Export/import functionality

### PromptCard.tsx
Displays individual prompts with:
- Rich formatting and styling
- Quick actions (edit, delete, favorite)
- Analytics display
- Responsive design

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/dailyatti/eng-prompt-elemz-.git
cd eng-prompt-elemz-
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

## 🎮 Usage

### Basic Usage
1. **Upload Images**: Drag & drop betting screenshots or use Ctrl+V to paste
2. **Select Sport**: Choose the appropriate sport category
3. **Enter API Key**: Provide your OpenAI API key
4. **Generate Prompts**: Click generate to create PhD-level analysis prompts
5. **Review & Edit**: Modify generated prompts as needed
6. **Track Analytics**: Monitor usage and success rates

### Advanced Features
- **Multi-Image Processing**: Upload multiple screenshots at once
- **Export/Import**: Backup your prompt collection
- **Analytics**: Track betting success rates and ROI
- **Favorites**: Mark and filter favorite prompts
- **Search & Filter**: Find prompts by category, sport, or tags

## 🔑 API Configuration

### OpenAI API Setup
1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. The key is used securely and not stored permanently
3. Required for AI-powered prompt generation

### Environment Variables
Create a `.env` file in the project root:
```env
VITE_OPENAI_API_KEY=your_api_key_here
```

## 📊 Data Structure

### Prompt Object
```typescript
interface Prompt {
  id: string;
  title: string;
  content: string;
  sport: string;
  category: 'traditional' | 'racing' | 'esports';
  type: 'general' | 'specific';
  tags: string[];
  isFavorite: boolean;
  usageCount: number;
  lastUsed: string;
  successRate: number;
  totalBets: number;
  winningBets: number;
  roi: number;
  createdAt: string;
  updatedAt: string;
}
```

### Match Data Structure
```typescript
interface MatchData {
  teamA: string;
  teamB: string;
  matchDate?: string;
  matchTime?: string;
  league?: string;
  venue?: string;
  matchStatus?: string;
  currentScore?: string;
  sport: string;
  odds?: {
    main1X2?: { home: string; draw: string; away: string };
    btts?: { yes: string; no: string };
    totalGoals?: { [key: string]: string | null };
    teamAGoals?: { [key: string]: string | null };
    advancement?: { teamA: string; teamB: string };
    combinations?: { [key: string]: string };
  };
}
```

## 🎨 UI/UX Features

### Design System
- **Modern Interface**: Clean, professional design
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works on all device sizes
- **Smooth Animations**: Micro-interactions and transitions
- **Accessibility**: WCAG compliant design

### User Experience
- **Intuitive Workflow**: Step-by-step prompt generation
- **Real-time Feedback**: Loading states and progress indicators
- **Error Handling**: Graceful error messages and recovery
- **Performance**: Optimized for fast loading and smooth operation

## 🔒 Security & Privacy

- **API Key Security**: Keys are not stored permanently
- **Local Storage**: All data stored locally on user's device
- **No Server**: No backend server required
- **Privacy First**: No data sent to external servers except OpenAI API

## 📈 Analytics & Tracking

### Metrics Tracked
- **Usage Count**: How many times each prompt was used
- **Success Rate**: Win/loss ratio for bets
- **ROI**: Return on investment calculations
- **Total Bets**: Number of bets placed
- **Winning Bets**: Number of successful bets

### Analytics Features
- **Visual Charts**: Success rate and ROI visualization
- **Trend Analysis**: Performance over time
- **Export Data**: Download analytics reports
- **Filtering**: View analytics by date, sport, or category

## 🚀 Performance Optimizations

- **Lazy Loading**: Components load on demand
- **Image Optimization**: Automatic image resizing and compression
- **Code Splitting**: Bundle optimization
- **Caching**: Local storage for better performance
- **Debouncing**: Search and filter optimizations

## 🧪 Testing

### Manual Testing
- **Cross-browser Testing**: Chrome, Firefox, Safari, Edge
- **Device Testing**: Desktop, tablet, mobile
- **API Testing**: OpenAI integration testing
- **UI Testing**: All user interactions and workflows

### Quality Assurance
- **TypeScript**: Type safety and error prevention
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Error Boundaries**: Graceful error handling

## 📝 Contributing

### Development Guidelines
1. **Code Style**: Follow TypeScript and React best practices
2. **Component Structure**: Use functional components with hooks
3. **Type Safety**: Define proper TypeScript interfaces
4. **Performance**: Optimize for speed and efficiency
5. **Accessibility**: Ensure WCAG compliance

### Pull Request Process
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code examples

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- AI-powered prompt generation
- Multi-sport support
- Analytics tracking
- Export/import functionality
- Responsive design
- Dark/light mode

## 🎯 Roadmap

### Future Features
- **Advanced Analytics**: Machine learning insights
- **Social Features**: Share prompts with community
- **Mobile App**: Native mobile application
- **API Integration**: More betting data sources
- **Advanced AI**: Custom AI models for specific sports

---

**Built with ❤️ using React, TypeScript, and OpenAI GPT-4** 