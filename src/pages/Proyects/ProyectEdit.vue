<template>
<div class="row">
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
        <div v-show="aspirantes == true" class="col-8"></div>
        <div v-show="aspirantes == true" class="menu2 my-2" style="cursor:pointer" @click.stop="anexar()">
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
        <div v-show="aspirantes == false" class="col-6"></div>
        <div v-show="mostrar2 == false">
          <div v-show="aspirantes == false" class="menu2 my-2 mx-2" style="cursor:pointer" @click.stop="anexar()">
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
        </div>
        <div v-show="mostrar == false">
          <div v-show="aspirantes == false" class="menu2 my-2 mx-2" style="cursor:pointer" @click.stop="eliminar()">
            <div class="subir2">
              <span>
                <i class="ti-minus p-1" aria-hidden="true"></i>
                <i class="ti-user p-1" aria-hidden="true"></i>
                <i class="ti-ruler-pencil p-1" aria-hidden="true"></i>
              </span>
              <span>
                Eliminar Usuarios
              </span>
            </div>
          </div>
        </div>
  <!-- -->
<card class="card col-12" title="Creacion de Proyecto">
    <div>
      <form @submit.prevent>
          <div class="row">
            <div class="col-md-2"></div>
          <div class="col-md-8">
            <label for="nombre">Nombre Actual del Proyecto</label>
            <i class="ti-tag p-1" aria-hidden="true">{{proyectos.name}}</i>
            <input class="form-control" type="text" name="nombre" id="nombre" placeholder="Ingrese el nombre" maxlength="255" required v-model="proyecto.name">
          </div>
            <div class="col-md-1"></div>
          </div>
          <div class="row">
            <div class="col-md-2"></div>
          <div class="col-md-8">
            <label for="descripcion">Descripcion Actual del Proyecto</label>
            <i class="ti-tag p-1" aria-hidden="true">{{proyectos.description}}</i>
            <textarea class="form-control" name="descripcion" id="descripcion" rows="3" maxlength="255" placeholder="Ingrese la descripcion del proyecto" required v-model="proyecto.description"></textarea>
          </div>
            <div class="col-md-1"></div>
          </div>
          <div class="row">
            <div class="col-md-2"></div>

            <div class="col-md-4">
              <label for="duracion">Duracion estimada</label>
              <i class="ti-tag p-1" aria-hidden="true">{{proyectos.duration == null || proyectos.duration == 0 ? "Sin estimar aun" : proyectos.duration+" Semanas"}}</i>
              <input type="text" class="form-control" name="duracion" id="duracion" minlength="1" maxlength="3" min="1" max="520" placeholder="Ingrese las semanas estimadas" onkeypress='return event.charCode >= 48 && event.charCode <= 57' v-model="proyecto.duration">
            </div>

            <div class="col-md-4">
              <label for="estimacion">Presupuesto estimado</label>
              <i class="ti-tag p-1" aria-hidden="true">{{proyectos.estimated == null || proyectos.estimated == 0 ? "Sin estimar aun" : proyectos.estimated+" Bs."}}</i>
              <input type="text" class="form-control" name="estimacion" id="estimacion" minlength="1" maxlength="12" min="1" placeholder="Ingrese el presupuesto estimado" onkeypress='return event.charCode >= 48 && event.charCode <= 57' v-model="proyecto.estimated">
            </div>
            <div class="col-md-1"></div>

          </div>

          <div class="row">
          </div>

      <div class="row">
            <div class="col-md-2"></div>

          <div class="col-md-8">
            <label for="etapa">Etapa Actual del Proyecto</label>
            <i class="ti-tag p-1" aria-hidden="true">{{proyectos.stage}}</i>
            <select class="form-control" name="etapa" id="etapa" required v-model="proyecto.stage">
              <option disabled selected>Elija la etapa actual del proyecto</option>
              <option value="En Conversacion">En Conversacion</option>
              <option value="Aprobado sin planificar">Aprobado sin planificar</option>
              <option value="En Planificacion">En Planificacion</option>
              <option value="Planificado sin entregar">Planificado sin entregar</option>
              <option value="Entregado y culminado">Entregado y culminado</option>
            </select>
          </div>
            <div class="col-md-1"></div>

    </div>
    <div class="row" v-show="aspirantes == false">
            <div class="col-md-2"></div>

          <div class="col-md-8">
              <label class="my-3 text-dark" for="nombre">Personal ligado al proyecto</label>
              <div id="tabla" class="contorno">
                <table>
                  <tr v-for="(usuario, index) in proyectos.tiene_usuarios" :key="index" class="interno">
                    <span>
                      {{usuario.name}}
                    </span>
                  </tr>
                </table>
              </div>
            </div>

            <div class="col-md-1"></div>
        </div>
        <hr>
        <div class="row" v-show="mostrar == true">
            <div class="col-md-2"></div>

          <div class="col-md-8">
              <label class="my-3 text-dark" for="nombre">Posibles candidatos para el proyecto</label>
            <i class="ti-info-alt p-1 mx-1" aria-hidden="true"> Evite repetir usuarios que ya existen en el proyecto</i>
              <div id="tabla" class="contorno">
                <table>
                  <tr v-for="(usuario, index) in usuarios" :key="index" class="interno">
                    <input type="checkbox" :name="index" :id="index" :value="usuario.id" v-model="usuarios_id"> {{usuario.name}}
                  </tr>
                </table>
              </div>
            </div>

            <div class="col-md-1"></div>
        </div>
        <hr v-show="mostrar2 == true">
        <div class="row" v-show="mostrar2 == true">
            <div class="col-md-2"></div>

          <div class="col-md-8">
              <label class="my-3 text-dark" for="nombre">Personal ligado al proyecto</label>
              <div id="tabla" class="contorno">
                <table>
                  <tr v-for="(usuario, index) in proyectos.tiene_usuarios" :key="index" class="interno">
                    <input type="checkbox" :name="index" :id="index" :value="usuario.id" v-model="usuarios_id"> {{usuario.name}}
                  </tr>
                </table>
              </div>
            </div>

            <div class="col-md-1"></div>
        </div>
        <div v-show="finalizar == false" class="text-center my-4" @click.stop="finalizar = !finalizar">
          <p-button type="info"
                    round
                    >
            Validar codigo de autorizacion
          </p-button>
        </div>
        <div v-show="finalizar == true" class="row my-2">

          <div class="col-md-3"></div>

          <div class="col-md-6">
            <label for="nombre">Codigo Especial</label>
            <input type="password" id="code" class="form-control" placeholder="Ingrese el codigo especial" minlength="6" maxlength="6" v-model="code" onkeypress='return event.charCode >= 48 && event.charCode <= 57' required/>
          </div>

          <div class="col-md-3"></div>

        </div>

        <div v-show="finalizar == true" class="text-center my-4">
          <p-button type="info"
                    round
                    @click.native.prevent="createProyect">
            Update Profile
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "UploadForm",
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
      mostrar2: false,
      aspirantes: null,
      token: sessionStorage.getItem('token'),
      usuarios: [],
      usuarios_id: [],
      code: null,
      varial: false,
      rol_id: sessionStorage.getItem('ur'),
      baseURL: "http://127.0.0.1:8000/api",
      finalizar: false,
      id: sessionStorage.getItem('proy'),
      proyectos: null,
      estado: null,
      repetido: null,
      repetido_estado: false,
    };
  },
  created(){

      try {
        axios.get(`${this.baseURL}/proyectos/ver/${this.id}`, {
          headers:{
            "Authorization": `Bearer ${this.token}`
          }
        }).then(response =>{
          // console.log(response)
          if (response.status == 200) {
            response.data.proyecto.map(r => {
              this.proyectos = r
            })
          }
          this.proyectos.tiene_usuarios.length == 0 ? this.aspirantes = true : this.aspirantes = false
          console.log(this.proyectos)
        })
      } catch (error) {
        alert('error')
        console.log(error)
      }
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
    async anexar() {
      this.mostrar =! this.mostrar
      this.estado = 1
    },
    async eliminar() {
      this.mostrar2 =! this.mostrar2
      this.estado = 2
    },
    async createProyect() {
      if (this.usuarios_id == null || this.usuarios_id.length == 0) {
        this.estado = 3
      }
      let info = {
        'name': this.proyecto.name,
        'description': this.proyecto.description,
        'duration': this.proyecto.duration,
        'estimated':this.proyecto.estimated,
        'stage': this.proyecto.stage,
        'state': 1,
        'participantes': this.usuarios_id,
        'code': Number(this.code),
      }

      // let info2 = {
      //   'state': Number(this.estado)
      // }
    if (this.estado == 1) {
      this.proyectos.tiene_usuarios.map(r => {
        this.usuarios_id.map(r2 => {
          if (r.id == r2) {
            this.repetido = r.name;
            this.repetido_estado = true;
            alert(this.repetido_estado)
          }
        })
      })
    }

      if (this.code == null) {
      return  this.$swal({
                  position: 'top-end',
                  icon: 'warning',
                  title: '¡Debe ingresar el codigo especial para validar su accion!',
                  showConfirmButton: false,
                  timer: 2500
                })
      }
      if (this.code.length < 6) {
      return  this.$swal({
                  position: 'top-end',
                  icon: 'warning',
                  title: '¡Los codigos especiales manejados en el sistema poseen 6 digitos, el codigo ingresado no cumple con ese formato!',
                  showConfirmButton: false,
                  timer: 6000
                })
      }
      console.log(info)
      // console.log(info2)
      if (this.repetido_estado == false) {
        try {
          let response = await axios.post(`${this.baseURL}/proyectos/modificar/${this.id}/${this.estado}`, info, {
            headers:{
                'Authorization': `Bearer ${this.token}`,
              }
          })
          console.log(response.data)
          console.log(response.status)
          if (response.status == 200) {
            this.$swal({
                    position: 'top-end',
                    icon: 'success',
                    title: '¡Proyecto modificado con exito!',
                    showConfirmButton: false,
                    timer: 2500
                  })
            this.$router.back();
          }
        } catch (error) {
          if (error.response.data.message == "compact(): Undefined variable: El codigo es incorrecto") {
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
      }
      else{
        this.$swal({
                    position: 'top-end',
                    icon: 'error',
                    title: `¡El usuario ${this.repetido} ya se encuentra asignado al proyecto, elija otro o verifique de nuevo!`,
                    showConfirmButton: false,
                    timer: 4500
                  })
        this.repetido_estado = false;
      }
    },
  }
}
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: center;
  list-style:none;
  width: 120px;
  background-color: #212120;
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
  background-color: #212120;
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
