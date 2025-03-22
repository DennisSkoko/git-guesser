import { v4 as uuid } from 'uuid'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import * as commits from '$lib/server/commits'
import * as leaderboard from '$lib/server/leaderboard'

function getScore(matches: number, guess: number) {
  return Math.max(0, matches - Math.abs(matches - guess))
}

export const actions = {
  guess: async ({ request }) => {
    const data = await request.formData()

    const search = data.get('search') as string
    const countAsString = data.get('count') as string

    if (!search || !countAsString) {
      return fail(400, { valid: false, reason: 'Search term and count are required' })
    }

    const count = parseInt(countAsString, 10)

    if (Number.isNaN(count) || count <= 0) {
      return fail(400, { valid: false, reason: 'Count must be a number and higher than 0' })
    }

    const matches = commits.search(search)

    return {
      valid: true,
      matches: matches,
      guess: count,
      search,
      score: getScore(matches.length, count)
    }
  },

  saveToLeaderboard: async ({ request }) => {
    const data = await request.formData()

    const name = data.get('name') as string
    const search = data.get('search') as string
    const guessAsString = data.get('guess') as string
    const scoreAsString = data.get('score') as string
    const matchesAsString = data.get('matches') as string

    if (!name || !search || !guessAsString || !scoreAsString || !matchesAsString) {
      return fail(400, { valid: false })
    }

    const guess = parseInt(guessAsString, 10)
    const score = parseInt(scoreAsString, 10)
    const matches = parseInt(matchesAsString, 10)

    if (Number.isNaN(score) || Number.isNaN(matches) || score < 0 || matches < 0) {
      return fail(400, { valid: false })
    }

    const actualMatches = commits.search(search)

    if (actualMatches.length !== matches || score != getScore(actualMatches.length, guess)) {
      return fail(400)
    }

    const id = uuid()
    await leaderboard.add({ id, name, search, guess, score, matches })

    return redirect(303, `/leaderboard#${id}`)
  }
} satisfies Actions
