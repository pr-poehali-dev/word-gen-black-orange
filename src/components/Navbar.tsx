import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <Icon name="Zap" size={28} className="text-primary transition-transform group-hover:scale-110" />
            <span className="text-2xl font-bold text-white">СловоГен</span>
          </Link>

          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive("/")
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:text-white hover:bg-secondary"
              }`}
            >
              Главная
            </Link>
            <Link
              to="/generator"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive("/generator")
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:text-white hover:bg-secondary"
              }`}
            >
              Генератор
            </Link>
            <Link
              to="/history"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive("/history")
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:text-white hover:bg-secondary"
              }`}
            >
              История
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
