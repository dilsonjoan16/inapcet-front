<template>
<div>

  <div class="row" v-show="loader == false">

        <div class="menu my-2 mx-2" style="cursor:pointer">
          <router-link to="proyect-form" class="subir">
            <span>
              <i class="ti-plus mx-1" aria-hidden="true"></i>
              <i class="ti-hummer mx-1" aria-hidden="true"></i>
            </span>
            <span>
              Crear Proyecto
            </span>
          </router-link>
        </div>


      <div class="col-12">
        <card class="card-plain">
          <div class="table-full-width table-responsive">
           <table class="table-hover col-12" id="tabla">
            <thead>
              <slot name="columns">
                <th v-for="column in columns" :key="column">{{column}}</th>
              </slot>
            </thead>
            <tbody v-show="datafull == true">
              <tr v-show="(pag - 1) * NUM_RESULTS <= index  && pag * NUM_RESULTS > index" v-for="(item, index) in data" :key="index">
                <slot :row="item">
                  <td class="text-center">{{item.id}}</td>
                  <td class="text-center">{{item.name}}</td>
                  <td class="text-center">{{item.description}}</td>
                  <td class="text-center">{{item.duration == null || item.duration == 0 ? "Sin estimar" : item.duration}}</td>
                  <td class="text-center">{{item.estimated  == null || item.estimated  == 0 ? "Sin estimar" : "Bs. "+item.estimated}}</td>
                  <td class="text-center">{{item.stage}}</td>
                  <td class="text-center">{{item.state == 1 ? "Activo" : "Inactivo"}}</td>
                  <td class="text-center">{{item.created_at.split('T')[0]}}</td>
                  <td>
                    <i class="ti-download mx-2" style="cursor:pointer" aria-hidden="true" v-on:click.prevent="download(item.id, item.name)"></i>
                    <i v-if="rol_id == 1 || rol_id == 2" class="ti-pencil-alt mx-2" style="cursor:pointer" aria-hidden="true" v-on:click.prevent="update(item.id)"></i>
                    <i v-if="rol_id == 1 || rol_id == 2" class="ti-trash mx-2" style="cursor:pointer" aria-hidden="true" v-on:click.prevent="trashed(item.id)"></i>
                  </td>
                </slot>
              </tr>
            </tbody>
          </table>
          <div v-show="datafull == false" class="typo-line my-4 mx-4">
                  <h1>
                    <p class="category"></p>Sin datos que mostrar por el momento </h1>
                </div>
          </div>
        </card>
        <!-- Controles -->
        <div class="row">
          <div class="col-5"></div>
          <div class="menu">
          <div style="cursor:pointer" class="subir2" v-show="pag != 1" @click.prevent="pag -= 1">
            <span aria-hidden="true" class="ti-arrow-left"></span>
            <span>Anterior</span>
          </div>
          <div style="cursor:pointer" class="subir3" v-show="pag * NUM_RESULTS / data.length < 1" @click.prevent="pag += 1">
            <span aria-hidden="true" class="ti-arrow-right mx-2"></span>
            <span>Siguiente</span>
          </div>
        </div>
          <div class="col-4"></div>
        </div>
        <!-- Fin de Controles -->
      </div>
  </div>
  <div class="row" v-show="loader == true">
  <div class="col-4"></div>
  <Loader />
  <div class="col-4"></div>
</div>
</div>
</template>

<script>
import { PaperTable } from "@/components";
import axios from "axios"
import Loader from "@/pages/Loaders/Loader.vue"


export default {
  name: "UploadMenu",
  components: {
    PaperTable,
    Loader
  },
  data() {
    return {
      columns: ['Id del Proyecto','Nombre del Proyecto','Descripcion del Proyecto','Duracion (Semanas)','Presupuesto (Bs)','Etapa del Proyecto','Estado del Proyecto', "Fecha de Creacion", "Acciones"],
      data: [],
      token: sessionStorage.getItem('token'),
      baseURL: "https://shielded-hollows-48102.herokuapp.com/api",
      // datanull: false,
      datafull: true,
      NUM_RESULTS: 10, // Numero de resultados por página
      pag: 1, // Página inicial
      rol_id: sessionStorage.getItem('ur'),
      loader: false
    };
  },
  mounted(){
    this.proyectos();
  },
  methods:{
    async proyectos()
    {
      this.loader = true
      let response = await axios.get(`${this.baseURL}/proyectos/activos`, {
        headers:{
          "Authorization": `Bearer ${this.token}`
        }
      })
      console.log(response.data)
      if (response.status == 200) {
        this.data = response.data.proyecto
        this.loader = false
      }

      this.data.length == 0 ? this.datafull = false : this.datafull = true;

      // if (this.data.length == 0) {
      //   this.datanull = true;
      //   this.datafull = false;
      // }
    },
    async download(id, name) {
      // try {
        this.$swal({
          title: '¿Desea descargar el proyecto actual?',
          text: "¡Por favor elija el apartado del proyecto que desea descargar!",
          icon: 'warning',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonColor: '#93291E',
          cancelButtonColor: '#282C34',
          denyButtonColor: '#ffc44e',
          confirmButtonText: '¡Archivos asignados!',
          cancelButtonText: 'Volver',
          denyButtonText: `Contenido del proyecto`,
        }).then((result) => {
          if (result.isConfirmed) {
            sessionStorage.setItem('proy_doc',id)
            this.$router.push('/proyect-documents')
            }
            else if(result.isDenied){

              this.loader = true
              axios({
                url: `${this.baseURL}/download/pdf/proyecto/${id}`,
                method: 'GET',
                headers:{"Authorization": `Bearer ${this.token}`},
                responseType: 'blob',
            }).then((response) => {
                  var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                  var fileLink = document.createElement('a');

                  fileLink.href = fileURL;
                  fileLink.setAttribute('download', `${name}.pdf`);
                  document.body.appendChild(fileLink);

                  fileLink.click();
                  this.loader = false
                  this.$swal({
                    position: 'top-end',
                    icon: 'success',
                    title: '¡Archivo descargado con exito!',
                    showConfirmButton: false,
                    timer: 2000
                  })
                });

            }
            else{
            }
          })
      // } catch (error) {
      //   console.log(error);
      // }
    },
    async update(id) {
      this.$swal({
          title: '¿Desea modificar el proyecto actual?',
  text: "¡Asegurate de que sea la decision correcta!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#93291E',
  cancelButtonColor: '#ffc44e',
  confirmButtonText: '¡Si, modificarlo!',
  cancelButtonText: 'Volver'
}).then((result) => {
  if (result.isConfirmed) {
    sessionStorage.setItem('proy',id)
      this.$router.push('/proyect-edit');
  }
      })
    },
    async trashed(id) {
      this.$swal({
          title: '¿Desea eliminar el proyecto?',
  text: "¡Asegurate de que sea la decision correcta!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#93291E',
  cancelButtonColor: '#ffc44e',
  confirmButtonText: '¡Si, eliminarlo!',
  cancelButtonText: 'Volver'
}).then((result) => {
  if (result.isConfirmed) {
    this.loader = true
    try {
      axios.get(`${this.baseURL}/proyectos/desactivar/${id}`,{
        headers:{
          "Authorization": `Bearer ${this.token}`
        }
      }).then(response => {
        console.log(response)
        if (response.status == 200) {
          this.loader = false
          this.$swal(
          '¡Eliminado!',
          'El archivo fue eliminado con exito',
          'success'
      )
        window.location.reload();
        }
      })
    } catch (error) {
      console.log(error)
      this.loader = false
    }
  }
      })
    }
  }
}

</script>
<style scoped>
.menu {
  display: flex;
  justify-content: center;
  list-style:none;
  width: 180px;
  background-color: #93291E;
  border-radius: 25px;
}
.subir span:first-child{
  display: inline-block;
  padding: 10px;
  margin-left: 25px;
}
.subir{
   display: block;
    position: relative;
    overflow: hidden;
    padding: 0px 10px;
    color: white;
    width: 150px;
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
#tabla{
  margin-left: 10px;
}
.subir2 span:first-child{
  display: inline-block;
  padding: 10px;
  margin-left: 40%;
}
.subir2{
   display: block;
    position: relative;
    overflow: hidden;
    padding: 0px 10px;
    color: white;
    width: 180px;
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
/* Separacion */
.subir3 span:first-child{
  display: inline-block;
  padding: 10px;
  padding-left: 40%;
}
.subir3{
   display: block;
    position: relative;
    overflow: hidden;
    padding: 0px 10px;
    color: white;
    width: 180px;
}
.subir3 span:last-child{
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
.subir3 span{
  transition: transform 0.2s ease-out;
}
.subir3:hover span:first-child{
  transform: translateY(100%);
}
.subir3:hover span:last-child{
  transform: translateY(2%);
}
</style>
