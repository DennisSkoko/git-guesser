import { type Actions, error, redirect } from '@sveltejs/kit'
import * as leaderboard from '$lib/server/leaderboard'
import * as commits from '$lib/server/commits'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
  const score = await leaderboard.get(params.id)

  if (!score) error(404)

  const matches = commits.search(score?.search)
  return { score, matches }
}

export const actions = {
  default: async ({ request, params }) => {
    const score = await leaderboard.get(params.id as string)

    if (!score) error(404)
    if (score.name !== null) error(409)

    const data = await request.formData()
    const name = data.get('name') as string

    score.name = name

    await leaderboard.update(score)

    return redirect(303, `/leaderboard#${score.id}`)
  }
} satisfies Actions
