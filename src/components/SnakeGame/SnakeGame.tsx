'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './SnakeGame.module.css';

interface Tile {
    x: number;
    y: number;
}

const TILE_SIZE = 25;
const BOARD_SIZE = 500;

export default function SnakeGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    // Game state refs to avoid closure issues in the loop
    const snakeHead = useRef<Tile>({ x: 5, y: 5 });
    const snakeBody = useRef<Tile[]>([]);
    const food = useRef<Tile>({ x: 10, y: 10 });
    const velocity = useRef({ x: 0, y: 0 });
    const nextVelocity = useRef({ x: 0, y: 0 });

    const placeFood = useCallback(() => {
        food.current = {
            x: Math.floor(Math.random() * (BOARD_SIZE / TILE_SIZE)),
            y: Math.floor(Math.random() * (BOARD_SIZE / TILE_SIZE)),
        };
    }, []);

    const resetGame = () => {
        snakeHead.current = { x: 5, y: 5 };
        snakeBody.current = [];
        velocity.current = { x: 0, y: 0 };
        nextVelocity.current = { x: 0, y: 0 };
        setScore(0);
        setGameOver(false);
        setGameStarted(false);
        placeFood();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (!gameStarted && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) {
            setGameStarted(true);
        }

        switch (e.key.toLowerCase()) {
            case 'arrowup':
            case 'w':
                if (velocity.current.y !== 1) nextVelocity.current = { x: 0, y: -1 };
                break;
            case 'arrowdown':
            case 's':
                if (velocity.current.y !== -1) nextVelocity.current = { x: 0, y: 1 };
                break;
            case 'arrowleft':
            case 'a':
                if (velocity.current.x !== 1) nextVelocity.current = { x: -1, y: 0 };
                break;
            case 'arrowright':
            case 'd':
                if (velocity.current.x !== -1) nextVelocity.current = { x: 1, y: 0 };
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameStarted]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const move = () => {
            if (gameOver || !gameStarted) return;

            velocity.current = nextVelocity.current;

            // Collision with food
            if (snakeHead.current.x === food.current.x && snakeHead.current.y === food.current.y) {
                snakeBody.current.push({ ...food.current });
                setScore(s => s + 1);
                placeFood();
            }

            // Move body
            for (let i = snakeBody.current.length - 1; i >= 0; i--) {
                if (i === 0) {
                    snakeBody.current[i] = { ...snakeHead.current };
                } else {
                    snakeBody.current[i] = { ...snakeBody.current[i - 1] };
                }
            }

            // Move head
            snakeHead.current.x += velocity.current.x;
            snakeHead.current.y += velocity.current.y;

            // Collision with walls
            if (
                snakeHead.current.x < 0 ||
                snakeHead.current.x >= BOARD_SIZE / TILE_SIZE ||
                snakeHead.current.y < 0 ||
                snakeHead.current.y >= BOARD_SIZE / TILE_SIZE
            ) {
                setGameOver(true);
            }

            // Collision with self
            for (let part of snakeBody.current) {
                if (snakeHead.current.x === part.x && snakeHead.current.y === part.y) {
                    setGameOver(true);
                }
            }
        };

        const draw = () => {
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);

            // Grid lines
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < BOARD_SIZE; i += TILE_SIZE) {
                ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, BOARD_SIZE); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(BOARD_SIZE, i); ctx.stroke();
            }

            // Food
            ctx.fillStyle = '#ef4444';
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ef4444';
            ctx.fillRect(food.current.x * TILE_SIZE + 2, food.current.y * TILE_SIZE + 2, TILE_SIZE - 4, TILE_SIZE - 4);
            ctx.shadowBlur = 0;

            // Snake head
            ctx.fillStyle = '#22c55e';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#22c55e';
            ctx.fillRect(snakeHead.current.x * TILE_SIZE, snakeHead.current.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            
            // Snake body
            ctx.fillStyle = '#4ade80';
            ctx.shadowBlur = 5;
            for (let part of snakeBody.current) {
                ctx.fillRect(part.x * TILE_SIZE + 1, part.y * TILE_SIZE + 1, TILE_SIZE - 2, TILE_SIZE - 2);
            }
            ctx.shadowBlur = 0;
        };

        const gameLoop = setInterval(() => {
            move();
            draw();
        }, 100);

        return () => clearInterval(gameLoop);
    }, [gameOver, gameStarted, placeFood]);

    return (
        <div className={styles.gameContainer}>
            <div className={styles.gameHeader}>
                <div className={styles.scoreBoard}>
                    <span className={styles.label}>SKOR</span>
                    <span className={styles.value}>{score}</span>
                </div>
                {gameOver && <div className={styles.gameOverText}>GAME OVER</div>}
            </div>
            
            <div className={styles.canvasWrapper}>
                <canvas 
                    ref={canvasRef} 
                    width={BOARD_SIZE} 
                    height={BOARD_SIZE}
                    className={styles.canvas}
                />
                {!gameStarted && !gameOver && (
                    <div className={styles.overlay}>
                        <p>Gunakan WASD atau Panah untuk Bermain</p>
                    </div>
                )}
                {gameOver && (
                    <div className={styles.overlay}>
                        <button className={styles.restartBtn} onClick={resetGame}>
                            Main Lagi
                        </button>
                    </div>
                )}
            </div>

            <div className={styles.controls}>
                <div className={styles.instruction}>
                    <h3>Kontrol Game</h3>
                    <p>W / ↑ : Atas</p>
                    <p>A / ← : Kiri</p>
                    <p>S / ↓ : Bawah</p>
                    <p>D / → : Kanan</p>
                </div>
            </div>
        </div>
    );
}
