<template>
  <v-app id="main-episode-details">
    <HomeHeader />
    <v-container id="container-episode-details" fluid>
      <v-row>
        <v-col cols="12">
          <v-card
            class="mx-auto"
            max-width="700"
          >
            <v-img
              :src="src"
              height="300px"
            />
            <v-card-title>
              <h2> {{ title }} </h2>
            </v-card-title>
            <v-card-subtitle>
              <h3> temporada {{ season }} <br> episódio {{ episode }} <br> duração: {{ runtime }}min </h3>
            </v-card-subtitle>
            <v-card-actions>
              <v-card-text class="text-right">
                descrição
              </v-card-text>
              <v-btn
                @click="show = !show"
                icon
              >
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show">
                <v-divider />
                <v-card-text>
                  {{ description }}
                </v-card-text>
              </div>
            </v-expand-transition>
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
  name: 'EpisodeDetails',
  components: {
    HomeHeader
  },

  data () {
    return {
      title: '',
      season: '',
      episode: '',
      runtime: '',
      description: '',
      src: '',
      show: false
    }
  },

  mounted () {
    const ref = this
    const url = new URL(window.location.href)
    const episodeId = url.searchParams.get('episodeId')

    if (episodeId) {
      ref.getEpisodeInfo(episodeId)
    } else {
      alert('Tente novamente mais tarde.')
      this.$router.push({
        path: '/'
      })
    }
  },

  methods: {
    getEpisodeInfo (episodeId) {
      const ref = this

      axios.get(`https://api.tvmaze.com/episodes/${episodeId}`)
        .then((response) => {
          const data = response.data

          let description = ''
          let src = 'https://farm5.staticflickr.com/4363/36346283311_74018f6e7d_o.png'

          if (data.summary) {
            description = data.summary.replace(/(<([^>]+)>)/ig, '')
          }

          if (data.image && data.image.original) {
            src = data.image.original
          }

          ref.title = data.name
          ref.season = data.season
          ref.episode = data.number
          ref.runtime = data.runtime
          ref.description = description
          ref.src = src
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
}
</script>
<style type="text/css" scoped>
#main-episode-details {
  background-color: #abcfd4;
}

#container-episode-details {
  max-width: 1100px;
  margin: 20px auto 0 auto;
}
</style>
