<template>
  <v-app id="main-serie-details">
    <HomeHeader />
    <v-container id="container-serie-details" fluid>
      <v-row justify="center">
        <v-col cols="3">
          <v-img :src="serieSrc" class="img-poster" />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <h1>{{ serieTitle }}</h1>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col v-for="episode in episodeList" :key="episode.id" @click="goToEpisode(episode.id)" cols="12" class="serie-card">
          <v-card color="#6cb0b8" elevation="10">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  v-text="episode.title"
                  class="headline"
                />
                <v-card-subtitle v-text="episode.description" />
              </div>
              <v-avatar
                class="ma-3"
                size="150"
              >
                <v-img :src="episode.src" />
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script type="text/javascript">
import axios from 'axios'
import HomeHeader from '~/components/HomeHeader'

export default {
  name: 'SerieDetails',
  components: {
    HomeHeader
  },

  data () {
    return {
      serieTitle: null,
      serieSrc: '',
      episodeList: []
    }
  },

  mounted () {
    const ref = this
    const url = new URL(window.location.href)
    const serieId = url.searchParams.get('serieId')
    ref.serieTitle = url.searchParams.get('serieTitle')
    ref.serieSrc = 'http://static.tvmaze.com/uploads/images/original_untouched/' + url.searchParams.get('serieSrc')

    if (serieId) {
      ref.getSerieEpisodes(serieId)
    } else {
      alert('Tente novamente mais tarde.')
      this.$router.push({
        path: '/'
      })
    }
  },

  methods: {
    goToEpisode (episodeId) {
      this.$router.push({
        path: `/episode-details?episodeId=${episodeId}`
      })
    },

    getSerieEpisodes (serieId) {
      const ref = this

      axios.get(`https://api.tvmaze.com/shows/${serieId}/episodes`)
        .then((response) => {
          const epiInfo = response.data.map((epi) => {
            let description = ''
            let src = 'https://farm5.staticflickr.com/4363/36346283311_74018f6e7d_o.png'

            if (epi.summary) {
              description = epi.summary.replace(/(<([^>]+)>)/ig, '')
            }

            if (epi.image && epi.image.original) {
              src = epi.image.original
            }

            return {
              'id': epi.id,
              'title': epi.name,
              src,
              description
            }
          })

          ref.episodeList = epiInfo
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
}
</script>
<style type="text/css" scoped>
#main-serie-details {
  background-color: #abcfd4;
}

#container-serie-details {
  max-width: 1100px;
  margin: 20px auto 0 auto;
}

.serie-card {
  cursor: pointer;
  margin: 10px 0px;
}

.img-poster {
  border-radius: 10px
}

</style>
