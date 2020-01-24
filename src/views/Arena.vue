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
                <h4 class="col-sm-4 "> {{ showPoints }} </h4>
          </div>
          <div class="row justify-content-center">
                  <b-button class="col-sm-4" variant="danger" v-on:click="showCard" v-if="this.listShowed.length<14 && this.playersturn==true">Show Card</b-button>
                  <b-button class="col-sm-4" variant="warning" v-on:click="checkWinCondition" v-show="this.listShowed.length<14">Hit</b-button>
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
          playersturn: false,
          cardsOnDeck: 13,
          cardsShown: 0,
          cardList: [ null,'2','3','4','5','6','7','8','9','10','Jack', 'Queen', 'King', 'As'],
          listPlayer: ['sera', 'amel'],
          currentPlayer: 'sera',
          count: 0,
          points: 0,
          winStatus: false
      }
  },
  computed:{
      showPoints(){
          return `Player's Points: ${this.points}`
      },
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
  created(){
      if(this.listPlayer[this.count]==this.currentPlayer){
              this.playersturn = true
        }
  },
  methods: {
      checkPlayersDeck(){
          if(this.showCardsOnPlayersDeck==0){
              this.winStatus = true
              //kalau winstatus true langsung aja yg lain kalah
        }
      },
      checkPlayersTurn(){
        //   console.log(this.listPlayer[this.count])
          if(this.listPlayer[this.count]==this.currentPlayer){
              this.playersturn = true
          }else if(this.listPlayer[this.count]!=this.currentPlayer){
            //   console.log('masuk ga ke check turn')
              this.playersturn = false
          }
      },
      resetTurn(){
          let playersCount = this.listPlayer.length
          if(this.count===playersCount){
              this.count = 0
          }
      },
      decrementAndIncrement(){
        this.cardsOnDeck-=1
        this.cardsShown+=1
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
      checkWinCondition(){
          if(this.showCardCalled==this.showThisPicture){
              this.points+=1
              //harusnya kartu yang ditengah dibagi kelawan
          }else if(this.showCardCalled!=this.showThisPicture){
              //harusnya kartu yang ditengah dikasih ke yg salah
              this.points-=1
          }
          
      },
      getImg(pic){
          return require('../assets/sementara/'+ this.showThisPicture +'.png')
      },
      showCard(){
        this.getRandom()
        this.decrementAndIncrement()
        // this.resetTurn()
        // this.checkPlayersTurn()
        this.checkPlayersDeck()
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
