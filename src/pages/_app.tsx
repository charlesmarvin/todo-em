import { TodoProvider } from "context/TodoProvider";
import Head from "next/head";
import "styles/globals.css";

interface TodoAppProps {
  Component: React.ElementType;
}

const TodoApp = ({ Component, ...props }: TodoAppProps) => {
  const title = "Todo EM";
  const description =
    "Simple web based off line Todo App based on Eisenhower Matrix";
  const appUrl = "https://todo-em.vercel.app/";
  return (
    <TodoProvider>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FDE6A8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta
          key="keywords"
          name="keywords"
          content={`Todo, Todo EM, Todo Eisenhower Matrix, Eisenhower, GTD`}
        />
        <meta key="description" name="description" content={description} />
        <meta key="og-title" property="og:title" content={title} />
        <meta
          key="og-description"
          property="og:description"
          content={description}
        />
        <meta key="og-url" property="og:url" content={appUrl} />
        <meta key="twitter-title" name="twitter:title" content={title} />
        <meta
          key="twitter-description"
          name="twitter:description"
          content={description}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${appUrl}/home-card.png`} />

        <link rel="canonical" href={appUrl} />
        <title>{title}</title>
      </Head>
      <Component {...props} />
    </TodoProvider>
  );
};
export default TodoApp;
