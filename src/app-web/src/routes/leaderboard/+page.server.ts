import type { PageServerLoad } from './$types'
import * as leaderboard from '$lib/server/leaderboard'

export const load: PageServerLoad = async () => {
  const result = await leaderboard.list()

  return {
    leaderboard: result
      .filter(entry => entry.name !== null)
      // Sort on highest score first
      .sort((a, b) => b.score - a.score)
      .map(entry => ({ name: entry.name, score: entry.score }))
      .slice(0, 10)
  }
}
