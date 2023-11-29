import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import NotFoundPage from "./pages/404Page";
import PlaylistPage from "./pages/PlaylistPage";
import PrivateRoutes from "./components/PrivateRoutes";
import NewPlaylist from "./pages/NewPlaylist";
import MusicPage from "./pages/MusicsPage";
import Navbar from "../src/components/Navbar";
import CardsLayout from "../src/components/CardsLayout";
function AppRouter() {
  return (
    <div>
      <Navbar />
    <Routes>
      {/* Rutas Protegidas */}
      <Route element={<PrivateRoutes />}>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="/playlist/new" element={<NewPlaylist />} />
        <Route path="/playlist/:playlistId" element={<MusicPage />} />
      </Route>
      
      {/* Rutas Públicas */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    
    </div>
  );
}
export default AppRouter;
