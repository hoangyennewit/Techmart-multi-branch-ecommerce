import { AppRoutes } from "./routes";
import { AuthProvider } from "./features/auth/store/AuthContext";
import { BrowserRouter, useLocation } from "react-router-dom";
import ChatbotWidget from "./features/customer/chatbot/ChatbotWidget";

const AppContent = () => {
  const location = useLocation();
  const hideChatbotPaths = ["checkout", "payment"];
  const shouldHideChatbot = hideChatbotPaths.some(path => location.pathname.includes(path));

  return (
    <>
      <AppRoutes />
      {!shouldHideChatbot && <ChatbotWidget />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
};
export default App;
