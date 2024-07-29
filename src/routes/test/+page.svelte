<script>
  import { signIn, signOut } from "@auth/sveltekit/client";
</script>

<nav>
  <p>
    These actions are all using the methods exported from
    <code>@auth/sveltekit/client</code>
  </p>
  <div class="actions">
    <div class="wrapper-form">
      <button on:click={() => signIn("Google")}>Sign In with Google</button>
    </div>

    <button on:click={() => signOut()}> Sign Out </button>
  </div>
</nav>
