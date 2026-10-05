# TechFest 2026 — Brutalist Bento React SPA

A redesigned version of the Experiment 3 TechFest 2026 portal using a flat brutalist + bento UI.

## Included
- React SPA with React Router
- Home, Events, Registration, Gallery, Contact and 404 pages
- Reusable Navbar, EventCard and EventList components
- Search and category filtering
- Event seat state and SOLD OUT state
- Controlled registration form with validation
- JSONPlaceholder API with loading/error states
- Context API light/dark theme
- Responsive brutalist/bento CSS

## Run

```bash
npm install
npm run dev
```

Then open the URL shown by Vite, normally `http://localhost:5173`.

## Structure

```text
src/
├── components/
│   ├── EventCard.jsx
│   ├── EventList.jsx
│   └── Navbar.jsx
├── context/
│   └── ThemeContext.jsx
├── data/
│   └── events.js
├── pages/
│   ├── Contact.jsx
│   ├── Events.jsx
│   ├── Gallery.jsx
│   ├── Home.jsx
│   ├── NotFound.jsx
│   └── Registration.jsx
├── App.jsx
├── index.css
└── main.jsx
```
