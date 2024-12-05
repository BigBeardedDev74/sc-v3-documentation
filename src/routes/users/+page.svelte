<script>
  let { data } = $props();
  let users = data.users;
  let currentUser = $state(null);
  let type = $state(null);

  const validUser = data?.validUser;
  $inspect(validUser.role);
  const openUpdateModal = (user, event, modalType) => {
    currentUser = user;
    type = modalType;

    const UpdateModal = document.getElementById("updateModal");
    UpdateModal?.showModal();
  };

  const handleModalClose = () => {
    const UpdateModal = document.getElementById("updateModal");
    UpdateModal?.close();
    setTimeout(() => {
      currentUser = null;
      type = null;
    }, 500);
  };
</script>

{#if validUser.role === "admin"}
  <dialog class="updateModal" id="updateModal" popover>
    {#if type === "delete"}
      <p class="confirmDelete">
        Are you sure you want to delete <span class="currentUser"
          >{currentUser?.user_name}</span
        >?
      </p>

      <div class="modalButtonContainer">
        <form action="?/deleteUser" method="POST">
          <input type="hidden" name="id" value={currentUser?.id} />

          <button class="button" type="submit">Yes</button>
        </form>
        <button class="button" onclick={handleModalClose}>No</button>
      </div>
    {:else if type === "update"}
      <p class="confirmUpdate">
        Are you sure you want to update <span class="currentUser"
          >{currentUser?.user_name}</span
        >?
      </p>

      <div class="modalButtonContainer">
        <form action="?/updateUser" method="POST" id="updateForm">
          <label for="user_name">User Name</label>
          <input type="text" name="user_name" value={currentUser?.user_name} />
          <label for="user_email">User Email</label>
          <input
            type="text"
            name="user_email"
            value={currentUser?.user_email}
          />
          <label for="role">Role</label>
          <select name="role" value={currentUser?.role}>
            <option value="admin">Admin</option>
            <option value="power_user">Power User</option>
            <option value="user">User</option>
          </select>

          <button class="button" type="submit">Yes</button>
          <button class="button" type="button" onclick={handleModalClose}
            >No</button
          >
        </form>
      </div>
    {:else if type === "add"}
      <p>Add User</p>
      <form action="?/addUser" method="POST" id="updateForm">
        <label for="user_name">User Name</label>
        <input type="text" name="user_name" />
        <label for="user_email">User Email</label>
        <input type="text" name="user_email" />
        <label for="role">Role</label>
        <select name="role" value={currentUser?.role}>
          <option value="admin">Admin</option>
          <option value="power_user">Power User</option>
          <option value="user">User</option>
        </select>
        <button class="button" type="submit">Add</button>
        <button class="button" type="button" onclick={handleModalClose}
          >Cancel</button
        >
      </form>
    {/if}
  </dialog>

  <div>
    <div class="userHeader">
      <h1>Users</h1>
      <button class="button" onclick={() => openUpdateModal(null, null, "add")}>
        Add User
      </button>
    </div>
  </div>
  <table>
    <thead>
      <tr>
        <th>User Name</th>
        <th>User Email</th>
        <th>Role</th>
        <th colspan="2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each users as user}
        <tr>
          <td><p>{user.user_name}</p></td>
          <td><p>{user.user_email}</p></td>
          <td><p>{user.role}</p></td>
          <td>
            <button
              onclick={(event) => openUpdateModal(user, event, "update")}
              aria-label="Edit User"
            >
              <div class="buttonIcon">
                <svg
                  viewBox="0 0 535 542"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M268 105.231C268 102.47 265.761 100.231 263 100.231H49C24.6994 100.231 5 119.931 5 144.231V492.231C5 516.532 24.6995 536.231 49 536.231H397C421.301 536.231 441 516.532 441 492.231V263.231C441 260.47 438.761 258.231 436 258.231H407C404.239 258.231 402 260.47 402 263.231V492.231C402 494.993 399.761 497.231 397 497.231H49C46.2386 497.231 44 494.993 44 492.231V144.231C44 141.47 46.2386 139.231 49 139.231H263C265.761 139.231 268 136.993 268 134.231V105.231Z"
                    class="iconPath iconFill"
                    stroke-width="10"
                    stroke-linejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M186.705 311.883L174.677 359.266L222.063 347.236L466.712 102.587L431.357 67.2316L186.705 311.883Z"
                    class="iconFill"
                  />
                  <path
                    d="M467 32.0513L491.749 7.30253C495.654 3.39729 501.986 3.39729 505.891 7.30253L527.104 28.5157C531.009 32.421 531.009 38.7526 527.104 42.6579L502.355 67.4066L467 32.0513Z"
                    class="iconFill"
                  />
                </svg>
              </div></button
            >
          </td>
          <td>
            <button
              aria-label="Delete"
              onclick={(event) => openUpdateModal(user, event, "delete")}
              ><div class="buttonIcon">
                <svg
                  viewBox="0 0 402 544"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M77.2117 519L38.8451 185.446H363.428L333.675 519H77.2117Z"
                    class="iconPath"
                    stroke-width="50"
                  />
                  <line
                    x1="156.684"
                    y1="499.382"
                    x2="155.262"
                    y2="311.685"
                    class="iconPath"
                    stroke-width="50"
                    stroke-linecap="round"
                  />
                  <line
                    x1="244.92"
                    y1="499.382"
                    x2="243.498"
                    y2="311.685"
                    class="iconPath"
                    stroke-width="50"
                    stroke-linecap="round"
                  />
                  <mask id="path-4-inside-1_3222_16" fill="white">
                    <rect
                      y="76.2173"
                      width="401.562"
                      height="46.8188"
                      rx="20"
                    />
                  </mask>
                  <rect
                    y="76.2173"
                    width="401.562"
                    height="46.8188"
                    rx="20"
                    class="iconPath"
                    stroke-width="46.8188"
                    mask="url(#path-4-inside-1_3222_16)"
                  />
                  <path
                    d="M270.109 92.7174H286.609V76.2174V43C286.609 28.3645 274.744 16.5 260.109 16.5H141.453C126.818 16.5 114.953 28.3644 114.953 43V76.2174V92.7174H131.453H270.109Z"
                    class="iconPath"
                    stroke-width="33"
                  />
                </svg>
              </div>
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <p>You are not authorized to view this page</p>
{/if}

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid var(--textColor);
    border-radius: 0.5em;
  }
  th,
  td {
    padding: 10px;
    text-align: left;
    border: 1px solid var(--textColor);
  }

  button {
    margin: 0 0 0 1rem;
    background: var(--buttonBgColor);
    color: var(--buttonTextColor);
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    &:hover {
      background: oklch(47.44% 0.077 233.06);
    }
  }

  .buttonIcon {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  .iconPath {
    stroke: var(--buttonTextColor);
  }
  .iconFill {
    fill: var(--buttonTextColor);
  }

  .userHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    h1 {
      margin: 0;
    }
  }
</style>
