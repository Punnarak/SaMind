// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import {
  VDataTable,
  VDataTableServer,
  VDataTableVirtual,
} from "vuetify/labs/VDataTable";

export default createVuetify({
  components: {
    ...components,
    VDataTable,
    VDataTableServer,
    VDataTableVirtual,
  },
  directives,
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
