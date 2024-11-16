import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import Ball from "./Ball";
import "../Styles/SpinningCircle.css";

const SpinningCircle: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const wallsRef = useRef<Matter.Body[]>([]);
  const [balls, setBalls] = useState<JSX.Element[]>([]);

  useEffect(() => {
    // Initialize physics engine with proper gravity
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1 }, // Increased gravity for better effect
    });
    engineRef.current = engine;

    // Create walls function
    const createWalls = () => {
      const walls = [
        // Ground
        Matter.Bodies.rectangle(
          window.innerWidth / 2,
          window.innerHeight + 30,
          window.innerWidth,
          60,
          { isStatic: true }
        ),
        // Left wall
        Matter.Bodies.rectangle(
          -30,
          window.innerHeight / 2,
          60,
          window.innerHeight,
          { isStatic: true }
        ),
        // Right wall
        Matter.Bodies.rectangle(
          window.innerWidth + 30,
          window.innerHeight / 2,
          60,
          window.innerHeight,
          { isStatic: true }
        ),
        // Ceiling
        Matter.Bodies.rectangle(
          window.innerWidth / 2,
          -30,
          window.innerWidth,
          60,
          { isStatic: true }
        ),
      ];

      return walls;
    };

    // Add initial walls
    const walls = createWalls();
    wallsRef.current = walls;
    Matter.Composite.add(engine.world, walls);

    // Create renderer
    const render = Matter.Render.create({
      element: containerRef.current || undefined,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "transparent",
      },
    });
    renderRef.current = render;

    // Configure renderer
    render.canvas.style.position = "fixed";
    render.canvas.style.top = "0";
    render.canvas.style.left = "0";
    render.canvas.style.pointerEvents = "none";
    render.canvas.style.zIndex = "1";

    // Create and start the runner
    const runner = Matter.Runner.create();
    runnerRef.current = runner;

    // Start the engine and renderer
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    // Handle window resize
    const handleResize = () => {
      // Update renderer dimensions
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;

      // Remove old walls
      if (wallsRef.current.length) {
        Matter.Composite.remove(engine.world, wallsRef.current);
      }

      // Create and add new walls
      const newWalls = createWalls();
      wallsRef.current = newWalls;
      Matter.Composite.add(engine.world, newWalls);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
      }
      if (runnerRef.current) {
        Matter.Runner.stop(runnerRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const createBall = () => {
    if (!engineRef.current) return;
    const newBall = (
      <Ball key={Date.now()} circleRef={circleRef} engineRef={engineRef} />
    );
    setBalls((prev) => [...prev, newBall]);
  };

  return (
    <div className="spinning-circle-container">
      <div ref={containerRef} className="physics-container">
        <div ref={circleRef} onClick={createBall} className="spinning-circle" />
        {balls}
      </div>
    </div>
  );
};

export default SpinningCircle;
