import '~/assets/sass/object/atom/the-picture/_index.scss'

import {
  computed,
  defineComponent,
  PropType,
  createElement as h,
} from '@vue/composition-api'

import { srcSetPoints } from '~/assets/js/info'

export const ThePictureProps = {
  src: {
    type: String,
    default: '',
  },

  srcSetItems: {
    type: Array as PropType<string[]>,
    default: () => [],
  },

  isWebP: {
    type: Boolean,
    default: false,
  },

  width: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },

  alt: {
    type: String,
    default: '',
  },

  tag: {
    type: String,
    default: 'div',
  },
}

export default defineComponent({
  name: 'ThePicture',

  props: ThePictureProps,

  setup(props, { root }) {
    const getSrcSet = computed(() => {
      return props.srcSetItems.reduce((prev, current, i) => {
        if (i === 1) {
          return `${prev} ${srcSetPoints[i - 1]}, ${current} ${
            srcSetPoints[i]
          },`
        }
        return `${prev} ${current} ${srcSetPoints[i - 1]},`
      })
    })

    const getSize = computed(() => {
      return {
        paddingTop: `calc(100% * ${props.height} / ${props.width} / 2)`,
        paddingBottom: `calc(100% * ${props.height} / ${props.width} / 2)`,
      }
    })

    const replaceWebP = (string: string) => {
      return string.replace(/.jpg/g, '.webp')
    }

    const directives = !root.$image.lazy
      ? [
          {
            name: 'lazy',
            value: props.src,
          },
        ]
      : undefined

    return () =>
      h(
        props.tag,
        {
          staticClass: 'the-picture',
          style: getSize.value,
        },
        [
          h('img', {
            attrs: {
              src:
                root.$image.ready && root.$image.lazy
                  ? props.isWebP && root.$image.webP
                    ? replaceWebP(props.src)
                    : props.src
                  : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
              srcset:
                props.srcSetItems[0] && root.$image.ready && root.$image.lazy
                  ? props.isWebP && root.$image.webP
                    ? replaceWebP(getSrcSet.value)
                    : getSrcSet.value
                  : undefined,
              dataSrcset:
                props.srcSetItems[0] && !root.$image.lazy
                  ? props.isWebP && root.$image.webP
                    ? replaceWebP(getSrcSet.value)
                    : getSrcSet.value
                  : undefined,
              alt: props.alt,
              loading: root.$image.lazy ? 'lazy' : undefined,
            },
            directives,
            staticClass: 'tp__img',
          }),
        ],
      )
  },
})
