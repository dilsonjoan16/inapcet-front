<template>
<div class="contenedor">
 	<form class="form-signin my-auto mx-auto" @submit.stop.prevent="submit">
    <div class="container p-4">
      <h1 class="h3 mb-3 font-weight-normal text-center"></h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="login.email" type="email" id="inputEmail" class="form-control text-white" placeholder="Ingrese el email" maxlength="100" required autocomplete="off" autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="login.password" type="password" id="inputPassword" class="form-control text-white" placeholder="Ingrese el password" minlength="6" maxlength="12" autocomplete="off" required>

      <p v-if="error" class="error text-white">Has introducido mal el email o la contraseña.</p>

      <button class="btn btn-lg btn-outline-light btn-block" type="submit" v-if="loader2">Ingresar</button>
      <br>
      <hr class="division">
    <div class="spinner my-auto mx-auto" v-if="loader"></div>
      <router-link to="/register" v-if="loader2" class="text-white" id="link">
        Registrarme
      </router-link>
      <br>
      <router-link to="/recovery" v-if="loader2" class="text-white" id="link">
        Olvido de password
      </router-link>
     </div>
    </form>
</div>
</template>

<script>

import NotificationTemplate from '../Notifications/NotificationTemplate';
import axios from "axios";

	export default {
		name: 'Login',
		data() {
			return {
				login: {
					email: '',
					password: '',
				},
				error: false,
        loader:null,
        loader2:true,
        baseURL: "http://127.0.0.1:8000/api",
        type: ["", "info", "success", "warning", "danger"],
			}
		},
		// created() {
		// 	sessionStorage.removeItem('user_token');
		// },
		methods: {
			async submit() {
        this.loader = true
        this.loader2 = false
          await axios.post('http://127.0.0.1:8000/api/usuarios/login', this.login)
          .then(response => {
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('ui', response.data.usuario.id);
            sessionStorage.setItem('ur', response.data.usuario.rol_id);
            if (response.data.usuario.rol_id == 1) {
              if (response.data.usuario.state == 1) {
              this.$router.push('/dashboard');
              <div class="alert alert-success">
                    <button type="button" aria-hidden="true" class="close">×</button>
                    <span>
                      <b>Correcto!</b> Bienvenido al Sistema!</span>
                  </div>
              } else {
                 <div class="alert alert-warning">
                    <button type="button" aria-hidden="true" class="close">×</button>
                    <span>
                      <b>Estado Inactivo!</b> Estimado usuario, posee un estado Inactivo. Para modificar el mismo debe comunicarse con un agente del Area de Tecnologia y Sistemas</span>
                  </div>
                //  this.$swal({
                // icon: 'info',
                // title: 'Oops...',
                // text: 'Tu usuario posee un estado de INACTIVO! Si deseas ingresar comunicate con algun administrador para reactivar tu usuario',
                // })
                this.loader = false
                this.loader2 = true
              }
            } else {
              if (response.data.usuario.rol_id == 2) {
                if (response.data.usuario.state == 1) {
              this.$router.push('/stats')
                } else {
                  <div class="alert alert-warning">
                    <button type="button" aria-hidden="true" class="close">×</button>
                    <span>
                      <b>Estado Inactivo!</b> Estimado usuario, posee un estado Inactivo. Para modificar el mismo debe comunicarse con un agente del Area de Tecnologia y Sistemas</span>
                  </div>
                //   this.$swal({
                // icon: 'info',
                // title: 'Oops...',
                // text: 'Tu usuario posee un estado de INACTIVO! Si deseas ingresar comunicate con algun administrador para reactivar tu usuario',
                // })
                this.loader = false
                this.loader2 = true
                }
              } else {
                if (response.data.usuario.rol_id !== 1 && response.data.usuario.rol_id !== 2) {
                <div class="alert alert-danger">
                    <button type="button" aria-hidden="true" class="close">×</button>
                    <span>
                      <b>Intruso!</b> Su usuario no posee un rol permitido por el sistema!</span>
                  </div>
                //   this.$swal({
                // icon: 'error',
                // title: 'Oops...',
                // text: 'Tu usuario posee un Rol fuera de los permitidos! No aceptamos intrusos como tu. En caso de ser error, pide a algun administrador que resuelva tu caso de Rol',
                // })
                this.loader = false
                this.loader2 = true
                } else {
                }
              }
            }
          })
          .catch(error => {
            this.loader = false
            this.loader2 = true
            this.error = true;
          })
          // this.register.password = ''
          // this.loader = false
          // this.loader2 = true
          // this.$swal({
          // icon: 'error',
          // title: 'Oops... Valida el password!',
          // text: 'El formato correcto del password debe ser minimo 6 y maximo 12 caracteres, debe poseer 1 Mayuscula, 1 minuscula, 1 numero y 1 caracter especial como minimo respectivamente!',
          // })
			},

      notifyVue() {
      const color = Math.floor(Math.random() * 4 + 1);
      this.$notify({
        component: NotificationTemplate,
        icon: "ti-gift",
        horizontalAlign: "right",
        verticalAlign: "top",
        type: this.type[color]
      });
    }
		},
	};
</script>

<style scoped>

	.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.contenedor{
background: #212120 !important;
/* background: -webkit-linear-gradient(to right, #ffffff, #F4F3EF) !important; */
/* background: linear-gradient(to right, #ffffff, #F4F3EF) !important; */
height: 110%;
width: 100%;
}
.container{
  margin-top: 50%;
  margin-bottom: 50%;
  /* border-width: 15px;
  border-radius: 30px; */
}
#inputEmail{
background: none;
}
#inputEmail::placeholder{
  color:white;
}
#inputPassword{
background: none;
}
#inputPassword::placeholder{
  color:white;
}
#link{
  text-decoration: none;
}
.division {
    background-color: white !important;
  }
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #ffffff;
  animation: spin 1s ease infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
