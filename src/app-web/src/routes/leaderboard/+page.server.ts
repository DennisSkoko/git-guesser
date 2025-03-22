import type { PageServerLoad } from './$types'
import * as leaderboard from '$lib/server/leaderboard'

export const load: PageServerLoad = async () => {
  return { leaderboard: await leaderboard.get() }
}
