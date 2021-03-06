// import Vue from 'vue'
import * as Vuex from 'vuex'

import { UA } from 'nuxt-user-agent/lib/types'
import { Vue } from 'vue/types/vue'
import { SetupContext } from '@vue/composition-api'
import { Gtag } from './gtag'
import { ImageEnvType } from '~/plugins/image-env'

declare module 'vue/types/vue' {
  interface Vue {
    $exStore: Vuex.ExStore
    $state: Vuex.ExStore['state']
    $getters: Vuex.ExStore['getters']
    $commit: Vuex.ExStore['commit']
    $dispatch: Vuex.ExStore['dispatch']
    //
    $ua: UA
    $gtag: Gtag
    $mq: string
    $image: ImageEnvType
  }
}

declare module '@nuxt/vue-app/' {
  interface Context {
    $ua: UA
    $gtag: Gtag
    $image: ImageEnvType
  }
}

declare module '@vue/composition-api/dist/component/component' {
  interface SetupContext {
    refs: { [key: string]: Vue | Element | Vue[] | Element[] }
  }
}
