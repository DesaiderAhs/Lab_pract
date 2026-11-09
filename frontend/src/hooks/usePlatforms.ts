import { useEffect, useState } from 'react'
import type { Platform } from '../types/platform'
import { getPlatforms } from '../services/platforms'

type PlatformsLoad =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: Platform[] }

export function usePlatforms() {
  const [load, setLoad] = useState<PlatformsLoad>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    setLoad({ status: 'loading' })

    getPlatforms(controller.signal)
      .then((data) => {
        if (active) setLoad({ status: 'success', data })
      })
      .catch((error: unknown) => {
        if (!active) return
        const message =
          error instanceof Error
            ? error.message
            : 'Не удалось загрузить справочник.'
        setLoad({ status: 'error', message })
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [attempt])

  function retry() {
    setLoad({ status: 'loading' })
    setAttempt((current) => current + 1)
  }

  return { load, retry }
}