import { watch, onUnmounted, type Ref } from 'vue'
import type { IShowDetails } from '@/types/types'

/**
 * Composable function to dynamically update the background image of the page
 * based on the provided show details.
 *
 * It watches the given `showDetails` reference and updates the background
 * when the details change. If the show details contain an embedded image
 * marked as 'background', that image is used. If not, it defaults to using
 * the first episode's image. If no images are available, the background is
 * unset.
 *
 * @param {Ref<IShowDetails | null>} showDetails - A ref holding the show
 * details object, which may be null.
 */
export function useDynamicBackground(showDetails: Ref<IShowDetails | null>) {
  /**
   * Updates the background image of the page based on the given show details.
   *
   * If the show details have an embedded image with the type 'background', it will
   * be used as the background image. Otherwise, the first episode's image will be
   * used. If no image is available, the background image will be unset.
   *
   * @param {IShowDetails | null} details - The show details object
   */
  const updateBackground = (details: IShowDetails | null) => {
    let bgUrl = ''

    if (details) {
      if (details._embedded?.images && Array.isArray(details._embedded.images)) {
        const bgImage = details._embedded.images.find((image) => image.type === 'background')
        if (bgImage?.resolutions?.original?.url) {
          bgUrl = bgImage.resolutions.original.url
        }
      }

      if (!bgUrl && details._embedded?.episodes && details._embedded.episodes.length > 0) {
        const episodeImage = details._embedded.episodes[0]?.image
        if (episodeImage?.original) {
          bgUrl = episodeImage.original
        }
      }
    }

    if (bgUrl) {
      document.body.style.backgroundImage = `url(${bgUrl})`
      document.body.style.backgroundSize = 'cover'
      document.body.style.backgroundPosition = 'center'
      document.body.style.backgroundRepeat = 'no-repeat'
    } else {
      document.body.style.backgroundImage = ''
    }
  }

  const stopWatch = watch(
    showDetails,
    (newDetails) => {
      updateBackground(newDetails)
    },
    { immediate: true },
  )

  onUnmounted(() => {
    document.body.style.backgroundImage = ''
    stopWatch()
  })
}
