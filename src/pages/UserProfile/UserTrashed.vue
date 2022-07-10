<template>
<div>

  <div class="row" v-show="loader == false">

         <!-- <div v-if="rol_id == 1" class="menu my-2 mx-2" style="cursor:pointer">
          <div v-on:click.prevent="restoreAll()" class="subir">
            <span>
              <i class="ti-loop mx-2" aria-hidden="true"></i>
              <i class="ti-user mx-2" aria-hidden="true"></i>
            </span>
            <span>
              Restaurar todos los usuarios
            </span>
          </div>
        </div> -->

        <!--<div v-else-if="rol_id == 2">
        <div class="menu my-2 mx-2" style="cursor:pointer">
          <div v-on:click.prevent="restoreAllDepartament()" class="subir">
            <span>
              <i class="ti-export" aria-hidden="true"></i>
            </span>
            <span>
              Restaurar todos los archivos
            </span>
          </div>
        </div>
    </div> -->

      <div class="col-12">
        <card class="card-plain">
          <div class="table-full-width table-responsive">
           <table v-if="rol_id == 1" class="table-hover col-12" id="tabla">
            <thead>
              <slot name="columns">
                <th v-for="column in columns" :key="column">{{column}}</th>
              </slot>
            </thead>
            <tbody v-show="datafull == true">
              <tr v-show="(pag - 1) * NUM_RESULTS <= index  && pag * NUM_RESULTS > index" v-for="(item, index) in data" :key="index">
                <slot :row="item">
                  <td>{{item.id}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.state == 1 ? "Activo" : "Inactivo"}}</td>
                  <td>{{item.pertenece_roles.name}}</td>
                  <td>{{item.pertecene_departamento.name}}</td>
                  <td>{{item.deleted_at == null ? "Registrado sin habilitar" : item.deleted_at.split(" ")[0]}}</td>
                  <td>
                    <!-- <i class="ti-download mx-2" style="cursor:pointer" aria-hidden="true" v-on:click.prevent="download(item.name)"></i> -->
                    <i class="ti-close mx-2" style="cursor:pointer" aria-hidden="true" v-on:click.prevent="deleted(item.id)"></i>
                    <i class="ti-reload mx-2" style="cursor:pointer" aria-hidden="true" v-on:click.prevent="restore(item.id)"></i>
                  </td>
                </slot>
              </tr>
            </tbody>
          </table>
          <table v-else-if="rol_id == 2" class="table-hover col-12" id="tabla">
            <thead>
              <slot name="columns">
                <th v-for="column in columns2" :key="column">{{column}}</th>
              </slot>
            </thead>
            <tbody v-show="datafull == true">
              <tr v-show="(pag - 1) * NUM_RESULTS <= index  && pag * NUM_RESULTS > index" v-for="(item, index) in data" :key="index">
                <slot :row="item">
                  <td>{{item.id}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.state == 1 ? "Activo" : "Inactivo"}}</td>
                  <td>{{item.pertenece_roles.name}}</td>
                  <td>{{item.deleted_at == null ? "Sin eliminar aun" : item.deleted_at.split(" ")[0]}}</td>
                  <td>
                    <!-- <i class="ti-download mx-2" style="cursor:pointer" aria-hidden="true" v-on:click.prevent="download(item.name)"></i> -->
                    <i v-if="rol_id == 1" class="ti-close mx-2" style="cursor:pointer" aria-hidden="true" v-on:click.prevent="deleted(item.id)"></i>
                    <i class="ti-reload mx-2" style="cursor:pointer" aria-hidden="true" v-on:click.prevent="restore(item.id)"></i>
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
  name: "UserTrashed",
  components: {
    PaperTable,
    Loader
  },
  data() {
    return {
      columns: ["Id", "Nombre", "Estado", "Rol", "Departamento", "Fecha de Eliminacion", "Acciones"],
      columns2: ["Id", "Nombre", "Estado", "Rol", "Fecha de Eliminacion", "Acciones"],
      data: [],
      token: sessionStorage.getItem('token'),
      baseURL: "https://shielded-hollows-48102.herokuapp.com/api",
      rol_id: sessionStorage.getItem('ur'),
      // datanull: false,
      datafull: true,
      NUM_RESULTS: 10, // Numero de resultados por página
      pag: 1, // Página inicial
      loader: false,
    };
  },
  mounted(){
    this.usuarios();
  },
  methods:{
    async usuarios()
    {
      this.loader = true
      let response = await axios.get(`${this.baseURL}/usuarios/inactivos`, {
        headers:{
          "Authorization": `Bearer ${this.token}`
        }
      })
      console.log(response.data)
      if (response.status == 200) {
        this.data = response.data.usuario
        this.loader = false
      }

      this.data.length == 0 ? this.datafull = false : this.datafull = true;

      // if (this.data.length == 0) {
      //   this.datanull = true;
      //   this.datafull = false;
      // }
    },
    // async download(name) {
    //   // try {
    //     axios({
    //                 url: `https://shielded-hollows-48102.herokuapp.com/api/documentos/download/${name}`,
    //                 method: 'GET',
    //                 headers:{"Authorization": `Bearer ${this.token}`},
    //                 responseType: 'blob',
    //             }).then((response) => {
    //                  var fileURL = window.URL.createObjectURL(new Blob([response.data]));
    //                  var fileLink = document.createElement('a');

    //                  fileLink.href = fileURL;
    //                  fileLink.setAttribute('download', `${name.split('-')[1]}`);
    //                  document.body.appendChild(fileLink);

    //                  fileLink.click();
    //                  this.$swal({
    //                    position: 'top-end',
    //                     icon: 'success',
    //                     title: '¡Archivo descargado con exito!',
    //                     showConfirmButton: false,
    //                     timer: 2000
    //                  })
    //             });
    //   // } catch (error) {
    //   //   console.log(error);
    //   // }
    // },
    async deleted(id) {
      sessionStorage.setItem('usdel',id)
      this.$router.push('/user-trashed-form');
    },
    async restore(id) {
      this.$swal({
          title: '¿Desea restaurar el usuario?',
  text: "¡Asegurate de que sea la decision correcta!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#93291E',
  cancelButtonColor: '#ffc44e',
  confirmButtonText: '¡Si, restaurarlo!',
  cancelButtonText: 'Volver'
}).then((result) => {
  if (result.isConfirmed) {
    this.loader = true
    try {
      axios.get(`${this.baseURL}/usuarios/activar/${id}`,{
        headers:{
          "authorization": `Bearer ${this.token}`
        }
      }).then(response => {
        console.log(response)
        if (response.status == 200) {
          this.loader = false
          this.$swal(
          '¡Restaurado!',
          'El usuario fue restaurado con exito',
          'success'
      )
      window.location.reload();
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
      })
    },
    async restoreAll() {
      if (this.rol_id == 1) {

        this.$swal({
            title: '¿Desea restaurar todos los usuarios?',
    text: "¡Asegurate de que sea la decision correcta!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#93291E',
    cancelButtonColor: '#ffc44e',
    confirmButtonText: '¡Si, restaurarlos!',
    cancelButtonText: 'Volver'
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        axios.post(`${this.baseURL}/usuarios/activar/masivo`,{
          headers:{
            "Authorization": `Bearer ${this.token}`
          }
        }).then(response => {
          console.log(response)
          if (response.status == 200) {
            this.$swal(
            '¡Restaurados!',
            'Todos los usuarios fueron restaurados con exito',
            'success'
        )
      // window.location.reload();
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
        })
      }
    },
    async restoreAllDepartament() {
      if (this.rol_id == 2) {

        this.$swal({
            title: '¿Desea restaurar todos los archivos?',
    text: "¡Asegurate de que sea la decision correcta!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#93291E',
    cancelButtonColor: '#ffc44e',
    confirmButtonText: '¡Si, restaurarlos!',
    cancelButtonText: 'Volver'
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        axios.put(`${this.baseURL}/documentos/activar/masivo/departamento`,{
          headers:{
            "Authorization": `Bearer ${this.token}`
          }
        }).then(response => {
          console.log(response)
          if (response.status == 200) {
            this.$swal(
            '¡Restaurados!',
            'Todos los archivos fueron restaurados con exito',
            'success'
        )
      window.location.reload();
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
        })
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
  width: 230px;
  background-color: #93291E;
  border-radius: 25px;
}
.subir span:first-child{
  display: inline-block;
  padding: 10px;
  margin-left: 55px;
}
.subir{
   display: block;
    position: relative;
    overflow: hidden;
    padding: 0px 10px;
    color: white;
    width: 215px;
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
