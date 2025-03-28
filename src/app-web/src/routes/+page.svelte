<script lang="ts">
  import type { PageProps } from './$types'
  import { enhance } from '$app/forms'
  import Button from '$lib/ui/Button.svelte'
  import Input from '$lib/ui/Input.svelte'
  import Jumbotron from '$lib/ui/Jumbotron.svelte'

  let { form }: PageProps = $props()
</script>

<Jumbotron title="Welcome to GitGuesser x1000!">
  {#snippet content()}
    <p>
      Welcome to a simple mini game called GitGuesser x1000! In development, every code change is saved
      into something called "commit". Every commit has an author, date when it was created and a simple
      title/text describing what it changes. In this game you will enter some text and then guess how
      many commits that matches that specified text with their title/text.
    </p>
  {/snippet}
</Jumbotron>

<div class="forms">
  <form method="POST" use:enhance>
    <Input
      label="Search term"
      name="search"
      placeholder="change color"
      required
    />

    <Input
      label="Guess the count"
      name="count"
      type="number"
      min="1"
      placeholder="3"
      required
    />

    <Button>Make your guess!</Button>

    {#if form && !form.valid}
        <p class="error">{form.reason}</p>
    {/if}
  </form>
</div>

<style>
  .forms {
    margin: 0 auto;
    max-width: 30em;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .error {
    color: red;
    text-align: center;
    margin: 0;
  }

  p {
    margin: 0;
  }
</style>
