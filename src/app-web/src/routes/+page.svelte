<script lang="ts">
  import type { PageProps } from './$types'
  import { enhance } from '$app/forms'
  import Input from '$lib/ui/Input.svelte'
  import Jumbotron from '$lib/ui/Jumbotron.svelte'

  let { form }: PageProps = $props()
</script>

<Jumbotron title="Welcome to GitGuesser x1000!">
  <p>
    Welcome to a simple mini game called GitGuesser x1000! In development, every code change is saved
    into something called "commit". Every commit has an author, date when it was created and a simple
    title/text describing what it changes. In this game you will enter some text and then guess how
    many commits that matches that specified text with their title/text.
  </p>
</Jumbotron>

<div class="forms">
  <form method="POST" use:enhance>
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

  label {
    width: 100%;
    display: block;
  }

  label span {
    display: block;
    margin-bottom: .3em;
  }

  input {
    border: thin solid #08424d;
    background-color: transparent;
    color: white;
    padding: .25em;
    width: 100%;
    transition: border-color 200ms ease;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
    border-color: #1b7283;
  }

  input:not(:placeholder-shown):invalid {
    border-color: #980000;
  }

  form button {
    background-color: #08424d;
    color: white;
    border: none;
    cursor: pointer;
    padding: .5em;
    transition: background-color 200ms ease;
  }

  form button:hover, form button:focus {
    background-color: #1b7283;
  }


  form button:active {
    background-color: #08424d;
    transition: none;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  .error {
    color: red;
    text-align: center;
    margin: 0;
  }
</style>
