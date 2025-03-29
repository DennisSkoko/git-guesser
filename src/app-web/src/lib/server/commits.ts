import { building } from '$app/environment'
import fs from 'node:fs/promises'
import { env } from '$env/dynamic/private'

async function getCommits() {
  return (await fs.readFile(env.GAME_COMMITS_FILE, 'utf8'))
    .trim()
    .split('\n')
    .map(line => {
      const [id, title, author, date] = line.split(' ||| ')
      return { id, title, author, date }
    })
}

const commits = !building ? await getCommits() : null

export function search(query: string) {
  return commits!.filter(commit => commit.title.toLowerCase().includes(query.toLowerCase()))
}
