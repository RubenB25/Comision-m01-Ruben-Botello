import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import NotFoundPage from "./pages/404Page";
import PostsPage from "./pages/PostsPage";
import PrivateRoutes from "./components/PrivateRoutes";
import NewPostPage from "./pages/NewPostPage";
import PostPage from "./pages/PostPage";
// import MusicPage from "./pages/MusicPage";
import NewCommentPage from "./pages/NewCommentPage"; 
import RecentPage from "./pages/RecentPage";
function AppRouter() {
  return (
    <Routes>
      {/* Rutas Protegidas */}
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/recent" element={<RecentPage />} />
        <Route path="/post/new" element={<NewPostPage />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/comment/:postId" element={<NewCommentPage />} />
      </Route>

      {/* Rutas Públicas */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
export default AppRouter;
