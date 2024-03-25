import { defineNuxtPlugin } from '#app';

import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

config.autoAddCss = false;
library.add(fas);

export default defineNuxtPlugin((nuxtApp: { vueApp: { component: (arg0: string, arg1: any, arg2: {}) => void } }) => {
    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {});
})
