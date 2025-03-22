<script lang="ts">
  import type { PageProps } from './$types'
  import { enhance } from '$app/forms'

  let { form }: PageProps = $props()

  function highlightMatch(text, search) {
    const regex = new RegExp(`(${search})`, 'gi')
    return text.replace(regex, '<strong>$1</strong>')
  }
</script>

<h2>
  Welcome to GitGuesser x1000!
</h2>
<p>
  Welcome to a simple mini game called GitGuesser x1000! In development, every code change is saved
  into something called "commit". Every commit has an author, date when it was created and a simple
  title/text describing what it changes. In this game you will enter some text and then guess how
  many commits that matches that specified text with their title/text.
</p>

<form method="POST" action="?/guess" use:enhance>
  <label>
    <span>Search term</span>
    <input type="text" name="search" placeholder="change color" required />
  </label>

  <label>
    <span>Guess the count</span>
    <input type="number" name="count" min="1" placeholder="3" required />
  </label>

  <button>
    Make your guess!
  </button>
</form>

{#if form}
  {#if !form.valid}
    <p>{form.reason}</p>
  {:else}
    <p>
      Your search term ({form.search}) gave a total of {form.matches.length} matches while your
      guess was {form.guess}. You got a total of {form.score} points!
    </p>

    <form method="POST" action="?/saveToLeaderboard" use:enhance>
      <input type="text" name="name" />
      <input type="hidden" name="score" value={form.score} />
      <input type="hidden" name="search" value={form.search} />
      <input type="hidden" name="guess" value={form.guess} />
      <input type="hidden" name="matches" value={form.matches.length} />
      <button>Save to leaderboard</button>
    </form>

    <ul>
      {#each form.matches as commit}
        <li><pre>{commit.id}</pre> - {@html highlightMatch(commit.title, form.search)} - {commit.author} - {commit.date}</li>
      {/each}
    </ul>
  {/if}
{/if}
