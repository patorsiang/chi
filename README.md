# CHI

CHI is a senior project and cultural heritage progressive web application (PWA) built to support knowledge exchange about the cultural heritage of India.

The project was developed as a collaboration between the Faculty of Information and Communication Technology (ICT), Mahidol University, and the Institute for Languages and Cultures of Asia (RILCA) / Bharat Center.

## Overview

CHI is a web and mobile-friendly application for sharing, discovering, and organizing cultural heritage content. It includes a public feed, personal diary features, bookmark/archive functionality, notifications, and an interactive map of India for browsing content by region.

The application was originally built with Create React App, but this README focuses on the actual CHI product and architecture rather than the default CRA boilerplate.

Live demo:

- <https://app-chi.firebaseapp.com>

TODO:

- Confirm whether the Firebase demo is still active and fully functional.
- Add current demo account instructions if public testing is allowed.

## Project Context

This project was created as a senior project during my B.Sc. Information and Communication Technology program at Mahidol University.

The core idea was to build a digital channel where users could learn about, collect, and share cultural heritage information related to India. The project combines front-end web development, Firebase backend services, offline-first ideas, cloud functions, image handling, and map-based exploration.

## Problem / Purpose

Cultural heritage content can be difficult to discover, organize, and connect to specific places. CHI explores how a web application can make this content more accessible by giving users tools to:

- browse shared cultural posts,
- write and manage personal diary entries,
- bookmark content,
- receive activity notifications,
- explore content by Indian state or region,
- and use the app from web or mobile devices.

The project purpose was both educational and practical: to create a working cultural heritage PWA while learning how to connect a React front end with Firebase services and cloud functions.

## Key Features

- **Public feed**
  - Displays shared cultural heritage posts.
  - Supports theme/category selection.
  - Adapts layout for mobile, tablet, and desktop.

- **Diary**
  - Allows authenticated users to create and manage diary entries.
  - Includes create/edit flows.
  - Supports private/personal content organization.

- **Bookmark/archive**
  - Lets users save selected diary or post content for later access.

- **Interactive India map**
  - Lets users select Indian states/regions.
  - Loads related content based on the selected area.

- **Notifications**
  - Shows user notifications for app activity.
  - Cloud Functions generate and clean up notification objects.

- **Authentication and profile flows**
  - Includes sign-in, sign-up, profile, and profile image update routes.

- **Image processing backend**
  - Cloud Functions process uploaded diary images.
  - Existing function names indicate image resizing/rotation, watermarking, Cloud Vision analysis, and Natural Language analysis.

- **Offline/PWA support**
  - Registers a service worker in production.
  - Uses `redux-offline` in the Redux store.
  - Includes a web app manifest for standalone display.

## Tech Stack

Frontend:

- React 16
- React Router
- Redux
- Redux Thunk
- Redux Offline
- React Redux Firebase
- Redux Firestore
- Material UI
- Reactstrap / Bootstrap
- Font Awesome
- FullCalendar

Backend / platform:

- Firebase Hosting
- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- Firebase Cloud Functions
- Firebase Admin SDK
- Google Cloud Vision API
- Google Cloud Natural Language API

Tooling:

- Create React App / react-scripts
- Node.js
- npm / yarn

## Architecture

```text
User browser / mobile browser
        |
        v
React PWA
        |
        +-- React Router pages
        +-- Redux app state
        +-- redux-offline queue/cache behavior
        +-- react-redux-firebase / redux-firestore bindings
        |
        v
Firebase services
        |
        +-- Firebase Auth for user identity
        +-- Cloud Firestore for users, posts, diary, notifications, and app data
        +-- Firebase Storage for uploaded images
        +-- Firebase Hosting for the built React app
        |
        v
Cloud Functions
        |
        +-- Callable APIs for posts, diary, notifications, bookmarks, and search
        +-- Firestore triggers for data maintenance and activity rewards
        +-- Storage triggers for image processing and analysis
        +-- Auth triggers for welcome notifications
```

## Project Structure

```text
.
|-- README.md
|-- package.json
|-- firebase.json
|-- firestore.rules
|-- firestore.indexes.json
|-- storage.rules
|-- public/
|   |-- index.html
|   |-- manifest.json
|   |-- service-worker.js
|   `-- logo assets
|-- src/
|   |-- assets/              Image and brand assets
|   |-- components/          Reusable UI components
|   |-- configs/             Firebase client configuration
|   |-- layouts/             App and home layout wrappers
|   |-- models/              Static model/data files
|   |-- store/               Redux actions and reducers
|   |-- views/               Page-level screens
|   |-- routes.js            Route definitions
|   |-- serviceWorker.js     Service worker registration
|   `-- index.js             App entry point and Redux/Firebase store setup
`-- functions/
    |-- index.js             Cloud Functions exports
    |-- accountsPrize/       Activity/reward triggers
    |-- api/                 Callable APIs
    |-- diary/               Diary triggers
    |-- imageDiary/          Image processing and analysis functions
    |-- notification/        Notification functions
    `-- trigger/             Firestore data-maintenance triggers
```

## Offline / PWA Behavior

CHI includes PWA foundations:

- `public/manifest.json` defines the app name, icon, start URL, standalone display mode, theme color, and background color.
- `src/serviceWorker.js` registers a service worker in production builds.
- `src/index.js` calls `serviceWorker.register()`.
- Redux store setup includes `redux-offline`.

What this means:

- The production app can cache static assets through the service worker.
- Some Redux behavior can be queued or managed with offline-first patterns.
- The app was designed to be installable or usable from mobile browsers.

TODO:

- Document which user actions work fully offline.
- Add an offline testing checklist.
- Verify current service worker behavior after modern dependency updates.

## Firebase / Backend Notes

Firebase is used as the main backend platform.

Configured services in this repository:

- Hosting: serves the React build output from `build/`.
- Firestore: configured with `firestore.rules` and `firestore.indexes.json`.
- Storage: configured with `storage.rules`.
- Cloud Functions: located in `functions/`.
- Authentication: used by sign-in/sign-up/profile flows.

Important Cloud Function areas:

- `functions/api/` - callable API handlers for diary, posts, notifications, bookmarks, and search.
- `functions/imageDiary/` - storage-triggered image processing and analysis.
- `functions/notification/` - notification creation/removal.
- `functions/accountsPrize/` - activity/reward style triggers.
- `functions/trigger/` - Firestore data maintenance.

Security note:

- Do not place private credentials or service account keys in the repository.
- Review Firebase config and rules before using this project in production.

TODO:

- Move environment-specific Firebase config into documented local setup instructions.
- Review Firestore and Storage rules for current security expectations.
- Document required Firebase project setup steps.

## How to Run Locally

Install frontend dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

Open:

```text
http://localhost:3000
```

Build for production:

```bash
npm run build
```

Cloud Functions setup:

```bash
cd functions
npm install
```

Useful Firebase scripts from `functions/package.json`:

```bash
npm run lint
npm run serve
npm run shell
npm run logs
```

TODO:

- Add exact Node.js version used by the original project.
- Add Firebase CLI setup steps.
- Add emulator instructions if the app is modernized.
- Add required Firebase project/environment configuration.

## Screenshots

TODO: Add current screenshots or GIFs.

Suggested screenshots:

- Landing page
- Feed page
- Diary create/edit flow
- Interactive map
- Bookmark/archive page
- Notification page
- Mobile PWA view

Existing assets that may help with visual documentation:

- `src/assets/`
- `public/logo.png`
- `public/logo.jpg`

## What I Learned

- How to structure a React application with route-based pages and shared components.
- How Redux can coordinate front-end state across feed, diary, bookmark, map, and notification flows.
- How Firebase can provide authentication, database, storage, hosting, and serverless functions for a full-stack student project.
- How a PWA can support mobile-friendly access and offline-oriented behavior.
- How Cloud Functions can automate image processing, metadata enrichment, notifications, and database maintenance.
- How project documentation matters when turning coursework into a portfolio artifact.

## Limitations

- The project uses older versions of React, Material UI, Firebase, and Cloud Functions dependencies.
- Setup is not fully reproducible yet because environment and Firebase project configuration are not documented.
- Some implementation details are tied directly to the original Firebase project.
- Offline behavior needs a fresh verification pass.
- The UI and accessibility need modernization.
- Tests are minimal and appear to be inherited from the original React setup.
- Some routes and function exports include legacy or commented code that should be cleaned up later.

## Future Improvements

- Modernize dependencies and migrate away from deprecated React lifecycle methods.
- Move Firebase config to a safer environment-specific setup.
- Add Firebase emulator support for local development.
- Add screenshots and a short demo walkthrough.
- Improve accessibility and responsive UI polish.
- Add test coverage for Redux actions, reducers, and important user flows.
- Document Firestore collections and data models.
- Add an architecture diagram.
- Review and harden Firestore/Storage security rules.
- Split legacy exploratory code from production paths.

## Status

Status: senior project / portfolio documentation polish in progress.

The app is a completed academic prototype with a deployed Firebase Hosting URL in the existing project metadata. The README has been rewritten to present CHI as a cultural heritage PWA portfolio project and to clearly mark missing setup, deployment, screenshot, and modernization details as TODOs.
