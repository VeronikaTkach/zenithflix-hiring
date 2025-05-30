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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Mobile Hover Replacement Suggestions

On touch devices where hover interactions are unavailable, consider these alternatives:

*1. Information Icon*

Implementation: Add a small ℹ️ or info button in the top corner of each card.

Behavior: A single tap on the icon opens a tooltip or modal containing extended details (genre, year, rating, cast, etc.).

Accessibility: Ensure the icon is keyboard-focusable (tabindex="0") and has an aria-label="More information" for screen readers.

*3. Card Accordion*

Implementation: Make each card expandable.

Behavior: Tapping on a card toggles its expanded state inline, revealing additional information below the thumbnail without leaving the row.

Accessibility: Use aria-expanded to indicate state, and manage focus within the expanded area.

*4. Double Tap or Long-Press*

Implementation: Support a long-press gesture (press & hold) on the card.

Behavior: A quick tap selects or opens the content; a long-press shows an overlay with detailed metadata.

Accessibility: Fallback for keyboard users by allowing Shift+Enter or a context menu button that triggers the same overlay.