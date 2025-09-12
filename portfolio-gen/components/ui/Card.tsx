/**
 * Reusable Card component for content containers
 * Usage: <Card className="p-4"><h2>Card Title</h2><p>Content</p></Card>
 */

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-card text-card-foreground rounded-lg shadow-md border border-border liquid-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;