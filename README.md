# belphion site

This is the Angular Single Page Application (SPA) port of the portfolio website [belphion.com](https://belphion.com/). Built using Angular v19, it replicates the original design aesthetic, animations, and typography using modern standalone components and custom responsive CSS layouts.

---

## Prerequisites

Before running this project, ensure you have the following software installed on your PC:

1.  **Node.js**: Recommended version **v20.x or v22.x (LTS)**.
    *   Download and install from: [nodejs.org](https://nodejs.org/)
2.  **npm (Node Package Manager)**: Included automatically with the Node.js installation (Version 10.x or newer is recommended).
3.  **Angular CLI (Optional but recommended globally)**:
    *   To install the Angular CLI globally, run the following command in your terminal:
        ```bash
        npm install -g @angular/cli
        ```
    *   *Note: If you prefer not to install it globally, you can prefix any `ng` command with `npx` (e.g., `npx ng serve`).*

---

## Step-by-Step Installation

Follow these steps to set up and run the project locally on your machine:

### 1. Clone or Open the Directory
Navigate to the project root directory in your command line:
```bash
cd path/to/belphion
```

### 2. Install Project Dependencies
Run `npm install` to download and install all the project-specific dependencies specified in `package.json` (such as Angular compiler, router, and configuration libraries):
```bash
npm install
```

### 3. Start the Local Development Server
Launch the development server by running:
```bash
npm run start
```
*(Alternatively, you can run `ng serve` or `npx ng serve`)*.

### 4. Preview the Site
Once the build completes, open your web browser and navigate to:
```
http://localhost:4200/
```
The application supports **Hot Module Replacement (HMR)** and will automatically compile and reload in the browser whenever you make changes to any source file.

---

## Project Structure & Architecture

*   **Static Assets**: All media assets, icons, and original high-resolution background/cover images are migrated locally and stored under the root [/public/images](file:///z:/SynologyDrive/Projects/belphion/public/images) directory.
*   **Routing**: Page routing is configured in [app.routes.ts](file:///z:/SynologyDrive/Projects/belphion/src/app/app.routes.ts):
    *   `/` -> `HomeComponent` (cover branding, timeline, showreel)
    *   `/design` -> `DesignComponent` (tab-based portfolio with posters, cards)
    *   `/photo` -> `PhotoComponent` (tab-based photography portfolio)
    *   `/motion` -> `MotionComponent` (8-video Vimeo embed grid)
    *   `/vectober` -> `VectoberComponent` (annual drawing directories from 2018-2025)
    *   `/links` -> `LinksComponent` (social card directory links)
*   **Global Styling**: Custom flex grids, margins, transitions, and the image click-to-zoom (lightbox modal) behavior are managed inside [styles.css](file:///z:/SynologyDrive/Projects/belphion/src/styles.css).
*   **Security & Embedding**: Dynamic Vimeo showreel iframes are safely processed through the custom `SafePipe` component located inside `motion.component.ts`.

---

## Building for Production

To compile a highly optimized production bundle of the website:
```bash
npm run build
```
*(Alternatively, run `ng build` or `npx ng build`)*.

This creates compiled HTML, CSS, JavaScript, and asset files in the following directory:
```
dist/belphion/browser/
```

---

## Deploying to Cloudflare Pages

This SPA is configured specifically for static site hosting. To deploy the build folder to Cloudflare:

### Method A: Direct Folder Upload (Manual)
1.  Run the production build: `npm run build`.
2.  Login to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
3.  Navigate to **Workers & Pages** -> **Create Application** -> **Pages** -> **Upload assets**.
4.  Drag and drop the folder `dist/belphion/browser` to deploy it.

### Method B: Git Integration (Continuous Deployment)
1.  Connect your Git repository (GitHub/GitLab) to Cloudflare Pages.
2.  Set the following build configuration parameters:
    *   **Framework preset**: `Angular`
    *   **Build command**: `npm run build`
    *   **Build output directory**: `dist/belphion/browser`
3.  Save and deploy. Cloudflare will automatically trigger a new build on every commit.
