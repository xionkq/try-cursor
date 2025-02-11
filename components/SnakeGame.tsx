'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useInterval } from '../hooks/useInterval'

type Position = {
  x: number
  y: number
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }])
  const [food, setFood] = useState<Position>({ x: 5, y: 5 })
  const [direction, setDirection] = useState<Direction>('RIGHT')
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [speed, setSpeed] = useState(200)

  const generateFood = useCallback(() => {
    const x = Math.floor(Math.random() * 20)
    const y = Math.floor(Math.random() * 20)
    setFood({ x, y })
  }, [])

  const moveSnake = useCallback(() => {
    if (gameOver) return

    const newSnake = [...snake]
    const head = { ...newSnake[0] }

    switch (direction) {
      case 'UP':
        head.y -= 1
        break
      case 'DOWN':
        head.y += 1
        break
      case 'LEFT':
        head.x -= 1
        break
      case 'RIGHT':
        head.x += 1
        break
    }

    // 检查是否撞墙
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
      setGameOver(true)
      return
    }

    // 检查是否撞到自己
    if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true)
      return
    }

    newSnake.unshift(head)

    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
      setScore(score + 1)
      generateFood()
      setSpeed(prev => Math.max(prev - 10, 50))
    } else {
      newSnake.pop()
    }

    setSnake(newSnake)
  }, [snake, direction, food, gameOver, score, generateFood])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP')
          break
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN')
          break
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT')
          break
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT')
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [direction])

  useInterval(moveSnake, speed)

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }])
    setFood({ x: 5, y: 5 })
    setDirection('RIGHT')
    setGameOver(false)
    setScore(0)
    setSpeed(200)
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-20 gap-0 bg-gray-800 p-4 rounded-lg">
        {Array.from({ length: 400 }).map((_, index) => {
          const x = Math.floor(index % 20)
          const y = Math.floor(index / 20)
          const isSnake = snake.some(segment => segment.x === x && segment.y === y)
          const isFood = food.x === x && food.y === y

          return (
            <div
              key={index}
              className={`w-5 h-5 border border-gray-700 ${
                isSnake ? 'bg-green-500' : isFood ? 'bg-red-500' : 'bg-gray-900'
              }`}
            />
          )
        })}
      </div>
      <div className="mt-4 text-center text-white">
        <p className="text-xl mb-2">分数: {score}</p>
        {gameOver && (
          <div>
            <p className="text-red-500 text-2xl mb-4">游戏结束!</p>
            <button
              onClick={resetGame}
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
            >
              重新开始
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 