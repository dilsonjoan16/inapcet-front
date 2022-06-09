<template>
<div>

  <div class="row" v-show="loader == false">

        <div class="menu my-2 mx-2" style="cursor:pointer" @click.prevent="download()">
          <div class="subir3">
            <span>
              <i class="ti-import mx-2" aria-hidden="true"></i>
              <i class="ti-file mx-2" aria-hidden="true"></i>
            </span>
            <span>
              Descargar Tabla
            </span>
          </div>
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
            <tbody  v-show="datafull == true">
              <tr v-show="(pag - 1) * NUM_RESULTS <= index  && pag * NUM_RESULTS > index" v-for="(item, index) in data" :key="index">
                <slot :row="item">
                  <td>{{item.id}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.state == 1 ? "Activo" : "Inactivo"}}</td>
                  <td>{{item.created_at.split('T')[0]}}</td>
                  <td>{{item.updated_at == null ? "Sin modificar aun" : item.updated_at.split('T')[0]}}</td>
                  <td>{{item.deleted_at == null ? "Sin eliminar aun" : item.deleted_at.split(' ')[0]}}</td>
                  <td>{{item.restored_at == null ? "Sin restaurar aun" : item.restored_at.split(' ')[0]}}</td>
                  <td style="cursor:pointer" v-on:click.prevent="show(item.id)">
                    <!-- <i class="ti-download mx-2" style="cursor:pointer" aria-hidden="true" v-on:click.prevent="download(item.name)"></i> -->
                    <i class="ti-eye" id="ver_" aria-hidden="true"></i>
                    <i class="ti-key" aria-hidden="true"></i>
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
          <div style="cursor:pointer" class="subir" v-show="pag != 1" @click.prevent="pag -= 1">
            <span aria-hidden="true" class="ti-arrow-left"></span>
            <span>Anterior</span>
          </div>
          <div style="cursor:pointer" class="subir2" v-show="pag * NUM_RESULTS / data.length < 1" @click.prevent="pag += 1">
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
  name: "DepartamentMenu",
  components: {
    PaperTable,
    Loader
  },
  data() {
    return {
      columns: ["Id", "Nombre", "Estado", "Fecha de Creacion", "Fecha de Modificacion", "Fecha de Eliminacion", "Fecha de Restauracion", "Acciones"],
      data: [],
      token: sessionStorage.getItem('token'),
      baseURL: "https://shielded-hollows-48102.herokuapp.com/api",
      rol_id: sessionStorage.getItem('ur'),
      // datanull: false,
      datafull: true,
      NUM_RESULTS: 10, // Numero de resultados por página
      pag: 1, // Página inicial
      loader: false
    };
  },
  mounted(){
    this.departamentos();
  },
  methods:{
    async departamentos()
    {
      this.loader = true
      let response = await axios.get(`${this.baseURL}/proyectos/auditoria`, {
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

    },
    async download() {
      // try {
        this.$swal({
          title: '¿Desea descargar toda la informacion?',
          text: "¡Esta accion descargara un archivo excel con toda la data!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#93291E',
          cancelButtonColor: '#ffc44e',
          confirmButtonText: '¡Si, descargarlo!',
          cancelButtonText: 'Volver'
        }).then((result) => {
          if (result.isConfirmed) {
this.loader = true
          let date = new Date();
          let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();

            axios({
              url: `${this.baseURL}/download/excel/auditoria/proyectos`,
              method: 'GET',
              headers:{"Authorization": `Bearer ${this.token}`},
              responseType: 'blob',
          }).then((response) => {
                var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                var fileLink = document.createElement('a');

                fileLink.href = fileURL;
                fileLink.setAttribute('download', `Auditoria-Proyectos-INAPCET-${output}.xlsx`);
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
          })
      // } catch (error) {
      //   console.log(error);
      // }
    },
    async show(id) {
      sessionStorage.setItem('proyaud',id)
      this.$router.push('/show-proyects');
    },
  }
}

</script>
<style scoped>
.menu {
  display: flex;
  justify-content: center;
  list-style:none;
  width: 200px;
  background-color: #93291E;
  border-radius: 25px;
}
.subir span:first-child{
  display: inline-block;
  padding: 10px;
  margin-left: 40px;
}
.subir{
   display: block;
    position: relative;
    overflow: hidden;
    padding: 0px 10px;
    color: white;
    width: 180px;
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
#ver_{
  margin-left: 20px;
}
.subir2 span:first-child{
  display: inline-block;
  padding: 10px;
  padding-left: 40%;
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
/*  */
.subir3 span:first-child{
  display: inline-block;
  padding: 10px;
  margin-left: 20%;
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
