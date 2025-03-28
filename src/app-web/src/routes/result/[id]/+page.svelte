<script lang="ts">
  import Button from '$lib/ui/Button.svelte'
  import Input from '$lib/ui/Input.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()

  function highlightMatch(text, search) {
    const regex = new RegExp(`(${search})`, 'gi')
    return text.replace(regex, '<strong>$1</strong>')
  }
</script>

<form method="POST" use:enhance>
  <p>
    Your search term ({data.score.search}) gave a total of {data.score.matches} matches while your
    guess was {data.score.guess}. You got a total of {data.score.score} points!
  </p>

  <Input name="name" label="Name" />

  <Button>Save to leaderboard</Button>
</form>

<ul>
  {#each data.matches as commit}
    <li>
      <div class="header">
        <h2>{commit.author}</h2>
        <div class="metadata">
          <span>{commit.date}</span>
          <pre>{commit.id}</pre>
        </div>
      </div>
      {@html highlightMatch(commit.title, data.score.search)}
    </li>
  {/each}
</ul>

<style>
  form {
    margin: 3em auto 0;
    max-width: 30em;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  form p {
    margin: 0;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin-top: 5em;
  }

  li {
    border: thin solid #08424d;
    padding: .5em;
  }

  .header {
    margin-bottom: 1em;
  }

  @media (min-width: 40rem) {
    .header {
      display: flex;
      gap: .5em;
    }
  }

  .metadata {
    display: flex;
    gap: .5em;
  }

  h2 {
    font-size: 1rem;
    margin: 0;
    flex: 1 1 auto;
    font-weight: normal;
  }

  pre {
    margin: 0;
  }

  pre, .header span {
    color: #898989;
  }

  li :global(strong) {
    color: #1db4d1;
  }
</style>
