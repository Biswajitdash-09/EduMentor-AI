
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Users } from 'lucide-react';

interface VisitorCounterProps {
  className?: string;
}

const VisitorCounter = ({ className }: VisitorCounterProps) => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const location = useLocation();
  
  useEffect(() => {
    const path = location.pathname || '/';
    updateVisitorCount(path);
  }, [location.pathname]);
  
  const updateVisitorCount = async (path: string) => {
    try {
      // First, try to get the current count
      const { data, error } = await supabase
        .from('site_statistics')
        .select('visitor_count, id')
        .eq('page_path', path)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows returned
        console.error('Error fetching visitor count:', error);
        return;
      }
      
      if (data) {
        // Update existing record
        const newCount = data.visitor_count + 1;
        setVisitorCount(newCount);
        
        await supabase
          .from('site_statistics')
          .update({ 
            visitor_count: newCount,
            last_updated: new Date().toISOString()
          })
          .eq('id', data.id);
      } else {
        // Create new record
        setVisitorCount(1);
        
        await supabase
          .from('site_statistics')
          .insert({
            page_path: path,
            visitor_count: 1,
            last_updated: new Date().toISOString()
          });
      }
    } catch (error) {
      console.error('Error updating visitor count:', error);
    }
  };
  
  return (
    <div className={`flex items-center space-x-1 text-sm text-gray-500 ${className}`}>
      <Users size={14} />
      <span>{visitorCount} visitor{visitorCount !== 1 ? 's' : ''}</span>
    </div>
  );
};

export default VisitorCounter;
