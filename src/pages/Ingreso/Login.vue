<template>
<div class="contenedor">
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <img src="@/assets/img/LogoInapcet.png" alt="logo inapcet" id="imago" class="img-fluid">
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
 	<form class="form-signin my-auto mx-auto" @submit.stop.prevent="submit">
    <div class="container">
    <card class="card2" title="Inicio de sesion">
      <h1 class="h3 mb-3 font-weight-normal text-center"></h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="login.email" type="email" id="inputEmail" class="form-control text-dark" placeholder="Ingrese el email" maxlength="100" required autocomplete="off" autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="login.password" type="password" id="inputPassword" class="form-control text-dark" placeholder="Ingrese el password" minlength="6" maxlength="12" autocomplete="off" required>

      <p v-if="error" class="error text-dark">Has introducido mal el email o la contraseña.</p>

      <button class="btn btn-lg btn-outline-dark btn-block" type="submit" v-if="loader2">Ingresar</button>
      <br>
      <hr class="division">
    <div class="spinner my-auto mx-auto" v-if="loader"></div>
      <router-link to="/register" v-if="loader2" class="text-dark" id="link">
        Registrarme
      </router-link>
      <br>
      <router-link to="/recovery" v-if="loader2" class="text-dark" id="link">
        Olvido de password
      </router-link>
      <br>
      <router-link to="/code" v-if="loader2" class="text-dark" id="link">
        Olvido de codigo especial
      </router-link>
    </card>
     </div>
    </form>
    </div>
  </div>
</div>
</template>

<script>

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
        baseURL: "https://shielded-hollows-48102.herokuapp.com/api",
			}
		},
		// created() {
		// 	sessionStorage.removeItem('user_token');
		// },
		methods: {
			async submit() {
        this.loader = true
        this.loader2 = false
          await axios.post(`${this.baseURL}/usuarios/login`, this.login)
          .then(response => {
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('ui', response.data.usuario.id);
            sessionStorage.setItem('ur', response.data.usuario.rol_id);
            sessionStorage.setItem('depid', response.data.usuario.departament_id);
            if (response.data.usuario.rol_id == 1) {
              if (response.data.usuario.state == 1) {
              this.$router.push('/dashboard');

              const Toast = this.$swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', this.$swal.stopTimer)
                toast.addEventListener('mouseleave', this.$swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'success',
              title: '¡Bienvenid@ '+response.data.usuario.name+'!'
            })

              } else {

              const Toast = this.$swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 8000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', this.$swal.stopTimer)
                toast.addEventListener('mouseleave', this.$swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'warning',
              title: '¡Usuario Inactivo!',
              text: 'Estimado usuario, se le recomienda comunciarse con algun administrador para ejecutar la activacion de su cuenta'
            })
                //  this.$swal({
                // icon: 'info',
                // title: 'Oops...',
                // text: 'Tu usuario posee un estado de INACTIVO! Si deseas ingresar comunicate con algun administrador para reactivar tu usuario',
                // })
                this.loader = false
                this.loader2 = true
              }
            } else {
              if (response.data.usuario.rol_id == 2 || response.data.usuario.rol_id == 3) {
                if (response.data.usuario.state == 1) {
              this.$router.push('/dashboard')

              const Toast = this.$swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', this.$swal.stopTimer)
                toast.addEventListener('mouseleave', this.$swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'success',
              title: '¡Que bien tenerte de vuelta '+response.data.usuario.name+'!'
            })

                } else {
                  const Toast = this.$swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 8000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', this.$swal.stopTimer)
                toast.addEventListener('mouseleave', this.$swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'warning',
              title: '¡Usuario Inactivo!',
              text: 'Estimado usuario, se le recomienda comunciarse con algun administrador para ejecutar la activacion de su cuenta'
            })
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
                  const Toast = this.$swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 8000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                  }
                })

                Toast.fire({
                  icon: 'error',
                  title: '¡Intruso!',
                  text: 'No podemos identificar su rol en nuestra base de datos'
                })
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
            const Toast = this.$swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 8000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', this.$swal.stopTimer)
                toast.addEventListener('mouseleave', this.$swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'error',
              title: '¡Datos incorrectos!',
              text: 'Estimado usuario, algun dato ingresado es erroneo, intentelo nuevamente. En caso de olvidar su password dirijase a "olvido de password"'
            })
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

		},
	};
</script>

<style scoped>
#imago{
  margin: 20% 0px;
  margin-left: 10%;
}
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
/* background: #FFD57E !important; */
background: #FFFFFF !important;
/* background: -webkit-linear-gradient(to right, #ffffff, #F4F3EF) !important; */
/* background: linear-gradient(to right, #ffffff, #F4F3EF) !important; */
height: 100% !important;
width: 100% !important;
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
  color:black;
}
#inputPassword{
background: none;
}
#inputPassword::placeholder{
  color:black;
}
#link{
  text-decoration: none;
}
.division {
    background-color: black !important;
  }
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #000000;
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
