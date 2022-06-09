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
        <div class="col-8"></div>
        <div class="menu2 my-2" style="cursor:pointer" @click.stop="mostrar = !mostrar">
          <div class="subir2">
            <span>
              <i class="ti-plus p-1" aria-hidden="true"></i>
              <i class="ti-user p-1" aria-hidden="true"></i>
              <i class="ti-ruler-pencil p-1" aria-hidden="true"></i>
            </span>
            <span>
              Anexar Usuarios
            </span>
          </div>
        </div>
  <!--  -->
<card class="card col-12" title="Creacion de Proyecto">
    <div>
      <form @submit.prevent>
          <div class="row">

          <div class="col-md-5">
            <label class="text-dark" for="nombre">Nombre del Proyecto</label>
            <input class="form-control" type="text" name="nombre" id="nombre" placeholder="Ingrese el nombre" maxlength="255" required v-model="proyecto.name">
          </div>

          <div class="col-md-7">
            <label class="text-dark" for="descripcion">Descripcion del Proyecto</label>
            <textarea class="form-control" name="descripcion" id="descripcion" rows="3" maxlength="255" placeholder="Ingrese la descripcion del proyecto" required v-model="proyecto.description"></textarea>
          </div>
          </div>
          <div class="row">


          </div>
          <div class="row">

          <div class="col-md-4">
            <label class="text-dark" for="duracion">Duracion aproximada en semanas del Proyecto</label>
            <input type="text" class="form-control" name="duracion" id="duracion" minlength="1" maxlength="3" min="1" max="520" placeholder="Ingrese las semanas estimadas" onkeypress='return event.charCode >= 48 && event.charCode <= 57' v-model="proyecto.duration">
          </div>
          <div class="col-md-4">
            <label class="text-dark" for="estimacion">Estimacion Presupuestaria del Proyecto</label>
            <input type="text" class="form-control" name="estimacion" id="estimacion" minlength="1" maxlength="12" min="1" placeholder="Ingrese el presupuesto estimado" onkeypress='return event.charCode >= 48 && event.charCode <= 57' v-model="proyecto.estimated">
          </div>

          <div class="col-md-4">
            <label class="text-dark" for="etapa">Etapa del Proyecto</label>
            <select class="form-control" name="etapa" id="etapa" required v-model="proyecto.stage">
              <option disabled selected>Elija la etapa actual del proyecto</option>
              <option value="En Conversacion">En Conversacion</option>
              <option value="Aprobado sin planificar">Aprobado sin planificar</option>
              <option value="En Planificacion">En Planificacion</option>
              <option value="Planificado sin entregar">Planificado sin entregar</option>
              <option value="Entregado y culminado">Entregado y culminado</option>
            </select>
          </div>
    </div>
        <div class="row" v-show="mostrar == true">
          <div class="col-md-4 mx-3">
              <label class="my-3 text-dark" for="nombre">Posibles candidatos para el proyecto</label>
              <div id="tabla" class="contorno">
                <table>
                  <tr v-for="(usuario, index) in usuarios" :key="index" class="interno">
                    <input type="checkbox" :name="index" :id="index" :value="usuario.id" v-model="usuarios_id"> {{usuario.name}}
                  </tr>
                </table>
              </div>
            </div>
        </div>

        <div v-show="finalizar == false" id="boton_menu" class="my-4">
          <div id="boton" class="text-white" style="cursor:pointer" @click.stop="finalizar = !finalizar">
            VALIDAR CODIGO DE AUTORIZACION
          </div>
        </div>
        <div v-show="finalizar == true" class="row my-2">

          <div class="col-md-3"></div>

          <div class="col-md-6">
            <label class="text-dark" for="nombre">Codigo Especial</label>
            <input type="password" id="code" class="form-control" placeholder="Ingrese el codigo especial" minlength="6" maxlength="6" v-model="code" onkeypress='return event.charCode >= 48 && event.charCode <= 57' required/>
          </div>

          <div class="col-md-3"></div>

        </div>

        <div v-show="finalizar == true" id="boton_menu" class="my-4">
          <div id="boton" class="text-white" style="cursor:pointer" @click.prevent="createProyect">
            CREAR PROYECTO
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
  name: "UploadForm",
  components:{
    Loader
  },
  data() {
    return {
      proyecto: {
        name: null,
        description: null,
        duration: null,
        estimated: null,
        stage: null,
        state: 1,
      },
      mostrar: false,
      token: sessionStorage.getItem('token'),
      usuarios: [],
      usuarios_id: [],
      code: null,
      varial: false,
      rol_id: sessionStorage.getItem('ur'),
      baseURL: "http://127.0.0.1:8000/api",
      finalizar: false,
      loader: false
    };
  },
  created(){

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
  mounted(){},
  methods: {
    guardedFile(event) {
      const file = event.target.files[0];
      this.documento = file;
      this.varial = true;
      console.log(this.documento);

    },
    async createProyect() {
      this.loader = true
      let info = {
        'name': this.proyecto.name,
        'description': this.proyecto.description,
        'duration': Number(this.proyecto.duration),
        'estimated': Number(this.proyecto.estimated),
        'stage': this.proyecto.stage,
        'state': 1,
        'participantes': this.usuarios_id,
        'code': Number(this.code)
      }
      if (info.name == null || info.description == null || info.stage == null) {
      this.loader = false
      return  this.$swal({
                  position: 'top-end',
                  icon: 'warning',
                  title: '¡Los campos "Nombre", "Descripcion" y "Etapa" del proyecto no pueden estar vacios!',
                  showConfirmButton: false,
                  timer: 3000
                })
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
        let response = await axios.post(`${this.baseURL}/proyectos/crear`, info, {
          headers:{
              'Authorization': `Bearer ${this.token}`,
            }
        })
        console.log(response.data)
        console.log(response.status)
        if (response.status == 201) {
          this.loader = false
          this.$swal({
                  position: 'top-end',
                  icon: 'success',
                  title: '¡Proyecto creado con exito!',
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
  width: 180px;
  background-color: #93291E;
  border-radius: 25px;
}
.subir2 span:first-child{
  display: inline-block;
  padding: 10px;
  margin-left: 20px;
}
.subir2{
   display: block;
    position: relative;
    overflow: hidden;
    padding: 0px 10px;
    color: white;
    width: 150px;
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
  transform: translateY(-100%);
}
.subir2 span{
  transition: transform 0.2s ease-out;
}
.subir2:hover span:first-child{
  transform: translateY(100%);
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
