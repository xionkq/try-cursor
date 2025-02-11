import { useEffect, useRef } from 'react'

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<(() => void) | undefined>(undefined)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return
    
    const id = setInterval(() => {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }, delay)
    
    return () => clearInterval(id)
  }, [delay])
} 