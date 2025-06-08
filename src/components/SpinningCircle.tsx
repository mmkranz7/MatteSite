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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wallsRef = useRef<Matter.Body[]>([]);
  const [balls, setBalls] = useState<JSX.Element[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  // const dragEndRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize physics engine with proper gravity
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1 },
    });
    engineRef.current = engine;

    const createTextHitboxes = () => {
      const title = document.querySelector(".name-container");
      const quoteTop = document.querySelector(".quote-line-top");
      const quoteBottom = document.querySelector(".quote-line-bottom");
      const author = document.querySelector(".quote-author");

      const bodies = [];

      // Add title
      if (title) {
        const rect = title.getBoundingClientRect();
        bodies.push(
          Matter.Bodies.rectangle(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            rect.width,
            rect.height,
            { isStatic: true, label: "Title", render: { visible: false } }
          )
        );
      }

      // Add quote top line
      if (quoteTop) {
        const rect = quoteTop.getBoundingClientRect();
        bodies.push(
          Matter.Bodies.rectangle(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            rect.width,
            rect.height,
            { isStatic: true, label: "QuoteTop", render: { visible: false } }
          )
        );
      }

      // Add quote bottom line
      if (quoteBottom) {
        const rect = quoteBottom.getBoundingClientRect();
        bodies.push(
          Matter.Bodies.rectangle(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            rect.width,
            rect.height,
            { isStatic: true, label: "QuoteBottom", render: { visible: false } }
          )
        );
      }

      // Add quote author
      if (author) {
        const rect = author.getBoundingClientRect();
        bodies.push(
          Matter.Bodies.rectangle(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            rect.width,
            rect.height,
            { isStatic: true, label: "Author", render: { visible: false } }
          )
        );
      }

      return bodies;
    };
    // Create walls function
    const createWalls = () => {
      const topBarHeight = 64; // Adjust this to match your top bar height

      const walls = [
        // Ground
        Matter.Bodies.rectangle(
          window.innerWidth / 2,
          window.innerHeight + 30,
          window.innerWidth,
          60,
          {
            isStatic: true,
            render: {
              visible: false, // Hide the wall body
            },
          }
        ),
        // Left wall
        Matter.Bodies.rectangle(
          -30,
          window.innerHeight / 2,
          60,
          window.innerHeight,
          {
            isStatic: true,
            render: {
              visible: false,
            },
          }
        ),
        // Right wall
        Matter.Bodies.rectangle(
          window.innerWidth + 30,
          window.innerHeight / 2,
          60,
          window.innerHeight,
          {
            isStatic: true,
            render: {
              visible: false,
            },
          }
        ),
        // Top bar collision
        Matter.Bodies.rectangle(
          window.innerWidth / 2,
          topBarHeight / 2,
          window.innerWidth,
          topBarHeight,
          {
            isStatic: true,
            render: {
              visible: false,
            },
          }
        ),
      ];

      return walls;
    };

    // Add initial walls
    const walls = createWalls();
    const textHitboxes = createTextHitboxes();
    wallsRef.current = [...walls, ...textHitboxes];
    Matter.Composite.add(engine.world, wallsRef.current);

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
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;

      if (wallsRef.current.length) {
        Matter.Composite.remove(engine.world, wallsRef.current);
      }

      const newWalls = createWalls();
      const newtextHitboxes = createTextHitboxes();
      wallsRef.current = [...newWalls, ...newtextHitboxes];
      Matter.Composite.add(engine.world, wallsRef.current);
    };

    const drawLiquidSplat = (
      ctx: CanvasRenderingContext2D, // Type for canvas context
      collisionX: number, // X coordinate of the splat
      collisionY: number, // Y coordinate of the splat
      splatSize: number, // Size of the splat
      ballColor: string // Color of the ball and splat
    ): void => {
      const dropletCount = Math.floor(Math.random() * 10) + 5; // Randomize number of droplets
      for (let i = 0; i < dropletCount; i++) {
        const angle = Math.random() * Math.PI * 2; // Random angle
        const distance = Math.random() * splatSize; // Random distance from center
        const dropletX = collisionX + Math.cos(angle) * distance;
        const dropletY = collisionY + Math.sin(angle) * distance;
        const dropletSize = Math.random() * (10 + splatSize / 5); // Smaller size for droplets

        ctx.beginPath();
        ctx.arc(dropletX, dropletY, dropletSize, 0, Math.PI * 2);
        ctx.fillStyle = ballColor;
        ctx.fill();
      }
    };

    const handleCollision = (event: Matter.IEventCollision<Matter.Engine>) => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      event.pairs.forEach(({ bodyA, bodyB, collision }) => {
        // Use bodyA or bodyB position as the collision location
        const targetBody = bodyA.label === "Ball" ? bodyA : bodyB;
        const ballColor = targetBody.render?.fillStyle || "black";
        const { x: baseX, y: baseY } = targetBody.position;

        // Normalize Y-coordinate to fit the canvas height
        const normalizedY =
          (baseY / window.innerHeight) * (canvasRef.current?.height || 0);

        // Use penetration vector to calculate adjusted collision position
        const { x: penetrationX, y: penetrationY } = collision.penetration;
        const collisionX = baseX + penetrationX;
        const collisionY = normalizedY + penetrationY;

        // Debugging: Log the coordinates
        console.log(`Collision at: (${collisionX}, ${collisionY})`);
        const currentRadius = targetBody.circleRadius || 20; // Default radius if not set
        // Calculate splat size based on penetration vector magnitude
        const splatSize =
          Math.sqrt(penetrationX ** 2 + penetrationY ** 2) * currentRadius;

        // Draw the paint splotch
        drawLiquidSplat(ctx, collisionX, collisionY, splatSize, ballColor);

        const newRadius = currentRadius / 2;

        if (newRadius < 5) {
          // Remove the ball if it's too small
          Matter.Composite.remove(engineRef.current!.world, targetBody);
        } else {
          // Shrink the ball
          const scaleFactor = newRadius / currentRadius;
          Matter.Body.scale(targetBody, scaleFactor, scaleFactor);

          const velocity = targetBody.velocity;
          targetBody.circleRadius = newRadius; // Update the radius manually for tracking

          Matter.Body.setVelocity(targetBody, {
            x: (velocity.x * scaleFactor) / 2,
            y: (velocity.y * scaleFactor) / 2,
          });
        }
      });
    };

    Matter.Events.on(engine, "collisionStart", handleCollision);

    window.addEventListener("resize", handleResize);

    return () => {
      Matter.Events.off(engine, "collisionStart", handleCollision);
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
      }
      if (runnerRef.current) {
        Matter.Runner.stop(runnerRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const createBall = (velocity?: { x: number; y: number }) => {
    if (!engineRef.current) return;
    const newBall = (
      <Ball
        key={Date.now()}
        circleRef={circleRef}
        engineRef={engineRef}
        initialVelocity={velocity}
      />
    );
    setBalls((prev) => [...prev, newBall]);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };

    // Add window listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current || !circleRef.current) return;

    const rect = circleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dragVector = {
      x: e.clientX - centerX,
      y: e.clientY - centerY,
    };

    const distance = Math.sqrt(dragVector.x ** 2 + dragVector.y ** 2);
    const angle = Math.atan2(dragVector.y, dragVector.x);

    // Calculate deformation strength
    const deformationStrength = Math.min(distance / 150, 1.5);

    // Calculate border radius for water drop effect
    //const angleInDegrees = (angle * 180) / Math.PI;
    const borderRadius = `${50 - deformationStrength * 20}% ${
      50 + deformationStrength * 20
    }% ${50 + deformationStrength * 20}% ${50 - deformationStrength * 20}%`;

    circleRef.current.style.transform = `
      translate(-50%, -50%) 
      rotate(${angle}rad)
    `;
    circleRef.current.style.borderRadius = borderRadius;
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!isDraggingRef.current) return;

    const dragVector = {
      x: dragStartRef.current.x - e.clientX,
      y: dragStartRef.current.y - e.clientY,
    };

    const dragDistance = Math.sqrt(dragVector.x ** 2 + dragVector.y ** 2);

    if (dragDistance < 5) {
      createBall();
    } else {
      const velocityMultiplier = 0.1;
      createBall({
        x: dragVector.x * velocityMultiplier,
        y: dragVector.y * velocityMultiplier,
      });
    }

    isDraggingRef.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);

    if (circleRef.current) {
      circleRef.current.style.transform = "translate(-50%, -50%)";
      circleRef.current.style.borderRadius = "50%";
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (circleRef.current) {
      circleRef.current.style.transform = "translate(-50%, -50%) rotate(0deg)";
    }
  };

  return (
    <div className="spinning-circle-container">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="paint-canvas"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
      <div ref={containerRef} className="physics-container">
        <div
          ref={circleRef}
          className={`spinning-circle ${isHovered ? "hovered" : ""} ${
            isDraggingRef.current ? "dragging" : ""
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
        />
        {balls}
      </div>
    </div>
  );
};

export default SpinningCircle;
