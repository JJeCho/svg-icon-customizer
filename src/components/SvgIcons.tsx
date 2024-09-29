import React from "react";

interface SvgProps {
  color: string;
  size: number;
}

export const Triangle: React.FC<SvgProps> = ({ color, size }) => (
  <svg
    className="rotating-triangle animate-rotate-slow"
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="50,10 90,90 10,90" fill={color} />
  </svg>
);

export const Circle: React.FC<SvgProps> = ({ color, size }) => (
  <svg
    className="scaling-circle animate-scale"
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="40" fill={color} />
  </svg>
);

export const Square: React.FC<SvgProps> = ({ color, size }) => (
  <svg
    className="pulsing-square animate-pulse"
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="25" y="25" width="50" height="50" fill={color} />
  </svg>
);

export const Hexagon: React.FC<SvgProps> = ({ color, size }) => (
  <svg
    className="bouncing-hexagon animate-bounce"
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="50,10 90,35 90,75 50,90 10,75 10,35" fill={color} />
  </svg>
);

export const Pentagon: React.FC<SvgProps> = ({ color, size }) => (
  <svg
    className="spinning-pentagon animate-rotate-fast"
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="50,10 90,40 70,90 30,90 10,40" fill={color} />
  </svg>
);

export const Octagon: React.FC<SvgProps> = ({ color, size }) => (
  <svg
    className="octagon animate-wobble"
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30" fill={color} />
  </svg>
);

export const Star: React.FC<SvgProps> = ({ color, size }) => (
  <svg
    className="star animate-twinkle"
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon
      points="50,10 61,39 92,39 66,58 76,88 50,69 24,88 34,58 8,39 39,39"
      fill={color}
    />
  </svg>
);

export const Diamond: React.FC<SvgProps> = ({ color, size }) => (
  <svg
    className="diamond animate-flip"
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="50,10 90,50 50,90 10,50" fill={color} />
  </svg>
);

export const Parallelogram: React.FC<SvgProps> = ({ color, size }) => (
  <svg
    className="parallelogram animate-slide"
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="20,10 80,10 60,90 0,90" fill={color} />
  </svg>
);

export const Crescent: React.FC<SvgProps> = ({ color, size }) => (
  <svg
    className="crescent animate-spin-reverse"
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 50 10 A 40 40 0 1 1 50 90 A 30 30 0 1 0 50 10 Z"
      fill={color}
    />
  </svg>
);

export const Trapezoid: React.FC<SvgProps> = ({ color, size }) => (
  <svg
    className="trapezoid animate-skew"
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="30,10 70,10 90,90 10,90" fill={color} />
  </svg>
);

export const Hexagram: React.FC<SvgProps> = ({ color, size }) => (
  <svg
    className="hexagram animate-pulse"
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="50,10 65,40 35,40" fill={color} />
    <polygon points="50,90 65,60 35,60" fill={color} />
    <polygon points="10,50 40,35 40,65" fill={color} />
    <polygon points="90,50 60,35 60,65" fill={color} />
  </svg>
);

export const Ellipse: React.FC<SvgProps> = ({ color, size }) => (
  <svg
    className="ellipse animate-stretch"
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="50" cy="50" rx="40" ry="20" fill={color} />
  </svg>
);

export const Heart: React.FC<SvgProps> = ({ color, size }) => (
  <svg
    className="heart animate-beat"
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 50 70 C 20 50, 10 20, 50 10 C 90 20, 80 50, 50 70 Z"
      fill={color}
    />
  </svg>
);
