import React, { useState } from 'react';
import { Moon, Sun, User, LogOut, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Button from './ui/Button';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <Zap className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">ZapLink</span>
            </a>
          </div>
          
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="h-9 w-9 px-0"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              
              {user ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 px-3 py-1 rounded-md bg-muted">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="h-9 w-9 px-0 text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setShowAuthModal(true)} size="sm">
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Navbar;