<script lang="ts">
  import { page } from '$app/state'
  import 'normalize.css'
  import '../app.css'
</script>

<div>
  <menu>
    <a href="/" aria-current={page.url.pathname === '/'}>
      Guess
    </a>

    <a href="/leaderboard" aria-current={page.url.pathname === '/leaderboard'}>
      Leaderboard
    </a>
  </menu>

  <slot />
</div>

<style>
  div {
    max-width: 64em;
    margin: 0 auto;
  }

  menu {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: end;
    gap: 1em;
  }

  a {
    padding: .25em;
    color: white;
    text-decoration: none;
    transition: color 200ms ease;
  }

  a[aria-current="true"] {
    color: #1db4d1;
  }
</style>
