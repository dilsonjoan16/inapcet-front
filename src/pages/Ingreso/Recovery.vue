<template>
<div class="contenedor">
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <img src="@/assets/img/LogoInapcet.png" alt="logo inapcet" id="imago" class="img-fluid">
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
	<form class="form-signin my-auto mx-auto" @submit.stop.prevent="submit">
    <div class="container">
<card class="card2" title="Recuperacion de clave">
      <h1 class="h3 mb-3 font-weight-normal text-center"></h1>

      <label for="inputText" class="sr-only">Correo electronico</label>
      <input v-model="recovery.email" type="email" id="inputUser" class="form-control text-dark" placeholder="Ingrese el email" maxlength="100" autocomplete="off" required autofocus>

      <label for="exampleFormControlCode" class="sr-only">Codigo especial</label>
      <input type="password" id="inputUser" class="form-control text-dark" placeholder="Ingrese el codigo especial" minlength="6" maxlength="6" v-model="recovery.code" autocomplete="off" required onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>

      <button class="btn btn-lg btn-outline-dark btn-block" type="submit" v-if="loader2">Recuperar Password</button>
    <div class="spinner my-auto mx-auto" v-if="loader"></div>
</card>
    <h4 class="text-dark back" style="cursor:pointer" id="link" @click="$router.go(-1)">
        Volver atras
          <i class="ti-back-left" aria-hidden="true"></i>
    </h4>
    </div>
  </form>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios"

	export default{
		name: 'Recovery',
		data() {
			return {
				recovery: {
					email: null,
					code: null,
				},
        loader:null,
        loader2:true,
        baseURL: "https://shielded-hollows-48102.herokuapp.com/api",
			}
		},
		methods: {
			async submit() {
      // const regla2 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,12}$/;
        this.loader = true
        this.loader2 = false
          let info = {
            'email': this.recovery.email,
            'code': this.recovery.code
          }
          axios.post(`${this.baseURL}/recovery/password/user`, info)
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
            if (error.response.data == "El codigo es incorrecto") {
            this.$swal({title: '¡El codigo ingresado es incorrecto!',text: '¡Valide nuevamente el codigo especial e intentelo una vez mas!',icon: 'error'})
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

<style scoped>
#imago{
  margin: 20% 0px;
  margin-left: 10%;
}
.back{
  margin-top: 10px !important;
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
background: #ffffff !important;
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
  color:black;
}
#inputPassword{
background: none;
}
#inputPassword::placeholder{
  color:black;
}
#inputUser{
background: none;
}
#inputUser::placeholder{
  color:black;
}
#link{
  text-decoration: none;
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
.card{
  width: 50vh;
}
</style>
