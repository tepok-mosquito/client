<template>
    <div class="lobby">
        <div class="container">
            <div class="row justify-content-center pt-5">
                <div class="col-5 bg-outside">
                    <div class="p-3">
                        <h2 class="room-name py-3">{{ lobby.name }}</h2>
                        <div class="scrool">
                            <table class="table table-borderless bg-inside">
                                <thead class="text-white">
                                    <tr><th scope="col">Player Name</th></tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(player, i) in lobby.players" :key="i">
                                        <td><img src="../assets/user.png" alt="" width="32"><span class="pl-3 text-white">{{ player }}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                       <button @click.prevent="startArena" class="btn btn-username btn-block mt-5">Enter</button>
                    </div>
                </div>
		<div class="col-5">
				<div class="flexbox">
					<div class="chat-box ml-0">
						<div id="chat_box_body" class="chat-box-body overflow-auto">
							<div id="chat_messages" v-for="(chat, i) in chats" :key="i">
								<div v-if="username != chat.username">
								<div class="profile other-profile" >
									<span>{{chat.username}}</span>
								</div>
								<div class="message other-message">
									<span>{{chat.message}}</span>
								</div>
								</div>
								<div v-else>
								<div class="profile my-profile">
									{{chat.username}}
								</div>
								<div class="message my-message">
									{{chat.message}}
								</div>
								</div>
							</div>
						</div>

						<div class="chat-box-footer">
						<textarea id="chat_input" placeholder="..." v-model="message"></textarea>
						<button id="send" @click.prevent="sendMessage">
							<svg style="width:24px;height:24px" viewBox="0 0 24 24">
							<path fill="#006ae3" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import socket from '../config/socket'
export default {
    name: 'lobby',
    data(){
        return {
      chats: [],
	  message: ''
        }
    },
    computed: {
        ...mapState(['lobby','username'])
    },
    mounted() {
        socket.on('setDataArena', data => {
              this.$store.commit('setDataArena', data)
        })
        this.publishMessage()
    },
    methods: {
        startArena(){
            socket.emit('joinArena', this.lobby)
            this.$router.push('/arena')
        },
        sendMessage: function () {  
            socket.emit('receiveMessage', {
            room: this.lobby._id,
            username: this.username,
            message: this.message
            })
        },
        publishMessage: function () {
            console.log('masuk lagiii')
            socket.on('publishMessage', (data) => {
                this.chats.push(data)
                this.message = ''
            })
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lobby {
  background-color: #ffeaa7;
  background-image: url('https://images.pexels.com/photos/1831119/pexels-photo-1831119.jpeg');
  background-size: cover;
  min-height: 800px;
  color: #fff;
  font-family: 'Roboto', sans-serif;
}
.list-group-item {
  background-color: rgba(0, 0, 0, 0.25);
}
.room-name {
    text-align: center;
    color: #fff;
    font-family: 'Roboto', sans-serif;
}
.btn {
  border-radius: unset;
}
.btn:hover {
  color: #fff;
}
.btn-username {
  background-color: #ff9c00;
  border-color: #ff9c00;
  color: #fff;
  font-weight: 500;
}
.bg-outside {
    background-color: rgba(251, 197, 49, .8);
    border-radius: 10px;
}
.bg-inside {
    background-color: rgba(225, 177, 44, .85);
}
.scrool {
    height: 300px;
    overflow: scroll;
}
 .flexbox {
	 display: flex;
	 justify-content: center;
	 align-items: center;
}
 .chat-box {
	 background-color: #fff;
	 margin: 20px;
	 width: 100%;
	 height: 400px;
	 max-height: calc(100% - 40px);
	 display: flex;
	 flex-direction: column;
	 border-radius: 13px;
	 box-shadow: 0 5px 8px rgba(0, 0, 0, 0.3);
}
 .chat-box > .chat-box-header {
	 width: 100%;
	 padding: 20px 15px;
	 border-bottom: solid 1px #cfcfcf;
	 box-sizing: border-box;
}
 .chat-box > .chat-box-body {
	 height: 100%;
	 display: flex;
	 overflow: auto;
	 display: flex;
	 flex-direction: column;
}
 .chat-box > .chat-box-body #chat_messages {
	 width: 100%;
	 padding: 0px 15px;
	 display: flex;
	 flex-direction: column;
	 box-sizing: border-box;
}
 .chat-box > .chat-box-body #chat_messages .message {
	 width: 80%;
	 padding: 20px 15px;
	 margin: 2px 0;
	 overflow: hidden;
	 border-radius: 13px;
	 transition: height 0.3s ease-in-out;
}
 .chat-box > .chat-box-body #chat_messages .message.hide {
	 height: 0;
}
 .chat-box > .chat-box-body #chat_messages .my-message {
	 color: #fff;
	 background-color: #006ae3;
	 align-self: flex-end;
}
 .chat-box > .chat-box-body #chat_messages .other-message {
	 background-color: #e2e2e2;
}
 .chat-box > .chat-box-body #chat_messages .profile {
	 margin: 2px 0;
	 overflow: hidden;
	 transition: height 0.3s ease-in-out;
}
 .chat-box > .chat-box-body #chat_messages .profile.hide {
	 height: 0;
}
 .chat-box > .chat-box-body #chat_messages .profile img {
	 display: inline-block;
	 margin: 0;
	 padding: 0;
	 vertical-align: middle;
	 border-radius: 50%;
}
 .chat-box > .chat-box-body #chat_messages .my-profile {
	 color: #afafaf;
	 align-self: flex-end;
}
 .chat-box > .chat-box-body #chat_messages .other-profile {
	 color: #afafaf;
}
 .chat-box #typing {
	 color: #afafaf;
	 width: 100%;
	 height: 0;
	 padding: 0 15px;
	 overflow: hidden;
	 box-sizing: border-box;
	 opacity: 0;
	 transition: 0.3s height ease-in-out, 0.3s opacity ease-in-out;
}
 .chat-box #typing.active {
	 height: 80px;
	 opacity: 1;
}
 .chat-box #typing span:not(.n) {
	 background-color: #afafaf;
	 width: 10px;
	 height: 10px;
	 margin-top: 20px;
	 display: inline-block;
	 border-radius: 50%;
}
 .chat-box #typing span:not(.n):nth-child(1) {
	 animation: typing 1.2s infinite;
}
 .chat-box #typing span:not(.n):nth-child(2) {
	 animation: typing 1.2s infinite 0.1s;
}
 .chat-box #typing span:not(.n):nth-child(3) {
	 animation: typing 1.2s infinite 0.2s;
}
 .chat-box > .chat-box-footer {
	 width: 100%;
	 padding: 20px 15px;
	 border-top: solid 1px #cfcfcf;
	 box-sizing: border-box;
	 display: flex;
}
 .chat-box > .chat-box-footer > #chat_input {
	 color: #2f2f2f;
	 font-family: Raleway, sans-serif;
	 font-size: 16px;
	 background-color: #d2d2d2;
	 width: 100%;
	 height: 40px;
	 max-height: 120px;
	 border: none;
	 padding: 10px 15px;
	 resize: none;
	 box-sizing: border-box;
	 border-radius: 13px;
	 transition: 0.3s background-color;
}
 .chat-box > .chat-box-footer > #chat_input:focus {
	 background-color: #efefef;
}
 .chat-box > .chat-box-footer > #send {
	 background: none;
	 border: none;
	 margin-left: 10px;
	 padding: 5px;
	 cursor: pointer;
	 border-radius: 50%;
}
 @media (min-width: 480px) {
	 .chat-box {
		 width: 480px;
	}
}
 @keyframes typing {
	 0% {
		 transform: translateY(0px);
	}
	 33.3333% {
		 transform: translateY(-5px);
	}
	 66.6667% {
		 transform: translateY(5px);
	}
	 100% {
		 transform: translateY(0px);
	}
}
 button::-moz-focus-inner {
	 border-style: none;
	 padding: 0;
}
 button {
	 outline: none;
}
</style>