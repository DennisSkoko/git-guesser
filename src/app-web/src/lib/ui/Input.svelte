<script lang="ts">
  const { label, name, ...rest } = $props()
</script>

<label>
  <span>{label}</span>
  <input name={name} {...rest} />
</label>

<style>
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
</style>
