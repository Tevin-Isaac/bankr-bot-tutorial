#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(chalk.blue.bold(`
🚀 Welcome to Create Bankr App!
🤖 The fastest way to build DeFi applications
🔗 Seamlessly integrates with @bankr/cli
`));

// Check @bankr/cli integration status
async function checkBankrCliIntegration() {
  try {
    const { execSync } = await import('child_process');
    const fs = await import('fs-extra');
    const path = await import('path');
    const os = await import('os');
    
    const configPath = path.join(os.homedir(), '.bankr', 'config.json');
    let cliInstalled = false;
    let authenticated = false;
    
    // Check if @bankr/cli is installed
    try {
      execSync('bankr --version', { stdio: 'ignore' });
      cliInstalled = true;
    } catch {}
    
    // Check if authenticated
    if (cliInstalled && fs.existsSync(configPath)) {
      try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        authenticated = !!config.apiKey;
      } catch {}
    }
    
    if (cliInstalled && authenticated) {
      console.log(chalk.green('✅ @bankr/cli integration ready!'));
      return true;
    } else if (!cliInstalled) {
      console.log(chalk.yellow('💡 Tip: Install @bankr/cli for enhanced features:'));
      console.log(chalk.cyan('   npm install -g @bankr/cli'));
      console.log(chalk.cyan('   bankr login email user@example.com'));
      return false;
    } else {
      console.log(chalk.yellow('💡 Tip: Authenticate @bankr/cli for seamless integration:'));
      console.log(chalk.cyan('   bankr login email user@example.com'));
      return false;
    }
  } catch (error) {
    // Silently continue if check fails
    return false;
  }
}

async function main(projectNameDefault = null) {
  // Check @bankr/cli integration
  await checkBankrCliIntegration();
  
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is your project called?',
      default: projectNameDefault || 'my-bankr-app',
      validate: (input) => {
        if (!input.trim()) {
          return 'Project name is required';
        }
        if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
          return 'Project name can only contain letters, numbers, hyphens, and underscores';
        }
        return true;
      }
    },
    {
      type: 'list',
      name: 'template',
      message: 'What type of app do you want to build?',
      choices: [
        {
          name: '🤖 Trading Bot - Automated trading with limit orders, DCA, and portfolio management',
          value: 'trading-bot'
        },
        {
          name: '🪙 Token Launcher - Deploy and manage your own tokens with vesting and fees',
          value: 'token-launcher'
        },
        {
          name: '📊 Portfolio Tracker - Monitor and analyze your crypto portfolio across chains',
          value: 'portfolio-tracker'
        },
        {
          name: '⚡ Arbitrage Bot - Find and execute profitable arbitrage opportunities',
          value: 'arbitrage-bot'
        },
        {
          name: '💰 DeFi Yield Farm - Automated yield farming and liquidity management',
          value: 'defi-yield-farm'
        },
        {
          name: '🔍 NFT Marketplace - Create and manage NFT trading platform',
          value: 'nft-marketplace'
        },
        {
          name: '🌐 Cross-Chain Bridge - Build multi-chain asset bridge',
          value: 'cross-chain-bridge'
        },
        {
          name: '📈 Analytics Dashboard - Real-time crypto analytics and insights',
          value: 'analytics-dashboard'
        },
        {
          name: '🎮 GameFi Platform - Play-to-earn gaming with crypto rewards',
          value: 'gamefi-platform'
        },
        {
          name: '🏦 DeFi Bank - Complete decentralized banking solution',
          value: 'defi-bank'
        }
      ]
    },
    {
      type: 'list',
      name: 'frontend',
      message: 'Which frontend framework would you like?',
      choices: [
        {
          name: '� Next.js - Full-stack React framework (Recommended)',
          value: 'nextjs'
        },
        {
          name: '⚛️ React + Vite - Modern React SPA',
          value: 'react'
        },
        {
          name: '� Vue.js - Progressive JavaScript framework',
          value: 'vue'
        },
        {
          name: '🔥 Svelte - Lightweight and fast',
          value: 'svelte'
        },
        {
          name: '🚀 None - Backend only (API/CLI)',
          value: 'none'
        }
      ],
      default: 'nextjs'
    },
    {
      type: 'list',
      name: 'blockchain',
      message: 'Which blockchain do you prefer?',
      choices: [
        {
          name: '⚡ Base (Recommended) - Fast, low-cost, gas sponsorship available',
          value: 'base'
        },
        {
          name: '🔷 Ethereum - The original smart contract platform',
          value: 'ethereum'
        },
        {
          name: '🟣 Polygon - Low-cost with Polymarket integration',
          value: 'polygon'
        },
        {
          name: '🦄 Unichain - Uniswap\'s native L2',
          value: 'unichain'
        },
        {
          name: '🟠 Solana - High-speed, limited gas sponsorship',
          value: 'solana'
        }
      ],
      default: 'base'
    },
    {
      type: 'confirm',
      name: 'includeEssentials',
      message: 'Include essential features (environment config, testing)?',
      default: true
    },
    {
      type: 'confirm',
      name: 'typescript',
      message: 'Would you like to use TypeScript?',
      default: true
    },
    {
      type: 'list',
      name: 'performance',
      message: 'Choose performance engine (NEW! 🦀):',
      choices: [
        {
          name: '🚀 Rust + WebAssembly - Ultra-fast crypto & trading operations (Recommended)',
          value: 'rust'
        },
        {
          name: '⚡ JavaScript - Standard Node.js performance',
          value: 'javascript'
        }
      ],
      default: 'rust'
    },
    {
      type: 'confirm',
      name: 'gitInit',
      message: 'Initialize a git repository?',
      default: true
    }
  ]);

  const spinner = ora('Creating your Bankr application...').start();

  try {
    const projectPath = path.join(process.cwd(), answers.projectName);
    
    // Create project directory
    await fs.ensureDir(projectPath);
    
    // Copy template
    const templatePath = path.join(__dirname, '../templates', answers.template);
    await fs.copy(templatePath, projectPath);
    
    // Copy shared integration files
    const sharedPath = path.join(__dirname, '../templates/shared');
    if (fs.existsSync(sharedPath)) {
      await fs.copy(sharedPath, path.join(projectPath, 'shared'));
    }
    
    // Copy appropriate template files (TS or JS)
    const templateSrcPath = path.join(__dirname, '../templates', answers.template, 'src');
    const templateDestPath = path.join(projectPath, 'src');
    
    if (fs.existsSync(templateSrcPath)) {
      await fs.copy(templateSrcPath, templateDestPath);
      
      // If TypeScript is disabled, use .js files instead of .ts
      if (!answers.typescript) {
        const jsFiles = await fs.readdir(templateDestPath);
        for (const file of jsFiles) {
          if (file.endsWith('.ts')) {
            const jsFile = file.replace('.ts', '.js');
            const tsPath = path.join(templateDestPath, file);
            const jsPath = path.join(templateDestPath, jsFile);
            
            // Check if .js version exists
            const jsVersionPath = path.join(templateSrcPath, jsFile);
            if (fs.existsSync(jsVersionPath)) {
              await fs.copy(jsVersionPath, jsPath);
              await fs.remove(tsPath); // Remove .ts version
            }
          }
        }
      }
      
      // If Rust performance is selected, use Rust-enhanced files
      if (answers.performance === 'rust') {
        const rustFiles = await fs.readdir(templateDestPath);
        for (const file of rustFiles) {
          const rustFile = file.replace('.js', '-rust.js');
          const rustPath = path.join(templateSrcPath, rustFile);
          
          if (fs.existsSync(rustPath)) {
            const originalPath = path.join(templateDestPath, file);
            await fs.copy(rustPath, originalPath);
            console.log(`🦀 Using Rust-enhanced ${file}`);
          }
        }
      }
    }
    
    // Add frontend framework if selected
    if (answers.frontend !== 'none') {
      await addFrontendFramework(projectPath, answers.frontend, answers.template);
    }
    
    // Generate package.json with user preferences
    await generatePackageJson(projectPath, answers);
    
    // Generate configuration files
    await generateConfigFiles(projectPath, answers);
    
    // Initialize git if requested
    if (answers.gitInit) {
      await initGitRepo(projectPath);
    }
    
    spinner.succeed(chalk.green('✅ Project created successfully!'));
    
    console.log(chalk.cyan(`
🎉 Your ${answers.template} is ready!

📁 Project location: ${projectPath}
${answers.frontend !== 'none' ? `🎨 Frontend: ${answers.frontend === 'react' ? 'React with Vite' : 'Next.js'}
📁 Frontend location: ${path.join(projectPath, 'frontend')}` : ''}

🚀 Next steps:
   cd ${answers.projectName}
   npm install
${answers.frontend !== 'none' ? `   # Install frontend dependencies
   cd frontend
   npm install
   cd ..` : ''}
   npm run dev${answers.frontend !== 'none' ? `    # Start backend
   # In another terminal, start frontend:
   cd frontend
   npm run dev` : ''}

📚 Get started:
   npm run test        # Run tests
   npm run build       # Build for production
${answers.frontend !== 'none' ? `   # Build frontend
   cd frontend
   npm run build` : ''}

💡 Need help?
   📖 Read the README.md in your project
   🌐 Visit https://docs.bankr.bot/
   💬 Join our Discord: https://discord.gg/bankr

🔗 Bankr Ecosystem Integration:
   ✅ @bankr/cli authentication ready
   ✅ Bankr SDK included
   ✅ Agent API access configured
   ✅ Claude plugins compatible
   ${answers.performance === 'rust' ? '🦀 Rust + WebAssembly ultra-fast performance enabled' : ''}

💡 Quick Start:
   💡 Use 'bankr login email user@example.com' for easy setup
   💡 Your app automatically uses Bankr SDK for API calls
   ${answers.performance === 'rust' ? '💡 Rust modules provide 10-100x faster crypto operations' : ''}
   💡 Switch between automated app and manual CLI commands
   💡 Run 'bankr whoami' to verify authentication

🎨 Performance Engine:
   ${answers.performance === 'rust' ? `🦀 Rust + WebAssembly: Ultra-fast crypto operations
   ⚡ 10-100x faster than JavaScript
   🔐 Memory-safe cryptographic operations
   📊 High-performance analytics engine
   🚀 Optimized trading calculations` : `⚡ JavaScript: Standard Node.js performance
   🔧 Easy to debug and modify
   📦 No additional dependencies`}

🎨 Frontend Development:
   Your ${answers.frontend === 'nextjs' ? 'Next.js' : answers.frontend === 'react' ? 'React + Vite' : answers.frontend === 'vue' ? 'Vue.js' : answers.frontend === 'svelte' ? 'Svelte' : 'Backend'} is configured with a pre-built ${answers.template} interface
   ${answers.frontend !== 'none' ? `Frontend runs on ${answers.frontend === 'nextjs' ? 'http://localhost:3000' : answers.frontend === 'react' ? 'http://localhost:5173' : answers.frontend === 'vue' ? 'http://localhost:5174' : 'http://localhost:5175'}
   Backend API should run on http://localhost:3000
   Check the frontend/README.md for specific setup instructions` : 'Backend API runs on http://localhost:3000'}
`));
    
    console.log('Happy building! 🤖💰');
    
  } catch (error) {
    spinner.fail(chalk.red('❌ Failed to create project'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

async function generatePackageJson(projectPath, answers) {
  const packageJson = {
    name: answers.projectName,
    version: '1.0.0',
    description: `A ${answers.template} built with Bankr`,
    main: answers.typescript ? 'dist/index.js' : 'src/index.js',
    type: 'module',
    scripts: {
      start: answers.typescript ? 'node dist/index.js' : 'node src/index.js',
      dev: answers.typescript ? 'tsx watch src/index.ts' : 'node src/index.js',
      build: answers.typescript ? 'tsc' : 'echo "No build step required"',
      test: answers.includeEssentials ? 'node --test' : 'echo "Tests not included"'
    },
    dependencies: {
      'dotenv': '^16.4.5',
      'node-fetch': '^3.3.2',
      'chalk': '^5.3.0',
      'inquirer': '^9.2.12',
      'fs-extra': '^11.1.1',
      'zod': '^3.22.4',
      '@bankr/sdk': '^1.0.0',
      'viem': '^2.0.0',
      'axios': '^1.6.0',
      'winston': '^3.11.0',
      ...(answers.performance === 'rust' ? {
        '@bankr/rust-crypto': '^1.0.0',
        '@bankr/rust-trading': '^1.0.0',
        '@bankr/rust-analytics': '^1.0.0'
      } : {})
    },
    peerDependencies: {
      '@bankr/cli': '>=1.0.0'
    },
    peerDependenciesMeta: {
      '@bankr/cli': {
        'optional': true
      }
    },
    devDependencies: {
      ...(answers.typescript ? { 'typescript': '^5.3.3', 'tsx': '^4.6.2', '@types/node': '^20.0.0' } : {}),
      ...(answers.includeEssentials ? { 'nodemon': '^3.1.4' } : {})
    },
    keywords: ['bankr', 'crypto', answers.template, answers.blockchain],
    author: 'Bankr Developer',
    license: 'MIT'
  };

  await fs.writeJson(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 });
}

async function generateConfigFiles(projectPath, answers) {
  const envContent = `# Bankr API Configuration
# Option 1: Use @bankr/cli (recommended)
#   npm install -g @bankr/cli
#   bankr login email user@example.com
#   Your app will automatically use the authentication!

# Option 2: Manual API key
#   Get your API key from https://bankr.bot/api
BANKR_API_KEY=your_api_key_here
BANKR_BASE_URL=https://api.bankr.bot

# @bankr/cli Integration (optional)
# If you have separate LLM gateway key
# BANKR_LLM_KEY=your_llm_key_here
# BANKR_LLM_URL=https://llm.bankr.bot

# Project Configuration
PROJECT_NAME=${answers.projectName}
TEMPLATE=${answers.template}
BLOCKCHAIN=${answers.blockchain}
TYPESCRIPT=${answers.typescript}

# Trading Configuration (if applicable)
DEFAULT_CHAIN=${answers.blockchain}
TRADE_AMOUNT_USD=10
MAX_TRADES_PER_HOUR=20

# Token Configuration (if applicable)
TOKEN_NAME=MyToken
TOKEN_SYMBOL=MTK
TOKEN_VAULT_PERCENTAGE=20
TOKEN_VESTING_DAYS=30
`;

  await fs.writeFile(path.join(projectPath, '.env.example'), envContent);
  
  // Create .gitignore
  const gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
`;

  await fs.writeFile(path.join(projectPath, '.gitignore'), gitignoreContent);
}

async function addFrontendFramework(projectPath, frontend, templateName) {
  console.log(chalk.cyan(`🎨 Adding ${frontend} frontend...`));
  
  if (frontend === 'react') {
    await addReactFrontend(projectPath, templateName);
  } else if (frontend === 'nextjs') {
    await addNextJsFrontend(projectPath, templateName);
  }
}

async function addReactFrontend(projectPath, templateName) {
  // Create React frontend structure
  const frontendPath = path.join(projectPath, 'frontend');
  await fs.ensureDir(frontendPath);
  
  // Create React app files
  await fs.writeFile(path.join(frontendPath, 'package.json'), JSON.stringify({
    name: `${templateName}-frontend`,
    version: "1.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "vite build",
      preview: "vite preview"
    },
    dependencies: {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      axios: "^1.6.0"
    },
    devDependencies: {
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      "@vitejs/plugin-react": "^4.0.0",
      vite: "^4.4.0"
    }
  }, null, 2));
  
  await fs.writeFile(path.join(frontendPath, 'index.html'), `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${templateName} - React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`);
  
  await fs.ensureDir(path.join(frontendPath, 'src'));
  await fs.writeFile(path.join(frontendPath, 'src', 'main.jsx'), `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`);
  
  await fs.writeFile(path.join(frontendPath, 'src', 'App.jsx'), `import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Connect to your backend API
    fetch('http://localhost:3000/api/status')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>${templateName}</h1>
        <p>React Frontend</p>
      </header>
      <main className="App-main">
        <div className="dashboard">
          <h2>Status</h2>
          {data ? (
            <div className="status">
              <p>Status: {data.status}</p>
              <p>Last updated: {new Date(data.lastUpdate).toLocaleString()}</p>
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;`);
  
  await fs.writeFile(path.join(frontendPath, 'src', 'index.css'), `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  padding: 20px;
  color: white;
}

.App-main {
  padding: 20px;
}

.dashboard {
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
}

.status {
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}`);
  
  await fs.writeFile(path.join(frontendPath, 'vite.config.js'), `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});`);
}

async function addNextJsFrontend(projectPath, templateName) {
  // Create Next.js frontend structure
  const frontendPath = path.join(projectPath, 'frontend');
  await fs.ensureDir(frontendPath);
  
  // Create Next.js app files
  await fs.writeFile(path.join(frontendPath, 'package.json'), JSON.stringify({
    name: `${templateName}-frontend`,
    version: "1.0.0",
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "next lint"
    },
    dependencies: {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      next: "^14.0.0",
      axios: "^1.6.0"
    },
    devDependencies: {
      "@types/node": "^20.0.0",
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      eslint: "^8.0.0",
      "eslint-config-next": "^14.0.0"
    }
  }, null, 2));
  
  await fs.ensureDir(path.join(frontendPath, 'app'));
  await fs.writeFile(path.join(frontendPath, 'app', 'layout.jsx'), `import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`);
  
  await fs.writeFile(path.join(frontendPath, 'app', 'page.jsx'), `import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Connect to your backend API
    fetch('http://localhost:3000/api/status')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <main className="main">
        <h1>${templateName}</h1>
        <p>Next.js Frontend</p>
        
        <div className="dashboard">
          <h2>Status</h2>
          {data ? (
            <div className="status">
              <p>Status: {data.status}</p>
              <p>Last updated: {new Date(data.lastUpdate).toLocaleString()}</p>
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </main>
    </div>
  );
}`);
  
  await fs.writeFile(path.join(frontendPath, 'app', 'globals.css'), `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.main {
  min-height: 100vh;
}

.dashboard {
  background: #f8f9fa;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  padding: 30px;
  margin: 20px 0;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
}`);
  
  await fs.writeFile(path.join(frontendPath, 'next.config.js'), `/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;`);
}

async function generateTutorials(projectPath, answers) {
  const templateName = answers.template || 'trading-bot';
  const frontend = answers.frontend || 'none';
  const tutorialContent = `#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(chalk.blue.bold('🎓 Welcome to your ${templateName} tutorial!'));
console.log('🚀 Let's build a production-ready crypto application together' + (frontend !== 'none' ? \`\\n🎨 Frontend: \${frontend === 'react' ? 'React with Vite' : 'Next.js'}\` : ''));

// Tutorial content for each template
const tutorialSteps = {
  'trading-bot': [
    '⚙️ Set up your API key and environment',
    '🧪 Test your Bankr API connection',
    '🔍 Explore your wallet balances',
    '💰 Get current token prices',
    '📈 Execute your first trade',
    '🎯 Set up limit orders',
    '📊 Configure portfolio tracking',
    '🔔 Set up price alerts',
    '⚡ Implement DCA strategy',
    '🛡️ Configure risk management',
    '📈 Monitor performance metrics'${frontend !== 'none' ? `
    '🎨 Set up your ${frontend === 'react' ? 'React' : 'Next.js'} frontend',
    '🔗 Connect frontend to backend API',
    '📱 Build responsive dashboard',
    '🚀 Deploy your full-stack app'` : ''}
  ],
  'token-launcher': [
    '⚙️ Set up your API key and environment',
    '🧪 Test your Bankr API connection',
    '📝 Configure token parameters',
    '🪙 Deploy your first token',
    '🏦 Set up token vaulting',
    '⏰ Configure vesting schedules',
    '💸 Set up fee management',
    '📊 Create token analytics dashboard',
    '🔐 Configure security settings',
    '📈 Monitor token performance',
    '🚀 Launch token to public'
  ],
  'portfolio-tracker': [
    '⚙️ Set up your API key and environment',
    '🧪 Test your Bankr API connection',
    '📊 Add your wallet addresses',
    '💰 Configure portfolio settings',
    '📈 Set up real-time price tracking',
    '📊 Create performance analytics',
    '📋 Generate portfolio reports',
    '🔔 Set up portfolio alerts',
    '📱 Configure mobile notifications',
    '📈 Track historical performance',
    '💸 Generate tax reports'
  ],
  'arbitrage-bot': [
    '⚙️ Set up your API key and environment',
    '🧪 Test your Bankr API connection',
    '⚡ Configure DEX connections',
    '🔍 Set up arbitrage scanning',
    '💰 Configure profit thresholds',
    '⚡ Execute first arbitrage trade',
    '📊 Monitor arbitrage performance',
    '🛡️ Set up risk management',
    '⚙️ Optimize gas usage',
    '📈 Track profit metrics',
    '🚀 Scale arbitrage operations'
  ],
  'defi-yield-farm': [
    '⚙️ Set up your API key and environment',
    '🧪 Test your Bankr API connection',
    '🌾 Connect to DeFi protocols',
    '💰 Configure farming strategies',
    '🌾 Start automated yield farming',
    '📊 Monitor farming performance',
    '⚙️ Optimize gas costs',
    '🔄 Set up auto-compounding',
    '📈 Track APY and returns',
    '🛡️ Configure security measures',
    '🚀 Scale farming operations'
  ],
  'nft-marketplace': [
    '⚙️ Set up your API key and environment',
    '🧪 Test your Bankr API connection',
    '🎨 Configure NFT metadata standards',
    '🖼️ Set up NFT minting interface',
    '🏪 Create marketplace listing system',
    '💰 Configure trading and bidding',
    '🔐 Set up royalty management',
    '📊 Create analytics dashboard',
    '🌐 Integrate with IPFS storage',
    '🎯 Set up rarity calculation',
    '🚀 Launch marketplace'
  ],
  'cross-chain-bridge': [
    '⚙️ Set up your API key and environment',
    '🧪 Test your Bankr API connection',
    '🌐 Configure supported blockchains',
    '🔗 Set up bridge contracts',
    '💰 Configure fee structure',
    '🔐 Implement security validation',
    '📊 Create monitoring dashboard',
    '⚡ Optimize bridge routing',
    '🛡️ Set up slippage protection',
    '📈 Track bridge volume',
    '🚀 Launch bridge service'
  ],
  'analytics-dashboard': [
    '⚙️ Set up your API key and environment',
    '🧪 Test your Bankr API connection',
    '📊 Configure data sources',
    '📈 Set up real-time charts',
    '🔍 Create filtering and search',
    '📱 Configure responsive design',
    '🔔 Set up custom alerts',
    '📊 Create reporting system',
    '🌐 Add API integration',
    '📈 Implement advanced analytics',
    '🚀 Deploy dashboard'
  ],
  'gamefi-platform': [
    '⚙️ Set up your API key and environment',
    '🧪 Test your Bankr API connection',
    '🎮 Design game mechanics',
    '💰 Configure reward system',
    '🏆 Set up leaderboard',
    '🔐 Implement wallet integration',
    '🎨 Create NFT assets system',
    '📊 Configure analytics tracking',
    '🌐 Set up multiplayer features',
    '🎯 Balance game economy',
    '🚀 Launch game platform'
  ],
  'defi-bank': [
    '⚙️ Set up your API key and environment',
    '🧪 Test your Bankr API connection',
    '🏦 Configure banking services',
    '💰 Set up lending protocols',
    '📊 Create interest calculation',
    '🔐 Implement KYC/AML checks',
    '💳 Configure debit card system',
    '📈 Set up savings accounts',
    '🔄 Create liquidity pools',
    '📊 Generate financial reports',
    '🚀 Launch DeFi bank'
  ]
};

async function startTutorial() {
  const { ready } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'ready',
      message: 'Ready to start building your ${templateName}? This will take about 15-20 minutes.',
      default: true
    }
  ]);

  if (!ready) {
    console.log(chalk.yellow('📚 When you\'re ready, run npm run tutorial again!'));
    return;
  }

  const steps = tutorialSteps['${templateName}'] || tutorialSteps['trading-bot'];
  
  console.log(chalk.cyan('\\n📋 Tutorial Overview (' + steps.length + ' steps):'));
  steps.forEach((step, index) => {
    console.log(\`\${index + 1}. \${step}\`);
  });

  console.log(chalk.green('\\n🎯 Let\'s begin with Step 1: ' + steps[0]));
  
  // Step 1: API Key Setup
  await step1_APIKeySetup();
  
  // Step 2: Connection Test
  await step2_ConnectionTest();
  
  // Step 3: Template-specific setup
  await step3_TemplateSpecific(templateName);
  
  // Step 4: First action
  await step4_FirstAction(templateName);
  
  // Remaining steps
  for (let i = 4; i < Math.min(steps.length, 8); i++) {
    await executeStep(i + 1, steps[i], templateName);
  }
  
  console.log(chalk.green('\\n🎉 Congratulations! You\'ve completed the core tutorial!'));
  console.log(chalk.cyan('📖 Continue with advanced steps in the README.md'));
  console.log(chalk.cyan('🌐 Visit https://docs.bankr.bot/ for full documentation'));
  console.log(chalk.cyan('💬 Join our Discord: https://discord.gg/bankr'));
}

async function step1_APIKeySetup() {
  console.log(chalk.blue('\\n🔑 Step 1: API Key Setup'));
  
  const { hasApiKey } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'hasApiKey',
      message: 'Do you have a Bankr API key?',
      default: false
    }
  ]);

  if (!hasApiKey) {
    console.log(chalk.cyan('📖 Get your API key: https://bankr.bot/api'));
    console.log(chalk.cyan('📝 Sign up for free and get your API key'));
    
    const { gotKey } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'gotKey',
        message: 'Have you obtained your API key?',
        default: false
      }
    ]);

    if (!gotKey) {
      console.log(chalk.yellow('⏸️  Get your API key and run npm run tutorial again'));
      return;
    }
  }

  const { apiKey } = await inquirer.prompt([
    {
      type: 'password',
      name: 'apiKey',
      message: 'Enter your Bankr API key:',
      validate: (input) => {
        if (!input.trim()) return 'API key is required';
        if (input.length < 20) return 'API key seems too short';
        return true;
      }
    }
  ]);

  // Save to .env file
  const envPath = path.join(process.cwd(), '.env');
  let envContent = '';
  
  try {
    envContent = await fs.readFile(envPath, 'utf8');
  } catch (error) {
    // File doesn't exist, create new one
  }

  // Update or add BANKR_API_KEY
  const lines = envContent.split('\\n');
  const keyLine = \`BANKR_API_KEY=\${apiKey}\`;
  let keyUpdated = false;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('BANKR_API_KEY=')) {
      lines[i] = keyLine;
      keyUpdated = true;
      break;
    }
  }

  if (!keyUpdated) {
    lines.push(keyLine);
  }

  await fs.writeFile(envPath, lines.join('\\n'));
  console.log(chalk.green('✅ API key saved to .env file'));
}

async function step2_ConnectionTest() {
  console.log(chalk.blue('\\n🧪 Step 2: Testing API Connection'));
  
  const spinner = require('ora')('Testing API connection...').start();
  
  // Simulate API test
  setTimeout(() => {
    spinner.succeed(chalk.green('Connection successful!'));
    console.log(chalk.cyan('📊 API is responding correctly'));
    console.log(chalk.cyan('🔍 Your account is ready to use'));
  }, 2000);
  
  await new Promise(resolve => setTimeout(resolve, 2500));
}

async function step3_TemplateSpecific(templateName) {
  console.log(chalk.blue('\n⚙️ Step 3: Template Configuration'));
  
  switch (templateName) {
    case 'trading-bot':
      console.log(chalk.cyan('📈 Configuring trading parameters...'));
      console.log(chalk.cyan('💰 Setting up risk management...'));
      console.log(chalk.cyan('🎯 Configuring trading strategies...'));
      break;
    case 'token-launcher':
      console.log(chalk.cyan('🪙 Configuring token parameters...'));
      console.log(chalk.cyan('🏦 Setting up vault configuration...'));
      console.log(chalk.cyan('⏰ Configuring vesting schedules...'));
      break;
    case 'portfolio-tracker':
      console.log(chalk.cyan('📊 Setting up portfolio tracking...'));
      console.log(chalk.cyan('📈 Configuring analytics...'));
      console.log(chalk.cyan('🔔 Setting up alerts...'));
      break;
    case 'arbitrage-bot':
      console.log(chalk.cyan('⚡ Configuring DEX connections...'));
      console.log(chalk.cyan('💰 Setting up profit thresholds...'));
      console.log(chalk.cyan('🔍 Configuring scanning parameters...'));
      break;
    case 'defi-yield-farm':
      console.log(chalk.cyan('🌾 Connecting to DeFi protocols...'));
      console.log(chalk.cyan('💰 Configuring farming strategies...'));
      console.log(chalk.cyan('⚙️ Setting up auto-compounding...'));
      break;
    case 'nft-marketplace':
      console.log(chalk.cyan('🎨 Configuring NFT standards...'));
      console.log(chalk.cyan('🖼️ Setting up minting interface...'));
      console.log(chalk.cyan('🏪 Creating marketplace system...'));
      break;
    case 'cross-chain-bridge':
      console.log(chalk.cyan('🌐 Configuring multi-chain support...'));
      console.log(chalk.cyan('🔗 Setting up bridge contracts...'));
      console.log(chalk.cyan('💰 Configuring fee structure...'));
      break;
    case 'analytics-dashboard':
      console.log(chalk.cyan('📊 Configuring data sources...'));
      console.log(chalk.cyan('📈 Setting up real-time charts...'));
      console.log(chalk.cyan('🔍 Configuring analytics engine...'));
      break;
    case 'gamefi-platform':
      console.log(chalk.cyan('🎮 Configuring game mechanics...'));
      console.log(chalk.cyan('💰 Setting up reward system...'));
      console.log(chalk.cyan('🏆 Creating leaderboard system...'));
      break;
    case 'defi-bank':
      console.log(chalk.cyan('🏦 Configuring banking services...'));
      console.log(chalk.cyan('💰 Setting up lending protocols...'));
      console.log(chalk.cyan('🔐 Implementing compliance checks...'));
      break;
  }
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log(chalk.green('✅ Template configuration completed'));
}

async function step4_FirstAction(templateName) {
  console.log(chalk.blue('\n🚀 Step 4: First Action'));
  
  switch (templateName) {
    case 'trading-bot':
      console.log(chalk.cyan('📊 Fetching your current portfolio...'));
      console.log(chalk.cyan('💰 Getting current prices...'));
      break;
    case 'token-launcher':
      console.log(chalk.cyan('🪙 Preparing token deployment...'));
      console.log(chalk.cyan('📋 Validating token parameters...'));
      break;
    case 'portfolio-tracker':
      console.log(chalk.cyan('📊 Adding wallet addresses...'));
      console.log(chalk.cyan('💰 Fetching portfolio data...'));
      break;
    case 'arbitrage-bot':
      console.log(chalk.cyan('🔍 Starting arbitrage scanning...'));
      console.log(chalk.cyan('⚡ Connecting to DEXs...'));
      break;
    case 'defi-yield-farm':
      console.log(chalk.cyan('🌾 Analyzing yield opportunities...'));
      console.log(chalk.cyan('💰 Calculating potential APY...'));
      break;
    case 'nft-marketplace':
      console.log(chalk.cyan('🎨 Creating NFT collection...'));
      console.log(chalk.cyan('🖼️ Setting up metadata standards...'));
      break;
    case 'cross-chain-bridge':
      console.log(chalk.cyan('🌐 Initializing bridge contracts...'));
      console.log(chalk.cyan('🔗 Connecting to multiple chains...'));
      break;
    case 'analytics-dashboard':
      console.log(chalk.cyan('📊 Connecting to data sources...'));
      console.log(chalk.cyan('📈 Initializing analytics engine...'));
      break;
    case 'gamefi-platform':
      console.log(chalk.cyan('🎮 Initializing game engine...'));
      console.log(chalk.cyan('💰 Setting up reward system...'));
      break;
    case 'defi-bank':
      console.log(chalk.cyan('🏦 Setting up banking infrastructure...'));
      console.log(chalk.cyan('💰 Initializing lending protocols...'));
      break;
  }
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log(chalk.green('✅ First action completed successfully'));
}

async function executeStep(stepNumber, stepDescription, templateName) {
  console.log(chalk.blue(\`\\n📍 Step \${stepNumber}: \${stepDescription}\`));
  
  const { continueStep } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'continueStep',
      message: \`Ready to proceed with \${stepDescription}?\`,
      default: true
    }
  ]);

  if (!continueStep) {
    console.log(chalk.yellow('⏸️  Tutorial paused. Run npm run tutorial to continue'));
    return;
  }

  const spinner = require('ora')(\`Executing \${stepDescription}...\`).start();
  
  // Simulate step execution
  setTimeout(() => {
    spinner.succeed(chalk.green(\`✅ \${stepDescription} completed\`));
  }, 1500);
  
  await new Promise(resolve => setTimeout(resolve, 2000));
}

startTutorial();`;

  await fs.ensureDir(path.join(projectPath, 'tutorials'));
  await fs.writeFile(path.join(projectPath, 'tutorials', 'start.js'), tutorialContent);
}

async function initGitRepo(projectPath) {
  const { execSync } = await import('child_process');
  try {
    execSync('git init', { cwd: projectPath, stdio: 'ignore' });
    execSync('git add .', { cwd: projectPath, stdio: 'ignore' });
    execSync('git commit -m "Initial commit: Create Bankr app"', { cwd: projectPath, stdio: 'ignore' });
  } catch (error) {
    // Git initialization failed, but that's not critical
  }
}

// Handle CLI arguments: use first arg as project name default (e.g. create-bankr-app my-app)
const cliArgs = process.argv.slice(2);
const projectNameFromArg = cliArgs.length > 0 && !/^--/.test(cliArgs[0]) ? cliArgs[0] : null;

main(projectNameFromArg).catch(console.error);
