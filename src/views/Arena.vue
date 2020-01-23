<template>
  <div class="layout">
      <div class="container fluid">
          <div class="row">
              <div class="col-md-6 mx-auto"><h2>Tepok Nyamuk</h2></div>
          </div>
          <div class="row">
              <h3 class="col-md-6 mx-auto" v-show="showCardCalled!==null">Hit: {{ showCardCalled }}</h3>
          </div>
          <div class="row">
              <h4 class="col-sm-6 mx-auto">Cards On Deck: {{ showCardsShown }}</h4>
              <div class="col-sm-6 arena mx-auto">
                    <img class="card" :src="getImg(showThisPicture)" alt="">
              </div>
          </div>
          <div class="row">
                <h2 class="col-sm-4 "> Players Card: {{ showCardsOnPlayersDeck }} </h2>
          </div>
          <div class="row justify-content-center">
                  <b-button class="col-sm-4" variant="danger" v-on:click="showCard" v-show="this.listShowed.length<13 && this.playersturn">Show Card</b-button>
                  <b-button class="col-sm-4" variant="warning" v-on:click="checkCard" v-show="this.playersturn">Hit</b-button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'arena',
  data(){
      return{
          currentRandom: 'back',
          listShowed: [],
          playersturn: true,
          cardsOnDeck: 13,
          cardsShown: 0,
          cardList: [ null,'2','3','4','5','6','7','8','9','10','Jack', 'Queen', 'King', 'As'],
          listPlayer: ['sera', 'amel'],
          currentPlayer: 'sera',
          count: 0,
      }
  },
  computed:{
      showThisPicture(){
        return `${this.currentRandom}`
      },
      showCardsOnPlayersDeck(){
        return this.cardsOnDeck
      },
      showCardsShown(){
        return this.cardsShown
      },
      showCardCalled(){
        return this.cardList[this.count]
      }
      
  },
  methods: {
      resetTurn(){
          let playersCount = this.listPlayer.length
          if(this.count===playersCount){

          }
      },
      decrementCard(){
        this.cardsOnDeck-=1
      },
      incrementCard(){
        this.cardsShown+=1
      },
      increaseCount(){
        this.count++
      },
      getRandom(){
          let pic = Math.ceil(Math.random() * 13)
          this.currentRandom = pic
          if(this.listShowed.includes(this.currentRandom)){
              this.getRandom()
          }else{
              this.listShowed.push(this.currentRandom)
          }
      },
      checkCard(){

      },
      getImg(pic){
          return require('../assets/sementara/'+ this.showThisPicture +'.png')
      },
      showCard(){
          this.getRandom()
          this.decrementCard()
          this.incrementCard()
          this.increaseCount()
          
      }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout{
    background-color: #764E8D;
    height: 100vh;
}
h2{
    text-align: center
}
.arena{
    border: 2px solid #F0DCCA;
    width: 30vw;
    height: 40vw;
}
.card{
    object-fit: contain;
    width: 100%;
    height: 100%;
}

</style>
