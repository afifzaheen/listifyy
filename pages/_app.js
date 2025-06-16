// pages/_app.js
import '../styles/globals.css'; // <-- Correct path to your globals.css
// Or if you use the @ alias (which you chose not to customize, so @/ will likely point to the root):
// import '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;