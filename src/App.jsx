import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Sidebar from "./components/SideBar";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import Watchlist from "./pages/Watchlist";
import Holdings from "./pages/Holdings";
import Profile from "./pages/Profile";
import StockDetails from "./pages/StockDetails";

function App() {
  const ProtectedRoute = ({ element }) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? element : <Navigate to="/signin" />;
  };

  return (
    <Router>
      <AuthProvider>
        <div className="flex">
          <Sidebar />
          <main className="p-6 flex-grow w-100% h-screen">
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="/" element={<Dashboard />} />
              <Route
                path="/watchlist"
                element={<ProtectedRoute element={<Watchlist />} />}
              />
              <Route
                path="/holdings"
                element={<ProtectedRoute element={<Holdings />} />}
              />
              <Route
                path="/profile"
                element={<ProtectedRoute element={<Profile />} />}
              />
              <Route path="/stock/:symbol" element={<StockDetails />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
