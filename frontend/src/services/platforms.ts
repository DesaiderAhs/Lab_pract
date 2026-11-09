import type { Platform } from '../types/platform'

function isPlatform(value: unknown): value is Platform {
  if (typeof value !== 'object' || value === null) return false
  return (
    'id' in value &&
    typeof value.id === 'string' &&
    value.id.trim().length > 0 &&
    value.id === value.id.trim() &&
    'name' in value &&
    typeof value.name === 'string' &&
    value.name.trim().length > 0
  )
}

export function parsePlatforms(value: unknown): Platform[] {
  if (!Array.isArray(value) || !value.every(isPlatform)) {
    throw new Error('Неверная структура справочника платформ.')
  }

  const platforms: Platform[] = value
  const ids = new Set(platforms.map((p) => p.id))
  if (ids.size !== platforms.length) {
    throw new Error('В справочнике повторяются идентификаторы платформ.')
  }

  return platforms
}

const platformsUrl = `${import.meta.env.BASE_URL}demo/platforms.json`

export async function getPlatforms(signal: AbortSignal): Promise<Platform[]> {
  const response = await fetch(platformsUrl, {
    signal,
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Не удалось загрузить платформы: HTTP ${response.status}`)
  }

  const value: unknown = await response.json()
  return parsePlatforms(value)
}