import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

interface BallProps {
  circleRef: React.RefObject<HTMLDivElement>;
  engineRef: React.RefObject<Matter.Engine>;
  initialVelocity?: { x: number; y: number };
}

const Ball: React.FC<BallProps> = ({
  circleRef,
  engineRef,
  initialVelocity,
}) => {
  const bodyRef = useRef<Matter.Body | null>(null);

  const getRandomColor = () => {
    const palette = [
      { r: 142, g: 202, b: 230 },
      { r: 33, g: 158, b: 188 },
      { r: 2, g: 48, b: 71 },
      { r: 255, g: 183, b: 3 },
      { r: 251, g: 133, b: 0 },
    ];
    const baseColor = palette[Math.floor(Math.random() * palette.length)];
    // Generate vibrant colors by using high saturation and medium-high lightness
    // Add slight variation to the color
    const variation = () => Math.floor(Math.random() * 20 - 10); // +/- 10 variation
    const r = Math.min(255, Math.max(0, baseColor.r + variation()));
    const g = Math.min(255, Math.max(0, baseColor.g + variation()));
    const b = Math.min(255, Math.max(0, baseColor.b + variation()));

    // Return the color in `rgb` format
    return `rgb(${r}, ${g}, ${b})`;
  };

  const calculateVelocity = () => {
    // Maximum base velocity scaled by window dimensions
    const maxVelocity = Math.min(window.innerWidth, window.innerHeight) * 0.05;
    // Random velocity between 20% and 100% of max velocity
    const velocityMultiplier = 0.2 + Math.random() * 0.8;
    const actualVelocity = maxVelocity * velocityMultiplier;
    // Random direction
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.cos(angle) * actualVelocity,
      y: Math.sin(angle) * actualVelocity,
    };
  };

  useEffect(() => {
    if (!circleRef.current || !engineRef.current) return;

    const circleBounds = circleRef.current.getBoundingClientRect();
    const centerX = circleBounds.left + circleBounds.width / 2;
    const centerY = circleBounds.top + circleBounds.height / 2;
    const ballColor = getRandomColor();

    const ball = Matter.Bodies.circle(centerX, centerY, 20, {
      label: "Ball",
      restitution: 0.8,
      friction: 0.001,
      density: 0.001,
      render: {
        fillStyle: ballColor,
        strokeStyle: "white",
        lineWidth: 1,
      },
    });

    const velocity = initialVelocity || calculateVelocity();
    Matter.Body.setVelocity(ball, velocity);

    bodyRef.current = ball;
    Matter.Composite.add(engineRef.current.world, ball);

    return () => {
      if (bodyRef.current && engineRef.current) {
        Matter.Composite.remove(engineRef.current.world, bodyRef.current);
      }
    };
  }, [circleRef, engineRef, initialVelocity]);

  return null;
};

export default Ball;
