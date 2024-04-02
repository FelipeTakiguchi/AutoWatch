This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, copy the env.example file and rename it to just .env and insert in "API_URL" the domain value to your tunnel

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Libraries Used

- [Axios](https://axios-http.com/)
- [Leaflet](https://leafletjs.com/)

Also, using sass for styles, and typescript to code

## project Structure

```
autowatch
│   README.md
│   env.example
└───src
    └───app
    │       layout.tsx
    │       page.tsx
    │       globals.css
    └───assets
    │   └───images
    │       **all_images.svg
    └───components
        └───actionsBar
        │       actionsBar.tsx
        │       styles.sass
        └───filter
        │       filter.tsx
        │       styles.sass
        └───header
        │       header.tsx
        │       styles.sass
        └───map
        │       map.tsx
        │       styles.sass
        └───modal
        │       modal.tsx
        │       styles.sass
        └───notification
        │       notification.tsx
        │       styles.sass
        └───notificationBox
        │       notificationBox.tsx
        │       styles.sass
        └───pagination
        │       pagination.tsx
        │       styles.sass
        └───select
        │       select.tsx
        │       styles.sass
        └───tableComponent
                tableComponent.tsx
                styles.sass
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
