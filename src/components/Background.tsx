
import React, { useEffect, useState } from 'react';

const Background = () => {
  const [stars, setStars] = useState<{ id: number; top: number; left: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const starCount = 50;
      const newStars = [];
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          top: Math.random() * 100,
          left: Math.random() * 100,
          size: 1 + Math.random() * 2,
          duration: 30 + Math.random() * 60
        });
      }
      
      setStars(newStars);
    };
    
    generateStars();
  }, []);
  
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <div className="absolute inset-0 bg-dark-gradient"></div>
      {stars.map((star) => (
        <div
          key={star.id}
          className="stardust"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`
          }}
        ></div>
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.1)_0%,transparent_70%)]"></div>
    </div>
  );
};

export default Background;
