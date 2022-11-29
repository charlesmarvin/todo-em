import { TodoProvider } from "context/TodoProvider";
import Head from "next/head";
import "styles/globals.css";

interface TodoAppProps {
  Component: React.ElementType;
}

const TodoApp = ({ Component, ...props }: TodoAppProps) => {
  return (
    <TodoProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Todo EM</title>
      </Head>
      <Component {...props} />
    </TodoProvider>
  );
};
export default TodoApp;
