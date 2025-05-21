
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

interface VideoEmbedProps {
  videoId: string;
  title: string;
  courseId: string;
}

const VideoEmbed = ({ videoId, title, courseId }: VideoEmbedProps) => {
  // Get navigate function if we're in a router context, otherwise undefined
  const navigate = useNavigate ? useNavigate() : undefined;
  const location = useLocation ? useLocation() : undefined;
  
  const handleEnrollClick = () => {
    if (navigate) {
      navigate(`/courses/${courseId}/enroll`);
    } else {
      // Fallback for when used outside router context
      window.location.href = `/courses/${courseId}/enroll`;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium">{title}</h3>
      <div className="relative pb-[56.25%] h-0">
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex justify-end mt-4">
        <Button
          className="bg-edu-blue hover:bg-edu-blue-dark"
          onClick={handleEnrollClick}
        >
          Enroll Now
        </Button>
      </div>
    </div>
  );
};

export default VideoEmbed;
