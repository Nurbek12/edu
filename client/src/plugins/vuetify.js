import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labs from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.min.css'

export default createVuetify({
  ssr: true,
  directives,
  components: {
    ...components,
    ...labs
  },
  display: {
    mobileBreakpoint: 'md'
  },
  theme: {
    defaultTheme: localStorage.getItem('theme') || 'dark',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#6200EA",
          // primary: "#0d447a",
          background: '#F5F5F5'
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: "#00E676",
          // primary: "#5dba47",
          surface: '#262932',
          background: '#1d1e26'
        },
      },
    }
  }
})