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
        <div class="menu2 my-2" style="cursor:pointer" @click.stop="proyecto()">
          <div class="subir2">
            <span>
              <i class="ti-ruler-pencil p-1" aria-hidden="true"></i>
              <i class="ti-clipboard p-1" aria-hidden="true"></i>
            </span>
            <span>
              Anexar a Proyecto
            </span>
          </div>
        </div>
  <!--  -->
<card class="card col-12" title="Cargar de Archivos">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-5">
            <label for="">Cargar Archivo</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupFileAddon01">Archivo</span>
              </div>
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01" @change="guardedFile">
                <label class="custom-file-label" for="inputGroupFile01">{{varial == true ? "¡Archivo cargado con exito!" : "Subir archivo"}}</label>
              </div>
            </div>
          </div>
          <!-- <div class="col-md-3">

            <fg-input type="text"
                      label="Estado"
                      :disabled="true"
                      placeholder="Activo"
                      >
            </fg-input>
          </div> -->

          <div v-show="mostrar == false" class="col-md-4">
            <div v-if="rol_id == 1">
              <div class="form-group">
                <label for="exampleFormControlSelect1">Departamentos</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="archivo.departament_id">
                  <option disabled selected>Elija su Departamento</option>
                  <option v-for="(departamento, index) in departamentos" :key="index" :value="departamento.id">
                    {{departamento.name}}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div v-show="mostrar == true" class="col-md-4">
            <div class="form-group">
              <label for="exampleFormControlSelect1">Proyectos</label>
              <select class="form-control" id="exampleFormControlSelect1" v-model="archivo.proyect_id">
                <option disabled selected>Elija su Proyecto</option>
                <option v-for="(proyecto, index) in proyectos" :key="index" :value="proyecto.id">
                  {{proyecto.name}}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div id="boton_menu">
          <div id="boton" class="text-white" style="cursor:pointer" @click.prevent="createDocument">
            CREAR ARCHIVO
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
      archivo: {
        state: 1,
        departament_id: null,
        proyect_id: null,
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
    };
  },
  created(){
    // async departamentos() {
      try {
        axios.get(`${this.baseURL}/departamentos/activos`, {
          headers:{
            "Authorization": `Bearer ${this.token}`
          }
        }).then(response =>{
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
    // },
    // async proyectos() {
      try {
        axios.get(`${this.baseURL}/proyectos/activos`, {
          headers:{
            "Authorization": `Bearer ${this.token}`
          }
        }).then(response =>{
          // console.log(response)
          if (response.status == 200) {
            this.proyectos = response.data.proyecto
          }
          console.log(this.proyectos)
        })
      } catch (error) {
        alert('error')
        console.log(error)
      }
    // }
  },
  mounted(){},
  methods: {
    guardedFile(event) {
      const file = event.target.files[0];
      this.documento = file;
      this.varial = true;
    },
    async proyecto() {
      this.mostrar =! this.mostrar;
      if (this.mostrar == true) {
         this.archivo.departament_id = 2
      }
    },
    async createDocument() {
      this.loader = true
      let info = {
        'archivo': this.documento,
        'state': this.archivo.state,
        'departament_id': this.archivo.departament_id,
        'proyect_id': this.archivo.proyect_id == null ? null : Number(this.archivo.proyect_id)
      }
      console.log(info)
      try {
        let response = await axios.post(`${this.baseURL}/documentos/crear`, info, {
          headers:{
              'Authorization': `Bearer ${this.token}`,
              'Content-Type': 'multipart/form-data'
            }
        })
        console.log(response.data)
        console.log(response.status)
        if (response.status == 201) {
          this.loader = false
          this.$swal({
                  position: 'top-end',
                  icon: 'success',
                  title: '¡Archivo creado con exito!',
                  showConfirmButton: false,
                  timer: 2500
                })
          this.$router.back();
        }
      } catch (error) {
        console.log(error)
        this.loader = false
          this.$swal({
                  position: 'top-end',
                  icon: 'error',
                  title: '¡Ocurrio un error!',
                  showConfirmButton: false,
                  timer: 2500
                })
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
  margin-left: 30px;
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
</style>
