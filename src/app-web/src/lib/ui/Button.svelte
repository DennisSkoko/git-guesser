<button>
  <slot />
</button>

<style>
  button {
    background-color: #08424d;
    color: white;
    border: none;
    cursor: pointer;
    padding: .5em;
    transition: background-color 200ms ease;
  }

  button:hover, button:focus {
    background-color: #1b7283;
  }

  button:active {
    background-color: #08424d;
    transition: none;
  }
</style>
