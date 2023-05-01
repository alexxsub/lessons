import { createApp, h } from "vue";
import { provideApolloClient } from "@vue/apollo-composable";
import App from "./App.vue";
import { apolloClient } from "./ApolloClient";


const app = createApp({
  setup() {
    provideApolloClient(apolloClient);
  },
  render: () => h(App),
});


app.mount("#app");

//sudo ss -tulpn | grep :
