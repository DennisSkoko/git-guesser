<script lang="ts">
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
</script>

<h1>The greatest guessers when it comes to guessing</h1>

<ol>
  {#each data.leaderboard as entry}
    <li>
      <span>{entry.name}</span>
      <span>{entry.score}p</span>
    </li>
  {/each}
</ol>

<style>
  h1 {
    margin: 2em 0;
    text-align: center;
  }

  ol {
    list-style: none;
    margin: 0 auto;
    max-width: 40em;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  li {
    border: thin solid #08424d;
    padding: .5em;
    display: flex;
    justify-content: space-between;
  }

  li:nth-child(1) {
    font-size: 1.4em;
  }

  li:nth-child(2) {
    font-size: 1.3em;
  }

  li:nth-child(3) {
    font-size: 1.2em;
  }
</style>
