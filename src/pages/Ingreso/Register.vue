<template>
<div class="contenedor">
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <img src="@/assets/img/LogoInapcet.png" alt="logo inapcet" id="imago" class="img-fluid">
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
	<form class="form-signin my-auto mx-auto" @submit.stop.prevent="submit">
    <div class="container">
    <card class="card2" title="Registro de usuario">
      <h1 class="h3 mb-3 font-weight-normal text-center"></h1>

      <label for="inputText" class="sr-only">Nombre</label>
      <input v-model="register.name" type="text" id="inputUser" class="form-control text-dark" placeholder="Nombre" maxlength="100" autocomplete="off" required autofocus>

                <select class="form-control" id="inputUser" required v-model="register.departament_id">
                  <option disabled selected>Elija un Departamento</option>
                  <option v-for="(departamento, index) in departamentos" :key="index" :value="departamento.id">
                    {{departamento.name}}
                  </option>
                </select>

      <label for="inputEmail" class="sr-only">Correo electronico</label>
      <input v-model="register.email" type="email" id="inputEmail" class="form-control text-dark" placeholder="Email" maxlength="100" autocomplete="off" required>

      <label for="inputPassword" class="sr-only">Clave</label>
      <input v-model="register.password" type="password" id="inputUser" class="form-control text-dark" placeholder="Password" minlength="6" maxlength="12" autocomplete="off" required>

      <label for="inputPassword" class="sr-only">Codigo especial</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Ingrese el codigo especial" minlength="6" maxlength="6" v-model="register.code" required onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>

      <button class="btn btn-lg btn-outline-dark btn-block" type="submit" v-if="loader2">Registrarme</button>
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
		name: 'Register',
		data() {
			return {
				register: {
					name: '',
					email: '',
					password: '',
          code: '',
          departament_id: ''
				},
        loader:null,
        loader2:true,
        departamentos: [],
        baseURL: "http://127.0.0.1:8000/api"
			}
		},
    created(){
      try {
        axios.get(`${this.baseURL}/departamentos/activos/register`)
        .then(response =>{
          // console.log(response)
          if (response.status == 200) {
            this.departamentos = response.data.departamento
          }
          console.log(this.departamentos)
        })
      } catch (error) {
        alert('error')
        console.log(error)
      }
    },
		methods: {
			async submit() {
      const regla2 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/;
        this.loader = true
        this.loader2 = false
        if (regla2.test(this.register.password)) {
          axios.post(`${this.baseURL}/usuarios/register`, this.register)
          .then(response => {
            this.$swal({
              icon: 'success',
              title: 'Registro exitoso!',
              text: 'Usuario registrado con exito, solo falta la habilitacion por parte de su gerente!',
          })
            this.$router.push('/login');
          })
          .catch(error => {
            this.register.name = ''
            this.register.email = ''
            this.register.password = ''
            this.loader = false
            this.loader2 = true
            // console.log(error);
            this.$swal({title: 'Ocurrio un error!',text: 'Valide la informacion suministrada nuevamente!',icon: 'info'})
          })
        } else {
          // this.register.name = ''
          // this.register.email = ''
          this.register.password = ''
          this.loader = false
          this.loader2 = true
          this.$swal({
          icon: 'error',
          title: 'Oops... Valida el password!',
          text: 'El formato correcto del password debe ser minimo 6 y maximo 12 caracteres, debe poseer 1 Mayuscula, 1 minuscula, 1 numero y 1 caracter especial como minimo respectivamente!',
          })
        }
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
background: #FFFFFF !important;
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
