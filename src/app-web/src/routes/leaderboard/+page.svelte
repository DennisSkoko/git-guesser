<script lang="ts">
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
</script>

<h1>The greatest guessers when it comes to guessing</h1>

<ol>
  {#each data.leaderboard as entry}
    <li>{entry.name} - {entry.score} points - {entry.search}</li>
  {/each}
</ol>
