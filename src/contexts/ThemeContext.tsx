
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const { user, profile } = useAuth();

  // Load theme from localStorage on initial render
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme) {
      setTheme(storedTheme);
      applyTheme(storedTheme);
    }
  }, []);

  // Sync theme with user profile if logged in
  useEffect(() => {
    if (user && profile) {
      // Check if theme_preference exists in the profile
      const userTheme = profile.theme_preference as Theme || profile.theme as Theme;
      if (userTheme && userTheme !== theme) {
        setTheme(userTheme);
        applyTheme(userTheme);
      }
    }
  }, [profile, user, theme]);

  const applyTheme = (newTheme: Theme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    // Save to localStorage for all users (including guests)
    localStorage.setItem('theme', newTheme);
    
    // Save to database if user is logged in
    if (user?.id) {
      try {
        // Try to update using the field name that exists in the database
        const fieldToUpdate = { 
          // Use a dynamic key to handle both potential field names
          ...(profile && 'theme_preference' in profile ? { theme_preference: newTheme } : { theme: newTheme }),
          updated_at: new Date().toISOString()
        };
        
        await supabase
          .from('profiles')
          .update(fieldToUpdate)
          .eq('id', user.id);
      } catch (error) {
        console.error('Error saving theme preference to database:', error);
      }
    }
    
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
