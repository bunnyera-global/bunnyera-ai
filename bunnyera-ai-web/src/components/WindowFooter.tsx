import React from 'react';
import { Twitter, Instagram, Globe } from 'lucide-react';

export const WindowFooter: React.FC = () => {
  return (
    <footer className="h-8 bg-bunny-darker border-t border-gray-800 flex items-center justify-between px-6 text-xs text-gray-500 select-none">
      <div className="flex items-center space-x-4">
        <span>© 2025 BUNNYERA LLC</span>
        <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
        <span>Wyoming, USA</span>
      </div>

      <div className="flex items-center space-x-4">
        <a href="#" className="hover:text-bunny-blue transition-colors flex items-center space-x-1">
           <Globe size={12} />
           <span>Privacy Policy</span>
        </a>
        <div className="h-3 w-px bg-gray-800"></div>
        <div className="flex items-center space-x-3">
          <a href="#" className="hover:text-white transition-colors"><Twitter size={12} /></a>
          <a href="#" className="hover:text-white transition-colors"><Instagram size={12} /></a>
        </div>
      </div>
    </footer>
  );
};
