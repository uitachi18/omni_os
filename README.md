# 🌌 OmniOS: The Neural Workspace

[![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4+-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-r183-black?style=for-the-badge&logo=three.js)](https://threejs.org/)

**OmniOS** is a cutting-edge, AI-native operating environment built for the future of human-computer interaction. It leverages a sophisticated multi-agent orchestration layer, spatial computing primitives, and a quantum reasoning engine to transform how you plan, create, and manage your digital life.

---

## ✨ Key Features

### 🧠 Quantum Reasoning Engine

Powered by **Google Gemini**, OmniOS processes vast amounts of context across diverse modalities (Text, Voice, Vision) to deliver high-fidelity insights and autonomous execution.

### 🤖 Agentic Swarm Orchestration

A dynamic cluster of specialized AI agents working together to solve complex tasks:

- **TravelAgent**: Logistics, real-time routing, and itinerary optimization.
- **FinanceAgent**: Budget management, deal finding, and payment reconciliation.
- **ShopperAgent**: Intelligent commerce and gear sourcing.
- **CreatorAgent**: Generative media production including images, code, music, and video.

### 🎨 Spatial Workspace

- **Omnimodal I/O**: Seamless switching between voice commands, screen sharing, camera feeds, and file uploads.
- **Generative Sandbox**: An interactive environment for rapid prototyping and creative exploration.
- **Memory Graph**: A persistent, encrypted knowledge layer that grows with you, tracking intents and context across sessions.

### 🕶️ AR / Ambient Integration

- **Vision Overlays**: Point your camera at real-world objects to trigger live AI data overlays and price comparisons.
- **Ambient Alerts**: Real-time system notifications and agent status updates delivered through a sleek, non-intrusive UI.

---

## 🛠️ Tech Stack

- **Core**: [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
- **Visuals**: [Three.js](https://threejs.org/), [@react-three/fiber](https://github.com/pmndrs/react-three-fiber), [GSAP](https://greensock.com/gsap/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **Intelligence**: [@google/genai](https://www.npmjs.com/package/@google/genai) (Gemini API)
- **State**: [Zustand](https://github.com/pmndrs/zustand)
- **Vitals**: [Lucide React](https://lucide.dev/), [Recharts](https://recharts.org/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- A Google Gemini API Key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/uitachi18/omni_os.git
   cd omni_os
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

---

## 🏗️ Architecture

OmniOS follows a modular bridge architecture:

1. **Input Bus**: Collects omnimodal data.
2. **LLM Core**: Processes intent and reasons through complexity.
3. **Orchestrator**: Routes tasks to the relevant Agent Swarm members.
4. **Tool Bus**: Interacts with the external world (Web, APIs, Files).
5. **Sandbox**: Renders output in the spatial UI.

---

## 👤 Creator

Created with ❤️ by **[uitachi18](https://github.com/uitachi18)**.

---

## 📄 License

This project is private and proprietary. All rights reserved.
