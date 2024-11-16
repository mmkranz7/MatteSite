import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

interface BallProps {
  circleRef: React.RefObject<HTMLDivElement>;
  engineRef: React.RefObject<Matter.Engine>;
}

const Ball: React.FC<BallProps> = ({ circleRef, engineRef }) => {
  const bodyRef = useRef<Matter.Body | null>(null);

  useEffect(() => {
    if (!circleRef.current || !engineRef.current) return;

    const circleBounds = circleRef.current.getBoundingClientRect();
    const centerX = circleBounds.left + circleBounds.width / 2;
    const centerY = circleBounds.top + circleBounds.height / 2;

    // Create ball with proper physics properties
    const ball = Matter.Bodies.circle(centerX, centerY, 10, {
      restitution: 0.8, // Bounciness
      friction: 0.001, // Low friction
      density: 0.001, // Low density for responsive movement
      render: {
        fillStyle: "rgb(0, 135, 222)",
        strokeStyle: "white",
        lineWidth: 1,
      },
    });

    // Set initial velocity
    Matter.Body.setVelocity(ball, {
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 20,
    });

    bodyRef.current = ball;
    Matter.Composite.add(engineRef.current.world, ball);

    return () => {
      if (bodyRef.current && engineRef.current) {
        Matter.Composite.remove(engineRef.current.world, bodyRef.current);
      }
    };
  }, [circleRef, engineRef]);

  return null;
};

export default Ball;
