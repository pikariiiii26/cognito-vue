<template>
  <div id="app">
    <template v-if="loading">
      <h1
        class="animate__animated animate__bounce animate__repeat-3 animate__slow"
      >
        <font color="gray">processing...</font>
      </h1>
    </template>
    <template v-else>
      <template v-if="signedIn">
        <h1>Logged in</h1>
        <a href="#" @click="signOut"><font color="gray">Sign Out</font></a>
      </template>
      <template v-else>
        <amplify-authenticator v-bind:authConfig="authConfig" />
        <ul>
          <li><a href="#" @click="signIn('Google')">Googleでログイン</a></li>
          <li><a href="#" @click="signIn('LINE')">LINEでログイン</a></li>
        </ul>
      </template>
    </template>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import { Auth, Hub } from "aws-amplify";

export default {
  name: "App",
  computed: {
    ...mapGetters(["loading", "signedIn"]),
  },
  data() {
    return {
      authConfig: {
        signUpConfig: {
          hiddenDefaults: ["phone_number"],
        },
      },
    };
  },
  async beforeCreate() {
    Hub.listen("auth", async (data) => {
      switch (data.payload.event) {
        case "signIn": {
          const cognitoUser = await Auth.currentAuthenticatedUser();
          console.log(`signed in ... ${cognitoUser.username}`);
          this.$store.dispatch("signedIn", true);
          this.$store.dispatch("loading", false);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "ログインしました",
            showConfirmButton: false,
            timer: 1500,
          });
          break;
        }
        default:
          break;
      }
    });
  },
  methods: {
    async signIn(provider) {
      this.$store.dispatch("loading", true);
      console.log("signIn",provider)
      const res = await Auth.federatedSignIn({ provider });
      console.log(res);
    },
    async signOut() {
      let timerInterval;
      await Auth.signOut().finally(() => {
        localStorage.clear();
        Swal.fire({
          title: "ログアウトしています...",
          timer: 1000,
          timerProgressBar: false,
          onBeforeOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {}, 100);
          },
          onClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            location.reload();
          }
        });
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
ul {
  list-style-type: none;
}
</style>
