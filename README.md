# Project Name: Next.js Project Management & Data Visualization

## Objective:

This project is a Next.js-based web application designed to provide users with project management capabilities, Firebase authentication, data visualization, and map integration. The app allows users to log in, manage projects, view data visualizations, and explore project locations on a map.

## Features:

- **Firebase Authentication**: Email/password authentication with persistent login.
- **Project Management**: Users can search, view, and manage project details.
- **Map Integration**: Projects' locations displayed on a map using Open Layers.
- **Data Visualization**: Includes a responsive line chart displaying project-related data.

---

## Requirements:

### User Authentication (Firebase Auth)

- Implement email/password authentication using Firebase Auth.
  - **Completed**:
    - Login screen ✅
    - Signup screen ✅
    - Forgot password functionality ✅
    - Logout button ✅
    - Persistent authentication (stay logged in after refreshing/closing the app) ✅

### Project Management

- Upon logging in, users are redirected to the Project Screen, which includes:
  - **Project Search**: A search bar to filter projects by name ✅
  - **Project List**: A list of preloaded sample projects (at least 2-3) ✅
  - **Project Details**: Click on a project to view its details, including:
    - Images Section ✅
    - Videos Section ✅

### Map Integration

- **Map Screen**: Display project locations on a map using Open Layers.
  - **Completed**:
    - Displays sample project locations ✅
    - Project markers are interactive (clicking a marker shows project details) ✅

### Data Visualization (Charts)

- **Charts Page**: Similar to the Map Page, this page includes a sample line chart (using ReCharts, Chart.js, or React-chartjs-2) to display project-related data.
  - **Completed**: Responsive line chart displaying sample data ✅

---

## Tech Stack:

- **Frontend**: Next.js (React)
- **Authentication**: Firebase Authentication
- **Map**: Open Layers
- **Charts**: d3
- **Styling**: Tailwind

---

## Setup Instructions:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/project-repo.git
   cd project-repo
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Firebase Configuration**:

   - Create a Firebase project and set up Firebase Authentication.
   - Add your Firebase credentials to the `.env.local` file:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
     NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
     ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Your app will be available at [http://localhost:3000](http://localhost:3000).

---

## Screenshots & Demo:

<div align="center">
  <img src="https://ynk2whlk8hmk9qgf.public.blob.vercel-storage.com/yelloskye/Screenshot%202025-03-27%20at%209.21.57%E2%80%AFPM-fgs9X3W2YOfrseUQCdXXKSmIIVndEs.png" alt="Description of Image">
  <p><em>Login page</em></p>
</div>

<div align="center">
  <img src="https://ynk2whlk8hmk9qgf.public.blob.vercel-storage.com/yelloskye/Screenshot%202025-03-27%20at%209.22.18%E2%80%AFPM-CxOUplAREfmefgHtvMqtZbjVvAT2ER.png">
  <p><em>Projects page</em></p>
</div>

<div align="center">
  <img src="https://ynk2whlk8hmk9qgf.public.blob.vercel-storage.com/yelloskye/Screenshot%202025-03-27%20at%209.22.35%E2%80%AFPM-SRrjVlH5EDQcAmqNGfVXWvaviBwOXJ.png">
  <p><em>Map page</em></p>
</div>

<div align="center">
  <img src="https://ynk2whlk8hmk9qgf.public.blob.vercel-storage.com/yelloskye/Screenshot%202025-03-27%20at%209.22.45%E2%80%AFPM-bqL8IwVdfbAf8u23aixAHlbnYvLrF5.png">
  <p><em>Analytics page</em></p>
</div>

---

## Contribution Guidelines:

- Feel free to fork the repository and submit a pull request.
- Please follow proper commit message conventions.
- If you're submitting a bug or feature request, please use the issue tracker.

---

## Deployment:

The app can be deployed using **Vercel** or **Netlify**. To deploy on **Vercel**:

1. Go to [Vercel](https://vercel.com/).
2. Create a new project and link your GitHub repository.
3. Follow the prompts to deploy the app.

For **Netlify**, follow similar steps by linking the GitHub repo to Netlify.

---
