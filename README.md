## Setup Instructions

1. **Clone the Repository**  
   - Run `git clone git@github.com:VeronikaTkach/zenithflix-hiring.git`  
   - Go to the project folder: `cd zenithflix-hiring`

2. **Install Dependencies**  
   - Make sure you have Node.js (version ≥ 18.18.0) and npm installed  
   - Run `npm install` to install all packages

3. **Run in Development Mode**  
   - Run `npm run dev`  
   - Open your browser and go to `http://localhost:3000`

4. **Run Tests**  
   - Run `npm test`  
   - Vitest will run unit tests and show results

5. **Build for Production**  
   - Run `npm run build`  
   - To see the production version locally, run `npm run start` and go to `http://localhost:3000`

6. **Test Deployment**  
   - A test deployment is available at: https://zenithflix-hiring.vercel.app/


## Folders and Files Description

### Project Structure

- **app/**  
  Holds Next.js configuration files (App Router).  
  - `layout.tsx` — the layout of the application (wrapper, global styles).  
  - `page.tsx` — the main page where `WatchHistory` and `TrendingNow` components are used.

- **assets/images/**  
  Contains all movie preview images. These images are used with `next/image` for lazy loading and optimization.

- **components/**  
  React components:  
  - `ContentCard.tsx` — displays a movie card in the “Trending Now” row with hover overlay.  
  - `HistoryCard.tsx` — displays a history card with a progress bar and a “Continue to Watch” button on hover or focus.  
  - `ContentDetail.tsx` — shows full movie details inside a modal (image, title, year, genre, rating, description, cast, and a “Watch Now” button).  
  - `ContentRowInfinite.tsx` — a wrapper that shows a horizontal list of cards with infinite scroll.  
  - `Modal.tsx` — reusable modal window component with keyboard support (Escape key), background, and a close button.  
  - `Skeleton.tsx` — a placeholder skeleton component for showing loading state.  
  - `TrendingNow.tsx` — shows the “Trending Now” row using `ContentRowInfinite` and opens `ContentDetail` in a modal.  
  - `WatchHistory.tsx` — shows the watch history row with `HistoryCard` and a placeholder if history is empty.

- **context/**  
  - `ContentContext.tsx` — Context API for storing trending movies (`data`, `loading`, `error`, `refresh`). Components get data via `useContent`.

- **data/**  
  - `sampleData.ts` — mock data (`ContentItem[]`) with full movie information (id, title, year, thumbnail, rating, watchProgress, genre, duration, description, cast). Used for local development without a real backend.

- **hooks/**  
  - `useWatchHistory.ts` — custom hook for watch history management:  
    - Reads `{ id, progress }` from `localStorage`.  
    - Converts to `HistoryItem[]` by adding full movie info.  
    - Provides `addToHistory` to add a movie to history.

- **lib/**  
  - `apiClient.ts` — an `axios` instance with interceptors:  
    - Adds `Authorization` header if a token is in `localStorage`.  
    - Logs response errors.  
    - Mocks the `GET /trending` request in development to return `sampleTrending`.

- **public/**  
  Static files served directly (SVG icons, etc.) that do not need processing.

- **types/**  
  - `types.ts` — TypeScript interfaces for the application (`ContentItem`, `HistoryItem`, etc.) to ensure strict typing.

- **IssuesList.md**  
  Contains the full code review for the first part of the task: list of problems, comments, and recommendations. These comments were used to improve the project.

- configs and support files


### Brief Explanation of Architectural Decisions

*Components and Separation of Concerns*  
- Each component does one job: card, modal, infinite scroll row, etc.  
- `ContentContext` holds the state for trending movies (data, loading, error, refresh).  
- `useWatchHistory` hook handles watch history logic separately.

*State and Data*  
- **Context API** stores trending movies, loading state, error message, and a refresh function.  
- **useWatchHistory** reads and writes watch history in `localStorage`, returning a list of history items with progress.  
- **apiClient** (axios with interceptors) automatically adds a token to headers and logs errors; it also returns mock data for development.

*Reusable Infinite Scroll Row*  
- `ContentRowInfinite` abstracts the horizontal list with infinite scroll. This way we avoid repeating code in both `TrendingNow` and `WatchHistory`.

*Error Handling and Loading*  
- In `ContentContext`, there are `loading` and `error` states.  
- `TrendingNow` and `WatchHistory` show a skeleton placeholder while loading, an error message with a “Retry” button if there is an error, and then real content once data is loaded.

*Accessibility*  
- All interactive elements (`ContentCard`, `HistoryCard`, `Modal`, buttons) have `role` and `tabIndex` attributes. They respond to keyboard events (`Enter`, `Escape`).  
- Sections use `<section role="region" aria-labelledby="...">` with unique `id` for headings.  
- The modal (`Modal`) uses `role="dialog"` and `aria-modal="true"`, and closes on Escape key, background click, and close button.

*Styling and Performance*  
- **Tailwind CSS** is used for quick and responsive styling without large CSS files.  
- `React.memo`, `useCallback`, and `useMemo` are used to prevent unnecessary re-renders.  
- **next/image** automatically optimizes images and lazy-loads them.

## Assumptions Made

- **Mock Data**: A real API is replaced by the static file `sampleData.ts`.  
- **Watch History**: Stored only in `localStorage` and updated when the “Watch Now” button is clicked.  
- **Video Player**: Instead of a real video player, a static image is shown in `ContentDetail`. Trailers do not play.  
- **Authentication**: A token from `localStorage` is added to headers via interceptor, but there is no real login flow.  
- **Responsiveness**: Basic responsive styling is present. Mobile version uses alternative methods instead of hover (info button or long-press).

---

## Areas for Improvement with More Time

1. **Integrate a Real API**  
  Replace mock `sampleTrending` with real API endpoints, update TypeScript types and parsing logic for real responses.

2. **Add More Content Categories**  
  Add extra rows (for example, “For You” or “New Releases”), separate fetch and refresh logic for each category.

3. **Better Animations and Transitions**  
  Add smooth fade or slide animations when cards and modals appear, animate adding/removing items in watch history (fade or slide out).

4. **Mobile UI/UX**  
  At the moment, there is no solution to replace the hover in the mobile version, possible solutions:
   - *Card Accordion*: Tap a card to expand and show details below the thumbnail.  
   - *Info Icon*: On mobile, show a small “ℹ️” button in the card’s corner to open a tooltip or modal with info.  
   - *Long-Press*: Long-press on a card to show an overlay with detailed movie info.  
   - *Bottom Sheet*: On mobile, show movie details in a bottom sheet that slides up.

5. **Video Player for Movies and Trailers**  
  Add a video player inside `ContentDetail` to play trailers and movies.  
   - You can use libraries such as:  
     - **React Player** (`react-player`) — supports YouTube, Vimeo, and local files.  
     - **Video.js** (`video.js`) — customizable player for streaming and local video.  
     - **@vime/react** — React web components for HLS, MP4, YouTube, etc.  
   - The player should save progress: when the user pauses or finishes, save the current time in `localStorage` or send it to the server.

6. **Increase Test Coverage**  
   - Add unit and integration tests for:  
     - `ContentRowInfinite` (check infinite loading).  
     - `ContentDetail` (check full info display and “Watch Now” button).  
     - `HistoryCard` (hover, “Continue to Watch” button, keyboard navigation).  
   - Cover keyboard navigation scenarios and edge cases (no `localStorage`, interceptor errors).

7. **Performance Optimization**  
  Use virtualization (`react-window`) for large lists (over 100 items), cache network requests using SWR or React Query to avoid repeated fetching on navigation.

8. **Internationalization (i18n)**  
  Move all text strings to separate JSON files to support multiple languages, set up a library like `next-i18next` or `react-intl` and allow language switching.

9. **Accessibility and Security**  
  Improve ARIA attributes: use `aria-live` for dynamic status messages and loading states, check color contrast to meet WCAG 2.1 standards and add Content Security Policy (CSP) and protection against XSS/CSRF when using a real API.

10. **Refactor WatchHistory to Use ContentRowInfinite**  
  In the future, update `WatchHistory.tsx` so that it also uses `ContentRowInfinite` for consistent infinite scroll behavior and layout.


### User Flow

1. **First Visit (Empty History)**  
   - The user opens the app and sees the main page.  
   - The “Continue Watching” section shows only the heading and a placeholder card with the text “Start watching movies and they'll appear here”.  
   - No movie is in history yet.

2. **Viewing the “Trending Now” Row**  
   - Below the “Continue Watching” section, the “Trending Now” row appears.  
   - Movie thumbnails load lazily and appear in a horizontal row.  
   - When the user scrolls right (mouse wheel or swipe), more cards load automatically (infinite scroll).  
   - The user can also navigate with the Tab key and arrow keys (←/→). When the focus reaches the end of visible cards, pressing ArrowRight loads more cards.

3. **Hover on Desktop**  
   - When the user hovers over a movie card, an overlay appears with extra information:  
     - Title  
     - Genre  
     - Year  
     - Rating  
     - Duration  
     - Cast list

4. **Click/Tap on a Card**  
   - Clicking or tapping a card opens a modal (`Modal`) with full movie details (`ContentDetail`):  
     - Large cover image  
     - Title  
     - Year, duration, and genre  
     - Rating  
     - Description  
     - Cast list  
     - **Watch Now** button

5. **Adding to Watch History**  
   - When the user clicks **Watch Now**, the movie’s (`id`, `watchProgress`) are saved to `localStorage` by `useWatchHistory`.  
   - The page reloads (or state updates), and the “Continue Watching” section now shows the added movie.

6. **Watch History on Desktop**  
   - The “Continue Watching” section displays history cards (`HistoryCard`).  
   - Under each history card is a progress bar showing how much of the movie was watched.  
   - Hovering over a history card shows an overlay with a **Continue to Watch** button.  
   - Clicking that button currently shows an alert “Continue to Watch” (placeholder for future resume logic).

7. **Mobile Adaptation**  
   - Hover is not available on touch devices, so `HistoryCard` can show the **Continue to Watch** button always or on long-press.  
   - The modal uses up to 90% of the viewport height and scrolls vertically if content is too tall.

8. **Returning User**  
   - When the user returns, the history card appears automatically in the “Continue Watching” section. The user can resume watching from where they left off.  
   - The “Trending Now” row continues to load new cards when scrolled.

---

> In the file `IssuesList.md` you will find the full code review from the first part of the assignment: a list of found issues, comments, and recommendations used to improve this project.