"use client";
import React, { useEffect, useState } from "react";
import IconCustomizer from "@/components/IconCustomizer";
import {
  Triangle,
  Circle,
  Square,
  Hexagon,
  Pentagon,
  Octagon,
  Star,
  Diamond,
  Parallelogram,
  Crescent,
  Trapezoid,
  Hexagram,
  Ellipse,
  Heart,
} from "@/components/SvgIcons";

interface ShapeProperties {
  left: string;
  top: string;
  color: string;
  size: number;
}

const getRandomPosition = (): { left: string; top: string } => {
  const randomX = Math.floor(Math.random() * 90) + "%";
  const randomY = Math.floor(Math.random() * 90) + "%";
  return { left: randomX, top: randomY };
};

const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getRandomSize = (): number => {
  return Math.floor(Math.random() * 50) + 50;
};

const HomePage = () => {
  const [shapes, setShapes] = useState<ShapeProperties[]>([]);

  useEffect(() => {
    const newShapes = Array(14)
      .fill(null)
      .map(() => ({
        ...getRandomPosition(),
        color: getRandomColor(),
        size: getRandomSize(),
      }));
    setShapes(newShapes);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-8 flex flex-col items-center justify-center overflow-hidden">
      <h1 className="text-5xl font-extrabold text-gray-800 text-center mb-12 z-10">
        SVG Icon Customizer
      </h1>

      <div className="absolute inset-0 pointer-events-none">
        {shapes.length > 0 && (
          <>
            <div
              className="absolute"
              style={{
                left: shapes[0].left,
                top: shapes[0].top,
                width: shapes[0].size, 
                height: shapes[0].size,
              }}
            >
              <Triangle color={shapes[0].color} size={shapes[0].size} />
            </div>

            <div
              className="absolute"
              style={{
                left: shapes[1].left,
                top: shapes[1].top,
                width: shapes[1].size,
                height: shapes[1].size,
              }}
            >
              <Circle color={shapes[1].color} size={shapes[1].size} />
            </div>

            <div
              className="absolute"
              style={{
                left: shapes[2].left,
                top: shapes[2].top,
                width: shapes[2].size,
                height: shapes[2].size,
              }}
            >
              <Square color={shapes[2].color} size={shapes[2].size} />
            </div>

            <div
              className="absolute"
              style={{
                left: shapes[3].left,
                top: shapes[3].top,
                width: shapes[3].size,
                height: shapes[3].size,
              }}
            >
              <Hexagon color={shapes[3].color} size={shapes[3].size} />
            </div>

            <div
              className="absolute"
              style={{
                left: shapes[4].left,
                top: shapes[4].top,
                width: shapes[4].size,
                height: shapes[4].size,
              }}
            >
              <Pentagon color={shapes[4].color} size={shapes[4].size} />
            </div>

            <div
              className="absolute"
              style={{
                left: shapes[5].left,
                top: shapes[5].top,
                width: shapes[5].size,
                height: shapes[5].size,
              }}
            >
              <Octagon color={shapes[5].color} size={shapes[5].size} />
            </div>

            <div
              className="absolute"
              style={{
                left: shapes[6].left,
                top: shapes[6].top,
                width: shapes[6].size,
                height: shapes[6].size,
              }}
            >
              <Trapezoid color={shapes[6].color} size={shapes[6].size} />
            </div>

            <div
              className="absolute"
              style={{
                left: shapes[7].left,
                top: shapes[7].top,
                width: shapes[7].size,
                height: shapes[7].size,
              }}
            >
              <Crescent color={shapes[7].color} size={shapes[7].size} />
            </div>

            <div
              className="absolute"
              style={{
                left: shapes[8].left,
                top: shapes[8].top,
                width: shapes[8].size,
                height: shapes[8].size,
              }}
            >
              <Star color={shapes[8].color} size={shapes[8].size} />
            </div>

            <div
              className="absolute"
              style={{
                left: shapes[9].left,
                top: shapes[9].top,
                width: shapes[9].size,
                height: shapes[9].size,
              }}
            >
              <Heart color={shapes[9].color} size={shapes[9].size} />
            </div>

            <div
              className="absolute"
              style={{
                left: shapes[10].left,
                top: shapes[10].top,
                width: shapes[10].size,
                height: shapes[10].size,
              }}
            >
              <Hexagram color={shapes[10].color} size={shapes[10].size} />
            </div>

            <div
              className="absolute"
              style={{
                left: shapes[11].left,
                top: shapes[11].top,
                width: shapes[11].size,
                height: shapes[11].size,
              }}
            >
              <Diamond color={shapes[11].color} size={shapes[11].size} />
            </div>

            <div
              className="absolute"
              style={{
                left: shapes[12].left,
                top: shapes[12].top,
                width: shapes[12].size,
                height: shapes[12].size,
              }}
            >
              <Ellipse color={shapes[12].color} size={shapes[12].size} />
            </div>

            <div
              className="absolute"
              style={{
                left: shapes[13].left,
                top: shapes[13].top,
                width: shapes[13].size,
                height: shapes[13].size,
              }}
            >
              <Parallelogram color={shapes[13].color} size={shapes[13].size} />
            </div>
          </>
        )}
      </div>

      <div className="relative z-10">
        <IconCustomizer />
      </div>
    </div>
  );
};

export default HomePage;
