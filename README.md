# Thirty Bob Library

A digital ebook library built with Next.js. Browse, search, request, and download ebooks from your Google Spreadsheet catalog.

## Features

- Browse ebooks by category
- Search across titles and authors
- Request books not yet in the library
- Download ebooks in multiple formats (PDF, EPUB, MOBI)
- Cart and checkout flow for free downloads

## Requirements

1. Node Version: > 10.13.0
2. Bun or Yarn
3. Google Account

## Technology

- [React](https://reactjs.org/) — UI library
- [Next.js](https://nextjs.org/) — React SSR/SSG framework
- [Google Sheets](https://www.google.com/sheets/about/) — Database via serverless API
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS

## Setup

### 1. Google Spreadsheet Configuration

1. Go to [Google Developers Console](https://console.developers.google.com/)
2. Create or select a project
3. Enable the Sheets API
4. Create a Service Account and download the JSON key
5. Create a Google Spreadsheet for your ebooks with these columns:

| id | title | author | cover | description | price | format | category | pages | language |
|----|-------|--------|-------|-------------|-------|--------|----------|-------|----------|
| 1  | Book Title | Author Name | https://... | Description... | 0.00 | PDF | Fiction | 300 | English |

6. Share the spreadsheet with your service account email

### 2. Environment Variables

Copy `.env.local.sample` to `.env.local` and fill in your credentials:

```
GOOGLE_SPREADSHEET_ID_PRODUCT=your_ebooks_spreadsheet_id
GOOGLE_SPREADSHEET_ID_ORDER=your_orders_spreadsheet_id
GOOGLE_SPREADSHEET_ID_REQUEST=your_book_requests_spreadsheet_id
GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL=your-email@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----...\n"
```

### 3. Install and Run

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Spreadsheet Format

### Ebooks Sheet

| Column | Description |
|--------|-------------|
| id | Unique identifier |
| title | Book title |
| author | Author name |
| cover | Cover image URL |
| description | Book description |
| price | Price (0 for free) |
| format | PDF, EPUB, or MOBI |
| category | Genre/category |
| pages | Page count |
| language | Book language |

### Orders Sheet

| Column | Description |
|--------|-------------|
| items | Downloaded ebooks (comma-separated) |
| name | User name |
| email | User email |
| total | Order total |
| date | Download date |

### Book Requests Sheet

| Column | Description |
|--------|-------------|
| title | Requested book title |
| author | Author name (optional) |
| name | Requester name |
| email | Requester email |
| notes | Additional notes (optional) |
| date | Request date |

## Deployment

Deploy to Vercel:

```bash
bun run build
vercel deploy
```

Set all environment variables in your Vercel project settings.
