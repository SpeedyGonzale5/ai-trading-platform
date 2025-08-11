# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI Trading Platform built with React that provides real-time portfolio monitoring, trading interfaces, and market data visualization. The platform integrates with multiple APIs (CoinGecko, Binance WebSocket) to deliver live trading capabilities.

## Core Development Philosophy

### KISS (Keep It Simple, Stupid)
Simplicity is a key design goal. Choose straightforward solutions. Simple solutions are easier to understand, maintain, and debug.

### YAGNI (You Aren't Gonna Need It)
Avoid building functionality on speculation. Implement features only when they are needed.

### Design Principles
- **Dependency Inversion**: High-level modules should depend on abstractions, not on low-level modules.
- **Open/Closed Principle**: Software entities should be open for extension but closed for modification.
- **Single Responsibility**: Each function, component, and module should have one clear purpose.
- **Fail Fast**: Check for potential errors early and handle them immediately.

## 🧱 Code Structure & Modularity

### File and Function Limits
- **Files should not exceed 500 lines of code**. Refactor into smaller modules if approaching this limit.
- **Functions should be under 50 lines** with a single, clear responsibility.
- **Components should be under 150 lines** and represent a single UI concept.
- **Organize code into clearly separated modules**, grouped by feature or responsibility.
- **Use `npm`** for all package management and script execution.

### Project Architecture
Follow a strict vertical slice architecture. Create a dedicated folder for each major feature.

src/
components/
common/ # Reusable buttons, cards, etc.
dashboard/ # Portfolio dashboard components
trading/ # Trading interface components
...
services/
mockApi.js # Mock data generation
websocket.js # WebSocket connection logic
styles/
main.css # Global styles (Tailwind base)
types/
data-structures.js # JSDoc type definitions
App.jsx # Main application component
index.js # Entry point

<!-- NOTE: This structure is adapted for a standard React project. -->

## 🛠️ Development Environment

### NPM Package Management
This project uses NPM for package and environment management.

```bash
# Install dependencies
npm install

# Add a package
npm install react-router-dom

# Add a development dependency
npm install --save-dev eslint prettier

# Remove a package
npm uninstall react-router-dom

# Run scripts
npm run dev
npm run test

<!-- NOTE: Replaced Python's `uv` with `npm` for JavaScript projects. -->
📋 Style & Conventions
JavaScript Style Guide
Follow a consistent style, enforced by ESLint and Prettier.
Line length: 100 characters (enforced by Prettier).
Use single quotes for strings.
Use JSDoc comments for function signatures and type definitions.
Format with Prettier on save.
JSDoc Standards
Use JSDoc for all public functions to describe types, parameters, and return values.

/**
 * Calculates the total value of tokens in a portfolio.
 * @param {Array<Object>} tokens - An array of token objects.
 * @param {string} tokens[].symbol - The token's symbol.
 * @param {number} tokens[].balance - The amount of the token owned.
 * @param {number} tokens[].price - The current price of the token.
 * @returns {number} The total calculated portfolio value.
 *
 * @example
 * const tokens = [{ symbol: 'BTC', balance: 0.5, price: 60000 }];
 * const value = calculatePortfolioValue(tokens); // returns 30000
 */
function calculatePortfolioValue(tokens) {
  // ... implementation
}

<!-- NOTE: Replaced Python docstrings with JavaScript's JSDoc standard. -->
Naming Conventions
Variables and functions: camelCase
Classes/Components: PascalCase
Constants: UPPER_SNAKE_CASE
Private properties/methods: _leadingUnderscore
🧪 Testing Strategy
Testing Best Practices (using Jest)
Use descriptive test names: test('should calculate portfolio value correctly').
Test edge cases and error conditions.
Use describe blocks to group related tests.

// Example using Jest
import { calculatePortfolioValue } from './utils';

describe('calculatePortfolioValue', () => {
  test('should return 0 for an empty portfolio', () => {
    expect(calculatePortfolioValue([])).toBe(0);
  });

  test('should calculate the total value correctly for multiple tokens', () => {
    const tokens = [
      { symbol: 'BTC', balance: 0.5, price: 60000 },
      { symbol: 'ETH', balance: 10, price: 3000 },
    ];
    expect(calculatePortfolioValue(tokens)).toBe(60000);
  });
});
<!-- NOTE: Replaced `pytest` examples with `Jest`, a popular JS testing framework. -->
🚨 Error Handling
Use try...catch blocks for asynchronous operations like API calls.
Create custom Error classes for domain-specific errors (e.g., ApiError).

class ApiError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchData() {
  try {
    const response = await fetch('...');
    if (!response.ok) {
      throw new ApiError('Failed to fetch data');
    }
  } catch (error) {
    console.error(error);
  }
}

🔧 Configuration Management
Use environment variables for API keys and other secrets.
Create a .env file for local development and a .env.example file to be committed to git. Use a library like dotenv.
🔄 Git Workflow
main branch is for production-ready code.
Create new branches for features (feature/add-trading-panel) and fixes (fix/portfolio-bug).
Use descriptive commit messages (e.g., feat(trading): add limit order functionality).
⚠️ Important Notes
NEVER ASSUME OR GUESS: When in doubt, ask for clarification.
Always verify file paths before modifying.
Keep this CLAUDE.md updated.
No feature is complete without tests.
Document your decisions with comments.

🔍 Search Command Requirements
CRITICAL: Always use rg (ripgrep) instead of traditional grep and find commands:

# ❌ Don't use grep
grep -r "pattern" .

# ✅ Use rg instead
rg "pattern"

# ❌ Don't use find with name
find . -name "*.py"

# ✅ Use rg with file filtering
rg --files | rg "\.py$"
# or
rg --files -g "*.py"
Enforcement Rules:

(
    r"^grep\b(?!.*\|)",
    "Use 'rg' (ripgrep) instead of 'grep' for better performance and features",
),
(
    r"^find\s+\S+\s+-name\b",
    "Use 'rg --files | rg pattern' or 'rg --files -g pattern' instead of 'find -name' for better performance",
),
🚀 GitHub Flow Workflow Summary
main (protected) ←── PR ←── feature/your-feature ↓ ↑ deploy development

Daily Workflow:
git checkout main && git pull origin main
git checkout -b feature/new-feature
Make changes + tests
git push origin feature/new-feature
Create PR → Review → Merge to main
This document is a living guide. Update it as the project evolves and new patterns emerge.