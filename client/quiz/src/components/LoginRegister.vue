<template lang="html">
  <div class="login-register">
    <div class="valign-wrapper" style="min-height: 100vh">
      <div class="container">
        <div class="row">
          <div class="col s12 m4">
            <div class="card">
              <div class="card-content">
                <p class="center-align">Quiz</p>
              </div>
              <div class="card-tabs">
                <ul class="tabs tabs-fixed-width">
                  <li class="tab"><a class="active" href="#login">Login</a></li>
                  <li class="tab"><a href="#register">Register</a></li>
                </ul>
              </div>
              <div class="card-content grey lighten-4">
                <div id="login">
                  <form>
                    <div class="row">
                      <div class="input-field col s10 offset-s1">
                        <input id="email" ref="lemail" type="email" class="validate" required>
                        <label class="loose-text" for="email">Email</label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="input-field col s10 offset-s1">
                        <input id="password" ref="lpassword" type="password" class="validate" required>
                        <label class="loose-text" for="password">Password</label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col s12 center-align">
                        <button class="waves-effect waves-light btn" v-on:click="login">Log In</button>
                      </div>
                    </div>
                  </form>
                  <div class="alert" v-if="loginErr">
                    <p>username or password is wrong</p>
                  </div>
                </div>
                <div id="register">
                  <form>
                    <div class="row">
                      <div class="input-field col s10 offset-s1">
                        <input id="email" ref="email" type="email" class="validate" required>
                        <label class="loose-text" for="email">Email</label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="input-field col s10 offset-s1">
                        <input id="name" ref="name" type="text" class="validate" required>
                        <label class="loose-text" for="name">Name</label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="input-field col s10 offset-s1">
                        <input id="password" ref="password" type="password" class="validate" required>
                        <label class="loose-text" for="password">Password</label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="input-field col s10 offset-s1">
                        <input id="phone" ref="phone" type="number" class="validate" required>
                        <label class="loose-text" for="phone">Phone</label>
                      </div>
                    </div>
                  </form>
                  <div class="row">
                    <div class="col s12 center-align">
                      <button class="waves-effect waves-light btn" v-on:click="register">Sign Up</button>
                    </div>
                  </div>
                  <div class="alert" v-if="loginErr">
                    <p v-if="errMessage !== null">{{errMessage}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col s12 m8">
            <h1>Hacktiv <br>Quiz</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login-register',
    methods: {
      login: function(){
        let email = this.$refs.lemail.value
        let password = this.$refs.lpassword.value
        this.loginErr = true

        axios.post("http://localhost:3000/login/",
         {email: email, password: password})
        .then((response) => {
          if(response.data.token){
            console.log(response.data)
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role',response.data.role);
            localStorage.setItem('_id',response.data._id);
            console.log(response.data._id)
            window.location.hash = 'dashboard';

          } else {
            this.loginErr = true
          }
        })
        .catch(err => console.log(err))
      },
      register: function(){
        let email = this.$refs.email.value
        let password = this.$refs.password.value
        let name = this.$refs.name.value
        let phone = '+'+this.$refs.phone.value

        axios.post("http://localhost:3000/register/", {email: email, password: password, name: name, phone: phone})
        .then((response) => {
          console.log(response.data);

          if (response.data.hasOwnProperty('err')) {
            this.loginErr = true
            this.errMessage = "something wrong"
            console.log(err)
          } else {
            this.registerFlag = true,
            location.reload();
          }

        })
        .catch(err => {
          this.loginErr = true
          this.errMessage = "something wrong"
          console.log(err)
        })
      }
    },
    data () {
      return {
        loginState: false,
        loginErr: false,
        errMessage: null,
        registerFlag: false
      }
    }
  }
</script>


<style lang="css" scoped>
  .login-register {
    background-image: url('../assets/background33.jpg');
    background-size: cover;
    background-position: bottom center;
  }
  h1 {
    font-weight: 800;
    text-align: left;
    color: teal;
  }
  .alert {
    padding: 10px;
    background-color: #ff8287;
    border-radius: 5px;
    color: #fff;
  }
</style>