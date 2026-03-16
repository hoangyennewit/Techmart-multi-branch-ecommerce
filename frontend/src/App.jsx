import { AppRoutes } from "./routes";
import { AuthProvider } from "./features/auth/store/AuthContext";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
};
export default App;
