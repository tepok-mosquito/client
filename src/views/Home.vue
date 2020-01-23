<template >
  <div class="home">
    <div class="container">
      <div class="row justify-content-center mt-5" id="row-username" v-if="rowUsername">
        <div class="col-5">
          <form @submit.prevent="submitUsername">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Enter your username" v-model="username">
            </div>
            <button type="submit" class="btn btn-success btn-block mt-4">Ready to Play!</button>
          </form>
        </div>
      </div>
      <div class="row justify-content-center mt-5" id="row-room" v-if="rowRoom">
        <div class="col-4">
          <h3 class="text-center">Tepok Mosquito</h3>
          <button type="button" class="btn btn-primary btn-block mt-3" data-toggle="modal" data-target="#roomModal">
          Create a room
          </button>

          <div class="modal fade" id="roomModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Create a room</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body">
                          <form @submit.prevent="submitRoom">
                              <div class="form-group">
                                  <label for="roomName">Room Name</label>
                                  <input type="text" class="form-control" placeholder="Enter room name" v-model="roomName">
                              </div>
                              <button type="submit" class="btn btn-primary">Create</button>
                              <button class="btn btn-danger ml-3" data-dismiss="modal">Close</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
        </div>

        <div class="col-4">
          <p>Select a room</p>
          <ul class="list-group list-group-flush">
            <li v-for="(room, i) in listRoom" :key="i" class="list-group-item">
              {{ room }}
              <button class="btn btn-warning float-right" v-on:click.prevent="enterRoom">Enter</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {

  },
  data() {
    return {
      username: null,
      roomName:null,
      rowUsername: true,
      rowRoom: false,
      listRoom: ['room A', 'room B'],
    }
  },
  methods: {
    submitUsername () {
      localStorage.setItem('username', this.username)
      this.rowUsername = false
      this.rowRoom = true
    },
    submitRoom () {
      let room = {
        name: this.roomName
      }
      this.listRoom.push(room)
    },
    enterRoom () {

    }
  }
}
</script>
