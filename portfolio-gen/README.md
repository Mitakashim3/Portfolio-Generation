# Portfolio Generator with Reinforcement Learning

A prototype **portfolio generator** that uses Next.js for the frontend and Python reinforcement learning for intelligent configuration optimization. The system learns from user feedback to suggest better portfolio layouts, themes, and components.

## 🏗️ Architecture

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Storage**: Local JSON files (no database required)
- **Training**: Python reinforcement learning with PyTorch
- **API**: RESTful endpoints for configuration and feedback

## 📁 Project Structure

```
portfolio-gen/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Main portfolio rendering page
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── editor/
│   │   └── page.tsx              # Portfolio editor interface
│   └── api/
│       ├── generate/
│       │   └── route.ts          # Config generation API
│       └── feedback/
│           └── route.ts          # Feedback logging API
├── components/
│   ├── models/
│   │   └── PortfolioConfig.ts    # TypeScript interfaces
│   ├── ui/
│   │   ├── Button.tsx            # Reusable UI components
│   │   └── Card.tsx
│   └── layout/
│       ├── Header.tsx            # Portfolio sections
│       ├── Hero.tsx
│       ├── Projects.tsx
│       └── Footer.tsx
├── training/
│   ├── config.json               # Current portfolio configuration
│   ├── feedback.json             # User feedback events log
│   └── python/
│       ├── env.py                # RL environment
│       ├── agent.py              # RL agent implementation
│       ├── reward.py             # Reward calculation
│       ├── train.py              # Training orchestration
│       └── requirements.txt      # Python dependencies
├── package.json                  # Node.js dependencies
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── README.md                     # This file
```

## 🚀 Quick Start

### 1. Install Dependencies

**Frontend (Node.js):**
```bash
cd portfolio-gen
npm install
```

**Backend (Python):**
```bash
cd training/python
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
```

### 2. Start Development Server

```bash
# In the main directory
npm run dev
```

The application will be available at:
- **Portfolio**: http://localhost:3000
- **Editor**: http://localhost:3000/editor

### 3. Train the RL Model

```bash
# In training/python directory
python train.py --episodes 100
```

## 📖 How It Works

### 1. Portfolio Rendering (`app/page.tsx`)

The main page dynamically renders portfolio components based on `training/config.json`:

```typescript
// Loads config.json and renders components conditionally
const config = await getPortfolioConfig();
config.components.map(componentName => {
  const Component = componentMap[componentName];
  return <Component key={componentName} className={animationClass} />;
});
```

### 2. User Feedback Collection (`app/editor/page.tsx`)

The editor captures user interactions and logs them as feedback events:

```typescript
// Every user action is logged for training
const logFeedback = async (event: string, details?: Record<string, any>) => {
  const feedbackEvent: FeedbackEvent = {
    timestamp: new Date().toISOString(),
    sessionId: 'editor-session',
    event,
    details,
  };
  await fetch('/api/feedback', { method: 'POST', body: JSON.stringify(feedbackEvent) });
};
```

### 3. Reinforcement Learning Training (`training/python/`)

The RL system uses feedback to train an agent:

1. **Environment** (`env.py`): Gym-like interface for portfolio configuration
2. **Rewards** (`reward.py`): Dynamic reward calculation based on feedback
3. **Agent** (`agent.py`): Policy network that learns optimal configurations
4. **Training** (`train.py`): Orchestrates the training process

## 🎯 Reward System

The system calculates rewards based on four types of feedback:

```python
def compute_reward(kept=0, changed=0, edits=0, minutes=0, likes=0, dislikes=0, 
                  stars=3, approvals=0, rejections=0, published=0, abandoned=0):
    R_implicit = (kept * 1) + (changed * -1) + (edits * -2) + (minutes * 0.5)
    R_explicit = (likes * 5) + (dislikes * -3) + ((stars - 3) * 2)
    R_dev = (approvals * 8) + (rejections * -8)
    R_system = (published * 10) + (abandoned * -10)
    return (R_implicit * 1) + (R_explicit * 1.5) + (R_dev * 2) + (R_system * 2)
```

### Feedback Types:

- **Implicit**: User behavior (keeping/changing elements, time spent)
- **Explicit**: Direct feedback (likes, ratings)
- **Developer**: Expert evaluation (approvals/rejections)
- **System**: Final outcomes (published/abandoned)

## 🛠️ API Endpoints

### GET/POST `/api/generate`
- **GET**: Returns current portfolio configuration
- **POST**: Updates configuration and saves to `config.json`

### POST `/api/feedback`
- Logs feedback events to `feedback.json`
- Returns calculated reward for the event

### Example API Usage:

```javascript
// Update configuration
const response = await fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    theme: 'dark',
    layout: 'grid',
    components: ['navbar', 'hero', 'projects']
  }),
});

// Log feedback
await fetch('/api/feedback', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    event: 'like',
    timestamp: new Date().toISOString(),
    details: { section: 'hero' }
  }),
});
```

## 🧠 Machine Learning Features

### Environment Actions (16 total)
- Change theme (light/dark)
- Change layout (single/grid/timeline)
- Toggle components (navbar, hero, projects, contact)
- Change typography (sans/serif/mono)
- Toggle animations (fade-in, slide-up)
- Publish/unpublish

### State Representation
Portfolio configurations are converted to fixed-size numerical vectors for neural network processing.

### Training Options
1. **Simple Policy Gradient**: Basic PyTorch implementation
2. **Stable-Baselines3**: Advanced PPO algorithm (if installed)

## 📊 Training and Evaluation

### Basic Training
```bash
python train.py --episodes 50
```

### Advanced Training with Stable-Baselines3
```bash
pip install stable-baselines3
python train.py --episodes 200 --use-sb3
```

### Training Output
The training script generates:
- **Model files**: `simple_model.pth` or `sb3_model.zip`
- **Improved config**: `improved_config.json`
- **Training logs**: Detailed training metrics and analysis

## 🎨 Customization

### Adding New Components
1. Create component in `components/layout/`
2. Add to component mapping in `app/page.tsx`
3. Update actions in `training/python/env.py`

### Modifying Reward Function
Edit `training/python/reward.py` to adjust reward calculations:

```python
# Example: Increase reward for specific themes
if action_value == "dark":
    reward += 1.0  # Increased from 0.5
```

### Adding New Feedback Events
Update the editor to log new event types:

```typescript
// Log custom feedback
logFeedback('custom_event', { 
  customData: 'value',
  timestamp: Date.now() 
});
```

## 🐛 Troubleshooting

### Common Issues

1. **TypeScript Errors**: The scaffolded code has expected TypeScript errors until dependencies are installed:
   ```bash
   npm install  # This will resolve most TypeScript issues
   ```

2. **Python Import Errors**: Ensure virtual environment is activated:
   ```bash
   cd training/python
   source .venv/bin/activate  # or .venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```

3. **File Not Found Errors**: The app creates missing JSON files automatically, but ensure proper permissions in the `training/` directory.

4. **Port Conflicts**: Change the development port if 3000 is occupied:
   ```bash
   npm run dev -- -p 3001
   ```

### Development Mode
In development, the main page includes a debug panel showing the current configuration. This can be toggled by setting `NODE_ENV=development`.

## 🚀 Deployment Considerations

### For Production
1. **Replace File Storage**: Use a database instead of local JSON files
2. **API Security**: Add authentication to API endpoints
3. **Model Serving**: Deploy trained models with proper model serving infrastructure
4. **Environment Variables**: Use environment variables for configuration paths

### Example Environment Variables
```bash
# .env.local
CONFIG_PATH=/path/to/config.json
FEEDBACK_PATH=/path/to/feedback.json
MODEL_PATH=/path/to/trained/model
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes and test thoroughly
4. Submit a pull request with detailed description

## 📄 License

This project is a prototype for educational and development purposes. 

## 🔗 Dependencies

### Frontend
- Next.js 14+
- React 18+
- TypeScript 5+
- Tailwind CSS 3+

### Backend (Python)
- PyTorch 1.13+
- NumPy 1.21+
- Stable-Baselines3 1.6+ (optional)
- Gym 0.21+ (optional)

---

**Happy coding!** 🎉

For questions or issues, please check the troubleshooting section or create an issue in the repository.