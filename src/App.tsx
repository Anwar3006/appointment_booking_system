import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  return (
    <div className="min-h-screen bg-dark-300">
      <ThemeProvider defaultTheme="dark" attribute="class">
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
