import escape from 'escape-html'
import { v4 as uuid } from 'uuid'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import * as commits from '$lib/server/commits'
import * as leaderboard from '$lib/server/leaderboard'

function getScore(matches: number, guess: number) {
  return Math.max(0, matches - Math.abs(matches - guess))
}

export const actions = {
  default: async ({ request }) => {
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
    const id = uuid()

    await leaderboard.add({
      id,
      name: null,
      search: escape(search),
      guess: count,
      score: getScore(matches.length, count),
      matches: matches.length
    })

    redirect(303, `result/${id}`)
  }
} satisfies Actions
