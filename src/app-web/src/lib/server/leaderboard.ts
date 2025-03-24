import fs from 'node:fs/promises'
import { env } from '$env/dynamic/private'

export interface Score {
  id: string
  name: string | null
  search: string
  guess: number
  matches: number
  score: number
}

async function write(data: Score[]) {
  await fs.writeFile(env.GAME_LEADERBOARD_FILE, JSON.stringify(data), 'utf8')
}

async function read() {
  try {
    return JSON.parse(await fs.readFile(env.GAME_LEADERBOARD_FILE, 'utf8')) as Score[]
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }

    throw error
  }
}

export async function add(score: Score) {
  const leaderboard = await read()

  leaderboard.push(score)

  await write(leaderboard)
}

export async function list() {
  const leaderboard = await read()

  leaderboard.sort((a, b) => a.score - b.score)

  return leaderboard
}

export async function get(id: string) {
  const leaderboard = await read()

  return leaderboard.find(score => score.id === id)
}

export async function update(score: Score) {
  const leaderboard = await read()
  const index = leaderboard.findIndex(existing => existing.id === score.id)

  leaderboard.splice(index, 1, score)

  await write(leaderboard)
}
