<template>
<div>

<div class="row" v-show="loader == false">
  <!--  -->
        <div class="menu my-2 mx-2" style="cursor:pointer" @click="$router.go(-1)">
          <div class="subir">
            <span>
              <i class="ti-back-left" aria-hidden="true"></i>
            </span>
            <span>
              Volver atras
            </span>
          </div>
        </div>
        <!-- <div class="col-8"></div> -->
        <!-- <div class="menu2 my-2" style="cursor:pointer" @click.stop="mostrar = !mostrar">
          <div class="subir2">
            <span>
              <i class="ti-ruler-pencil p-1" aria-hidden="true"></i>
              <i class="ti-clipboard p-1" aria-hidden="true"></i>
            </span>
            <span>
              Anexar a Proyecto
            </span>
          </div>
        </div> -->
  <!--  -->
<card class="card col-12" title="Mensaje de Difusion Interno">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8">
            <label for="title" class="text-dark">Titulo del Correo electronico</label>
            <input class="form-control" type="text" name="title" id="title" maxlength="150" v-model="email.title" placeholder="Ingrese el titulo del mensaje" required>
          </div>
          <div class="col-md-2"></div>

        </div>

        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8">
            <label class="text-dark" for="body">Cuerpo del Correo electronico</label>
            <textarea class="form-control" name="body" id="body" rows="10" maxlength="1000" placeholder="Ingrese el contenido del mensaje" v-model="email.body"></textarea>
          </div>

          <div class="col-md-2"></div>

        </div>

        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8 mx-3">
              <label class="my-3 text-dark" for="nombre">Usuarios Activos</label>
              <div id="tabla" class="contorno">
                <table>
                  <tr v-for="(usuario, index) in usuarios" :key="index" class="interno">
                    <input type="checkbox" :name="index" :id="index" :value="usuario.id" v-model="usuarios_id"> {{usuario.name}}
                  </tr>
                </table>
              </div>
            </div>
          <div class="col-md-2"></div>
        </div>

      <span class="my-3" id="boton_menu">
        <div class="menu2" v-show="visual == false">
          <div id="boton" class="subir2 text-white" style="cursor:pointer" @click.prevent="visual=!visual">
            <span>
              VALIDAR CODIGO <i class="ti-lock" aria-hidden="true"></i>
            </span>
            <span>
              VALIDAR CODIGO <i class="ti-unlock" aria-hidden="true"></i>
            </span>
          </div>
        </div>
      </span>

        <div class="row" v-show="visual == true">
          <div class="col-md-2"></div>
          <div class="col-md-8">
            <label class="text-dark" for="body">Codigo especial</label>
            <input type="password" id="code" class="form-control" placeholder="Ingrese el codigo especial" minlength="6" maxlength="6" v-model="code" onkeypress='return event.charCode >= 48 && event.charCode <= 57' required/>
          </div>

          <div class="col-md-2"></div>

        </div>

        <div class="my-3" id="boton_menu" v-show="visual == true">
          <div id="boton" class="text-white" style="cursor:pointer" @click.prevent="createDepartament">
            REALIZAR EL ANUNCIO
            <span>
              <i class="ti-announcement" aria-hidden="true"></i>
            </span>
          </div>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</div>
<div class="row" v-show="loader == true">
  <div class="col-4"></div>
  <Loader />
  <div class="col-4"></div>
</div>
</div>
</template>

<script>
import axios from "axios";
import Loader from "@/pages/Loaders/Loader.vue"

export default {
  name: "DepartamentForm",
  components:{
    Loader
  },
  data() {
    return {
      email: {
        title: null,
        body: null,
      },
      mostrar: false,
      token: sessionStorage.getItem('token'),
      departamentos: [],
      proyectos: [],
      documento: null,
      varial: false,
      rol_id: sessionStorage.getItem('ur'),
      baseURL: "https://shielded-hollows-48102.herokuapp.com/api",
      loader: false,
      visual: false,
      usuarios: [],
      usuarios_id: [],
      code: null,
    };
  },
  created(){
    this.usuarios_email();
  },
  mounted(){},
  methods: {

    async usuarios_email() {
      try {
        axios.get(`${this.baseURL}/usuarios/activos`, {
          headers:{
            "Authorization": `Bearer ${this.token}`
          }
        }).then(response =>{
          // console.log(response)
          if (response.status == 200) {
            this.usuarios = response.data.usuario
          }
          console.log(this.usuarios)
        })
      } catch (error) {
        alert('error')
        console.log(error)
      }
    },
    async createDepartament() {
      this.loader = true
      let info = {
        'title': this.email.title,
        'body': this.email.body,
        'code': this.code,
        'usuarios': this.usuarios_id
      }
      if (this.code == null) {
        this.loader = false
      return  this.$swal({
                  position: 'top-end',
                  icon: 'warning',
                  title: '¡Debe ingresar el codigo especial para validar su accion!',
                  showConfirmButton: false,
                  timer: 2500
                })
      }
      if (this.code.length < 6) {
        this.loader = false
      return  this.$swal({
                  position: 'top-end',
                  icon: 'warning',
                  title: '¡Los codigos especiales manejados en el sistema poseen 6 digitos, el codigo ingresado no cumple con ese formato!',
                  showConfirmButton: false,
                  timer: 6000
                })
      }
      console.log(info)
      try {
        this.loader = true
        let response = await axios.post(`${this.baseURL}/emails/anuncio`, info, {
          headers:{
              'Authorization': `Bearer ${this.token}`,
            }
        })
        console.log(response.data)
        console.log(response.status)
        if (response.status == 200) {
          this.loader = false
          this.$swal({
                  position: 'top-end',
                  icon: 'success',
                  title: '¡Anuncio enviado con exito!',
                  showConfirmButton: false,
                  timer: 2500
                })
          this.$router.back();
        }
      } catch (error) {
        if (error.response.data.message == "compact(): Undefined variable: El codigo es incorrecto") {
            this.loader = false
            this.$swal({
                  position: 'top-end',
                  icon: 'error',
                  title: '¡El codigo especial ingresado es incorrecto!',
                  showConfirmButton: false,
                  timer: 2500
                })
            // this.$router.back();
            this.code = null
          }
      }
    },
  }
}
</script>

<style scoped>
#boton{
  background-color: #93291E;
  border-radius: 25px;
  padding: 13px;
}
#boton_menu{
  display: flex;
  justify-content: center;
}
.menu {
  display: flex;
  justify-content: center;
  list-style:none;
  width: 120px;
  background-color: #93291E;
  border-radius: 25px;
}
.subir span:first-child{
  display: inline-block;
  padding: 10px;
  margin-left: 20px;
}
.subir{
   display: block;
    position: relative;
    overflow: hidden;
    padding: 0px 10px;
    color: white;
    width: 100px;
}
.subir span:last-child{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-100%);
}
.subir span{
  transition: transform 0.2s ease-out;
}
.subir:hover span:first-child{
  transform: translateY(100%);
}
.subir:hover span:last-child{
  transform: translateY(2%);
}
/*  */
.menu2 {
  display: flex;
  justify-content: center;
  list-style:none;
  width: 200px;
  background-color: #93291E;
  border-radius: 25px;
}
.subir2 span:first-child{
  display: inline-block;
  /* padding: 10px; */
  margin-left: 10px;
}
.subir2{
   display: block;
    position: relative;
    overflow: hidden;
    padding: 0px 10px;
    color: white;
    width: 190px;
}
.subir2 span:last-child{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-150%);
}
.subir2 span{
  transition: transform 0.2s ease-out;
}
.subir2:hover span:first-child{
  transform: translateY(150%);
}
.subir2:hover span:last-child{
  transform: translateY(2%);
}
.contorno{
  outline: thick double #ce3232;
  border-radius: 15px;
  padding: 10px;
}
.interno{
  padding: 15px;
}
#tabla{
  overflow:scroll;
  height: 200px;
}
</style>
