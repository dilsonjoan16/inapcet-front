<template>
<div class="contenedor">
	<form class="form-signin my-auto mx-auto" @submit.stop.prevent="submit">
    <div class="container p-4">
      <h1 class="h3 mb-3 font-weight-normal text-center"></h1>

      <label for="inputText" class="sr-only">Correo electronico</label>
      <input v-model="recovery.email" type="email" id="inputUser" class="form-control text-white" placeholder="Ingrese el email" maxlength="100" autocomplete="off" required autofocus>

      <label for="exampleFormControlCode">Clave</label>
      <input type="password" id="inputUser" class="form-control text-white" placeholder="Ingrese su clave" minlength="8" maxlength="12" v-model="recovery.password" required autocomplete="off"/>

      <button class="btn btn-lg btn-outline-light btn-block" type="submit" v-if="loader2">Recuperar Codigo</button>
    <div class="spinner my-auto mx-auto" v-if="loader"></div>
    </div>
  </form>
</div>
</template>

<script>
import axios from "axios"

	export default{
		name: 'Code',
		data() {
			return {
				recovery: {
					email: null,
					password: null,
				},
        loader:null,
        loader2:true,
        baseURL: "http://127.0.0.1:8000/api",
			}
		},
		methods: {
			async submit() {
      // const regla2 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,12}$/;
        this.loader = true
        this.loader2 = false
          let info = {
            'email': this.recovery.email,
            'password': this.recovery.password
          }
          axios.post(`${this.baseURL}/recovery/code/user`, info)
          .then(response => {
            if (response.status == 200) {
              this.$swal({
                icon: 'success',
                title: '¡Envio de contraseña exitoso!',
                text: 'Revise en su bandeja de entrada el nuevo recurso otorgado e ingrese con el',
            })
              this.$router.push('/login');
            }
          })
          .catch(error => {
            if (error.response.data == "No se encontro algun usuario con el correo ingresado") {
            this.$swal({title: '¡El correo no pertenece a nuestra base de datos!',text: '¡No se encontro algun usuario con el correo ingresado, valide nuevamente!',icon: 'error'})
            this.recovery.email = ''
            }
            if (error.response.data == "El password es incorrecto") {
            this.$swal({title: '¡El password ingresado es incorrecto!',text: '¡Valide nuevamente el password e intentelo una vez mas!',icon: 'error'})
            this.recovery.code = ''
            }
            console.log(error.response.data)
            this.loader = false
            this.loader2 = true
            // console.log(error);
          })
			},
		},
	};
</script>

<style>
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
.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
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
 /* background: #ff00cc; */  /* fallback for old browsers */
/*background: -webkit-linear-gradient(to right, #333399, #ff00cc); */  /* Chrome 10-25, Safari 5.1-6 */
/*background: linear-gradient(to right, #333399, #ff00cc);*/ /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
height: 100vh;
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
#inputUser{
background: none;
}
#inputUser::placeholder{
  color:white;
}
#link{
  text-decoration: none;
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
