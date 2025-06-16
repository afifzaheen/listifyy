// pages/index.jsx
import ItemListManager from '@/components/ItemListManager'; // Using the @ alias

export default function HomePage() {
  return (
    <>
      {/* You can add a Next.js Head component here for SEO/metadata if needed */}
      {/*
      <Head>
        <title>Listify App</title>
        <meta name="description" content="A simple item list manager built with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      */}
      <ItemListManager />
    </>
  );
}