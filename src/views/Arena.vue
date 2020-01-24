<template>
  <!-- <div class="layout">
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
                  <b-button class="col-sm-4" variant="danger" v-on:click="showCard" v-if="dataArena.listShowed.length<14 && this.playersturn==true">Show Card</b-button>
                  <b-button class="col-sm-4" variant="warning" v-on:click="checkWinCondition" v-show="dataArena.listShowed.length<14">Hit</b-button>
          </div>
      </div>
  </div> -->
  
<div class="board">
  <div class="title">
    <h1>Tepok Nyamuk</h1>
  </div>
 
      <div class="keterangan">
        <span class="keterangan-hit">hit: {{ showCardCalled }}</span>
        <span class= "keterangan-deck">Cards On Deck: {{ showCardsShown }}</span>
        <img class="card-game" :src="getImg(showThisPicture)" alt="">
      </div> 
      
     <div class="player-info">
       <span>Players Card: {{ showCardsOnPlayersDeck }}</span>
       <span>Poin: {{ showPoints }}</span>
    </div>

  
  <div class="button">
    <a class="btn" href="#" v-on:click="showCard" v-if="dataArena.listShowed.length<14 && this.playersturn==true">show card</a>
    <a class="btn" href="#" v-on:click="checkWinCondition" v-show="dataArena.listShowed.length<14">hit</a>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import socket from '../config/socket'

export default {
  name: 'arena',
  data(){
      return{
          playersturn: false,
          points: 0,
          flag: false
   
      }
  },
  computed:{
      ...mapState(['username', 'lobby', 'dataArena']),
      showPoints(){
          return `Player's Points: ${this.points}`
      },
      showThisPicture(){
        return `${this.dataArena.currentRandom}`
      },
      showCardsOnPlayersDeck(){
        return this.dataArena.cardsOnDeck
      },
      showCardsShown(){
        return this.dataArena.cardsShown
      },
      showCardCalled(){
        return this.dataArena.cardList[this.dataArena.cardsShown]
      }
      
  },
  mounted(){
        socket.on('setDataArena', data => {
            console.log('masuk on socket')
              this.checkPlayersTurn()
              this.resetTurn()
              this.$store.commit('setDataArena', data)
        })
      },
  created(){     
      if(this.dataArena.listPlayer[this.dataArena.count]==this.username){
            this.playersturn = true
      }
  },
  methods: {
      checkPlayersDeck(){
          if(this.showCardsOnPlayersDeck==0){
            //   this.winStatus = true
              //kalau winstatus true langsung aja yg lain kalah
        }
      },
      checkPlayersTurn(){
          if(this.dataArena.listPlayer[this.dataArena.count]==this.username){
              this.playersturn = true
          }else {
            //   console.log('masuk ga ke check turn')
              this.playersturn = false
          }
      },
      resetTurn(){
          let playersCount = this.dataArena.listPlayer.length
          if(this.dataArena.count >= playersCount){
              this.dataArena.count = 0
          }
          this.flag = true
      },
      decrementAndIncrement(){
          console.log('increament')
        this.dataArena.cardsOnDeck-=1
        this.dataArena.cardsShown+=1
        this.dataArena.count++
      },
      getRandom(){
          let pic = Math.ceil(Math.random() * 13)
          this.dataArena.currentRandom = pic
          if(this.dataArena.listShowed.includes(this.dataArena.currentRandom)){
              this.getRandom()
          }else{
              this.dataArena.listShowed.push(this.dataArena.currentRandom)
          }
          this.decrementAndIncrement()
      },
      checkWinCondition(){
          if(this.dataArena.showCardCalled==this.dataArena.showThisPicture){
              this.points+=1
              //harusnya kartu yang ditengah dibagi kelawan
          }else if(this.dataArena.showCardCalled!=this.dataArena.showThisPicture){
              //harusnya kartu yang ditengah dikasih ke yg salah
              this.points-=1
          }
          
      },
      getImg(pic){
          return require('../assets/sementara/'+ this.showThisPicture +'.png')
      },
      showCard(){
        this.getRandom()
        this.checkPlayersTurn()
        this.checkPlayersDeck()
        this.resetTurn()
     
            socket.emit('gamePlay', this.dataArena)
        
      }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .layout{
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
} */


@import url('https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap');

.board{
  position: absolute;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* top: 20%; */
  /* border: 10px solid #2d3436; */
  transform: translate(-50%);
  left: 50%;  
  font-family: 'Roboto', sans-serif;
  /* border-radius: 10px; */
  display: flex;
  flex-direction: column;
  background-image: url('../assets/bg-arena.jpeg');
  /* background: rgb(236,240,241);
  background: radial-gradient(circle, rgba(236,240,241,1) 0%, rgba(46,204,113,1) 48%, rgba(39,174,96,1) 86%);  */
  padding: 30px;
  height: 100vh;
  width: 100%;
  text-align:center;
  text-transform: uppercase;

}

.keterangan{
  /* position: relative; */
  left: -50%;
  display: flex;
  flex-direction: column;
  background-color: #95a5a681;
  text-align: center;
  border-radius: 30px;
  padding: 30px;
  height:100%;
  color: #ffffff;
  font-size: 25px;
}

.keterangan-hit {
  order: 2;
  margin-bottom:10px
}
.keterangan-deck{
  order: 2;
  margin-bottom: 10px
}

.player-info{
  margin-top: 30px;
    display: flex;
    justify-content: space-evenly;
}

.card-game{
  position: absolute;
  order:99;
  width: 300px;
  top: 25%;
  left: 50%;
  transform: translate(-50%);
}

.button{
    margin-top: 30px;
    display: flex;
    justify-content: space-evenly;
}
.btn:link,
.btn:visited {
    text-transform: uppercase;
    text-decoration: none;
    padding: 1.5rem 4rem;
    border-radius: 10rem;
    display: inline-block;
    transition: all .2s;
    background-color: #ffffff;
    color: #2d3436;
}

.btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 1rem 2rem;
}

.btn:active {
    transform: translateY(-1px);
    box-shadow: 0 1rem 1rem #2d34368c;
}
</style>
