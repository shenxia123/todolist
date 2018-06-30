<template>
	<div class="log">
		<div class="login"> 

			<md-field>
	      	<label>用户名：</label>
	      	<md-input v-model="username"></md-input>
	    </md-field>
	    <md-field>
	      <label>密码：</label>
	      <md-input v-model="password" type="password" @keyup.enter="checkLogin"></md-input>
	    </md-field>
	    <md-button class="md-raised" @click="checkLogin" >登陆</md-button>
		</div>
	</div>
</template>

<script>

export default{
	data() {
		return {
			username: '',
			password: '',
			isLogin: false
		}
	},
	computed: {
		users() {
			return this.$store.getters.users;
		}
	},
	methods: {
		checkLogin() {
	      let user = this.users.find(user => {
	        return (this.username === user.username)&&(this.password === user.password);
	      });
	      if (!user) {
	        this.$store.commit('setLogin', false)
	      }else {
	        this.$store.commit('setLogin', true)
	        this.$router.push('/todo');
	      }
	    }
	},
	created() {
		let user = {
	      username: 'slh',
	      password: '123456'
	    };
	    this.$store.commit('addUser', user);
	}
}

</script>

<style scoped>
.log{
		height:800px;
		width:100%;
		background-color:bisque
}
.login{
		height:200px;
		width:400px;
		position:absolute;
		border:2px solid bisque;
		top:0;left:0;right:0;bottom:0;
		margin-top:250px;
		margin-left:450px;
		background-color: aliceblue;
		opacity:0.6;

}
</style>
