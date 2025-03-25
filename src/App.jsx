import React from "react";
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
import Watchlist from "./pages/WatchList";
import Holdings from "./pages/Holdings";
import Profile from "./pages/Profile";
import StockDetails from "./pages/StockDetails";
import AboutMeCard from "./pages/AboutMe";
import { SnackbarProvider } from "./context/SnackbarProvider";
import { ThemeProvider } from "./context/ThemeContext";
import { StockProvider } from "./context/StockContext";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import LoadingScreen from "./components/LoadingScreen"; // Import LoadingScreen

function App() {
  const ProtectedRoute = ({ element }) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? element : <Navigate to="/signin" />;
  };

  return (
    <LoadingProvider>
      {" "}
      {/* Move LoadingProvider here to wrap everything */}
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <SnackbarProvider>
              <StockProvider>
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
                      <Route path="/coin/:symbol" element={<StockDetails />} />
                      <Route path="/aboutme" element={<AboutMeCard />} />
                    </Routes>
                  </main>
                </div>{" "}
              </StockProvider>
            </SnackbarProvider>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </LoadingProvider>
  );
}

// const AppWithLoading = () => {
//   const { loading } = useLoading(); // Access the loading state from the context

//   return (
//     <>
//       {loading && <LoadingScreen />}{" "}
//       {/* Show loading screen if loading is true */}
//     </>
//   );
// };

export default App;
