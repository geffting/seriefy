<template>
  <v-app id="main-home">
    <HomeHeader />
    <v-container id="main-content" fluid>
      <v-row align="center" justify="start" no-gutters>
        <v-col cols="8">
          <v-text-field
            v-model="search"
            outlined
            label="Digite o nome da série"
            color="black"
          />
        </v-col>
        <v-col cols="1">
          <v-btn
            @click="findSerie"
            class="btn-search"
            outlined
            x-large
            elevation="2"
          >
            Buscar
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="seriesList.length > 0" no-gutters>
        <v-col v-for="serie in seriesList" :key="serie.id" @click="goToSerie(serie.id, serie.title, serie.src)" cols="12" class="serie-card">
          <v-card color="#6cb0b8" elevation="10">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  v-text="serie.title"
                  class="headline"
                />
                <v-card-subtitle v-text="serie.description" />
              </div>
              <v-avatar
                class="ma-3"
                size="300"
              >
                <v-img :src="serie.src" />
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col v-if="msgErro" cols="12" class="text-center">
          <h1><i>Nenhum resultado para busca atual</i></h1>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script type="text/javascript">
import axios from 'axios'
import HomeHeader from '~/components/HomeHeader'

export default {
  name: 'Home',
  components: {
    HomeHeader
  },

  data () {
    return {
      search: '',
      seriesList: [],
      msgErro: false
    }
  },

  methods: {
    goToSerie (serieId, serieTitle, serieSrc) {
      const srcImg = serieSrc.replace('http://static.tvmaze.com/uploads/images/original_untouched/', '')
      this.$router.push({
        path: `/serie-details?serieId=${serieId}&serieTitle=${serieTitle}&serieSrc=${srcImg}`
      })
    },

    findSerie () {
      const ref = this

      if (!ref.search || !ref.search.trim()) {
        return
      }

      axios.get(`https://api.tvmaze.com/search/shows?q=${ref.search}`)
        .then((response) => {
          const seriesInfo = response.data.map((serie) => {
            let description = ''
            let src = 'https://farm5.staticflickr.com/4363/36346283311_74018f6e7d_o.png'

            if (serie.show.summary) {
              description = serie.show.summary.replace(/(<([^>]+)>)/ig, '')
            }

            if (serie.show.image && serie.show.image.original) {
              src = serie.show.image.original
            }

            return {
              'id': serie.show.id,
              'title': serie.show.name,
              src,
              description
            }
          })

          if (seriesInfo.length === 0) {
            ref.msgErro = true
          }

          ref.seriesList = seriesInfo
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
}
</script>
<style type="text/css" scoped>
#main-home {
  background-color: #abcfd4;
}

#main-content {
  max-width: 1100px;
  margin: 20px auto 0 auto;
}

a {
  text-decoration: none;
}

#main-content .btn-search {
  margin: 0 0 30px 20px;
}

.serie-card {
  cursor: pointer;
  margin: 10px 0px;
}

</style>
