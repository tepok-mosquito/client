<template>
    <div class="lobby">
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col-5">
                    <h3>{{ roomName }}</h3>
                    <ul class="list-group list-group-flush">
                        <li v-for="(player, i) in listPlayer" :key="i" class="list-group-item">
                            {{ player }}
                        </li>
                    </ul>
                    <router-link to="/" class="btn btn-warning btn-block mt-5">Enter</router-link>
                </div>
                <h1>{{lobby.name}}</h1>
                <p>{{lobby.players}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'lobby',
    computed: {
        ...mapState(['lobby'])
    },
    data() {
        return {
            listPlayer: ['Player A', 'Player B', 'Player C'],
            roomName: 'Room A'
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>