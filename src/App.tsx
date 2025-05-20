import { useRoutes } from "react-router-dom";
import "./App.css";
import { bookAppRoutes } from "./routes/routes";

function App() {
  const routes = useRoutes(bookAppRoutes);

  return (
    <div className="w-full h-full flex flex-1 justify-center items-center">
      {routes}
    </div>
  );
}

export default App;
