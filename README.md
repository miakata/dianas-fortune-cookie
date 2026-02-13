This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

### Formspree (share lyric by email)

The “Mia” and “Zuza” buttons send the current lyric via [Formspree](https://formspree.io) so the recipient gets an email without opening a mail client.

The app uses built-in Formspree form IDs (Mia `xzdaeovb`, Zuza `xwvnlaeg`), so **the share form works when deployed** without setting any environment variables.

To use different forms (e.g. your own Formspree forms), create `.env.local` with:
```bash
NEXT_PUBLIC_FORMSPREE_MIA_ID=your_mia_form_id
NEXT_PUBLIC_FORMSPREE_ZUZA_ID=your_zuza_form_id
```
Then restart the dev server (`npm run dev`).

**Note:** On the free plan, both forms send to the email on your Formspree account. To have emails go directly to Mia and Zuza, either (a) they each create a form and send you their form ID, or (b) use Formspree’s Form Rules (Business plan) to route by form.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
