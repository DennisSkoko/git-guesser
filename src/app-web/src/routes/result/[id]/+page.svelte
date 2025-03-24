<script lang="ts">
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()

  function highlightMatch(text, search) {
    const regex = new RegExp(`(${search})`, 'gi')
    return text.replace(regex, '<strong>$1</strong>')
  }
</script>

<p>
  Your search term ({data.score.search}) gave a total of {data.score.matches} matches while your
  guess was {data.score.guess}. You got a total of {data.score.score} points!
</p>

<form method="POST" use:enhance>
  <input type="text" name="name" />
  <button>Save to leaderboard</button>
</form>

<ul>
  {#each data.matches as commit}
    <li><pre>{commit.id}</pre> - {@html highlightMatch(commit.title, data.score.search)} - {commit.author} - {commit.date}</li>
  {/each}
</ul>
