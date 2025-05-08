# Figo - Demo repository

This is a demo of the project I've worked on for between Jan 2024 and Mar 2025 for Figo Social. It served as both a landing page for the business, and a user application - first for finding, creating and managing bookings for classes; Later for joining small circle social events organized by Figo.

The application was a Next.js/React front-end, which integrated with services such as Stripe, PayPal, Brevo, Contentful, Google Maps API, and initially, a Backend-As-A-Service platform called Randevu. Material UI was used as a component library and styling reference.

It was the first project on which I've worked with RSC and Next.js >14.

## Demo link

***TBD***

## Getting Started

1. Install dependencies
```bash
yarn
```

2. Run development server
```bash
yarn dev
```

Application runs at port 3131 by default.

## Testing

The application uses Playwright for E2E tests. To run Playwright in UI mode:

```bash
yarn test:dev
```