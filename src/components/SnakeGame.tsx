import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GRID_SIZE, INITIAL_SNAKE, INITIAL_DIRECTION, GAME_SPEED } from '../constants';

interface Point {
  x: number;
  y: number;
}

export const SnakeGame: React.FC<{ onScoreUpdate: (score: number) => void }> = ({ onScoreUpdate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const scoreRef = useRef(0);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // eslint-disable-next-line no-loop-func
      if (!currentSnake.some(segment => segment.x === newFood!.x && segment.y === newFood!.y)) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setIsGameOver(false);
    setIsPaused(true);
    scoreRef.current = 0;
    onScoreUpdate(0);
  };

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return;

    setSnake(prevSnake => {
      const newHead = {
        x: prevSnake[0].x + direction.x,
        y: prevSnake[0].y + direction.y,
      };

      // Collision checks
      if (
        newHead.x < 0 || newHead.x >= GRID_SIZE ||
        newHead.y < 0 || newHead.y >= GRID_SIZE ||
        prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check if food eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        scoreRef.current += 10;
        onScoreUpdate(scoreRef.current);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, isPaused, generateFood, onScoreUpdate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
        case ' ': setIsPaused(prev => !prev); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(interval);
  }, [moveSnake]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width / GRID_SIZE;

    // Clear
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid (stark, pixelated)
    ctx.strokeStyle = '#004444';
    ctx.lineWidth = 1;
    for (let i = 0; i < GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * size, 0);
      ctx.lineTo(i * size, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * size);
      ctx.lineTo(canvas.width, i * size);
      ctx.stroke();
    }

    // Food (Jarring Magenta square)
    ctx.fillStyle = '#FF00FF';
    ctx.fillRect(food.x * size, food.y * size, size, size);

    // Snake (Jarring Cyan squares)
    ctx.fillStyle = '#00FFFF';
    snake.forEach((segment, index) => {
      // Checkerboard effect inside the snake body for 'noise'
      if (index % 2 === 0) {
        ctx.fillStyle = '#00FFFF';
      } else {
        ctx.fillStyle = '#FFFFFF';
      }
      ctx.fillRect(segment.x * size, segment.y * size, size, size);
    });

  }, [snake, food]);

  return (
    <div className="relative w-full max-w-md aspect-square mx-auto raw-border bg-black overflow-hidden" id="snake-container">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="w-full h-full block"
        id="snake-canvas"
        style={{ imageRendering: 'pixelated' }}
      />
      {(isPaused || isGameOver) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10 p-6 text-center">
          {isGameOver ? (
            <>
              <h2 className="text-3xl font-pixel mb-4 text-[#FF00FF] uppercase tracking-tighter">FATAL.ERR</h2>
              <p className="mb-8 font-vt text-xl text-[#00FFFF]">DATA.CORRUPTION</p>
              <button
                onClick={resetGame}
                className="machine-btn px-6 py-4 text-xl"
                id="retry-btn"
              >
                [ SYS_REBOOT ]
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-pixel mb-4 text-[#00FFFF]">STANDBY</h2>
              <p className="mb-6 font-vt text-lg text-[#FF00FF] uppercase">/ AWAITING_INPUT</p>
              <div className="grid grid-cols-1 gap-2 text-left font-vt text-lg opacity-80 mb-8">
                <p>SEQ_UP: ARROW_UP</p>
                <p>SEQ_DN: ARROW_DOWN</p>
                <p>SEQ_LT: ARROW_LEFT</p>
                <p>SEQ_RT: ARROW_RIGHT</p>
              </div>
              <button
                onClick={() => setIsPaused(false)}
                className="machine-btn px-6 py-4 text-xl"
                id="play-btn"
              >
                [ EXECUTE ]
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
