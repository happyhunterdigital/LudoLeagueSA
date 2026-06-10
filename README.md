# Ludo League South Africa (LLSA) Portal & Circuit Engine

This repository serves as the official governing, operational, and commercial gateway for The Ludo League South Africa (LLSA). It coordinates tournament registrations, physical merchandise distribution, and local community funding across South Africa's most competitive circuits, including Pretoria, Mamelodi, Soweto, and Alexandra.

The codebase is built on a phygital ecosystem, combining physical tournament play with a secure serverless cloud infrastructure to professionalize Ludo from a backyard hobby into a structured, nationally recognized competitive discipline.

---

## Core Vision & Key Advantages

All technical operations and features on the platform align strictly with the four foundational pillars of LLSA:

- SCREEN-FREE CLASSROOM LEARNING: Through the Ludo4Schools initiative, LLSA inserts physical strategy play directly into primary and secondary classrooms to enhance spatial geometry, logical reasoning, and cognitive math skills.

- 100% LOCAL TOWNSHIP MANUFACTURING: LLSA keeps economic value circular by sourcing high-density 3mm and 6mm MDF timber boards and acrylic token pieces directly from carpentry, tailoring, and artisan workshops inside South African townships.

- STANDARDIZED TOURNAMENT FAIRNESS: Casual home rules are eliminated in favor of strict, standardized rulesets, professional time-controls, and certified referees to maintain athletic integrity.

- SPONSORSHIPS AND GRANTS: Technical operations, prize pools, and school supply shipments are directly sustained via nominal parent subscriptions and corporate CSI grants.

---

## Core Application Architecture

This project is partitioned into distinct frontend and serverless backend environments:

- FRONTEND APPLICATION: A single-page client built with React 18, Vite, TypeScript, and standard Tailwind CSS v3. View orchestrations are managed cleanly without external routing weight via scroll-linked section logic.

- CLOUD INFRASTRUCTURE: Backed by Firebase Authentication, Cloud Firestore (for event registrations and logs), and Firebase Storage (for verified manual EFT proof receipts).

- SERVERLESS CLOUD FUNCTIONS: Operational triggers run inside the Node.js 20 runtime environment as Firebase Functions v2, isolated specifically to the us-central1 region.

- PAYMENT SYSTEMS: The commercial architecture strictly uses Payfast redirect interfaces and manual EFT verification workflows. All references, SDKs, and configurations for third-party systems like Stripe have been completely purged from the codebase.

---

## Developer Code Standards & Constraints

To maintain absolute task completion fidelity and prevent architectural drift, all engineers must adhere to these strict development protocols:

- STRICT 250-LINE LIMIT: To prevent massive file blocks and protect readability, no single frontend component file may exceed 250 lines of code. If a component grows past this limit, it must be surgically split into modular, isolated files.

- ZERO-HALLUCINATION CODING MODE: You must write code based strictly on dependencies, structures, and schemas verified inside the config directories. Never introduce imaginary third-party dependencies, unverified asset folders, or arbitrary API routes.

- SYNTHETIC AND PATH RESOLUTION RULES: The compilation utilizes typescript with allowSyntheticDefaultImports and allowImportingTsExtensions configured inside tsconfig.json. This maintains compiler harmony for Vite modules.

- TAILWIND DESIGN RULES: Styling must strictly utilize standard PostCSS directives. Avoid direct directory node_modules imports within the main stylesheet, allowing Tailwind to scan and compile the utility classes cleanly.

---

## Installation & Local Development Setup

To configure, install, and execute the project locally, verify that you have Node.js 20 or newer installed, then perform the following steps:

### 1. Configure the Local Environment
Copy the example environment file and populate it with your specific Firebase configurations and DeepSeek AI keys:

cp .env.example .env.local

### 2. Install Frontend Dependencies
Run the installation command inside the root folder using standard flags:

npm install --legacy-peer-deps

### 3. Build & Run the Frontend
Execute the development server locally, or test the compiled production build:

npm run dev
npm run build

### 4. Configure & Deploy Serverless Functions
Navigate into the functions directory, install the serverless packages, compile the TypeScript source, and test the emulator configurations:

cd functions
npm install
npm run build
cd ..

---

## Production Deployment Pipeline

Deployments are automated through Firebase Hosting and Cloud Functions using standard CLI patterns or GitHub Actions. 

To deploy all environments manually, authenticate with the Firebase CLI and run:

firebase deploy --only hosting,functions --project ludoleaguesa-33371

This ensures that the static website, security rules for Firestore/Storage, and the Gen 2 Cloud Functions are accurately compiled, optimized, and deployed to your target project dashboard.
