<template>
  <div class="row">

         <div v-if="rol_id == 1" class="menu my-2 mx-2" style="cursor:pointer">
          <div v-on:click.prevent="restoreAll()" class="subir">
            <span>
              <i class="ti-export" aria-hidden="true"></i>
            </span>
            <span>
              Restaurar todos los usuarios
            </span>
          </div>
        </div>

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
            <tbody>
              <tr v-show="datafull == true" v-for="(item, index) in data" :key="index">
                <slot :row="item">
                  <td>{{item.id}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.state == 1 ? "Activo" : "Inactivo"}}</td>
                  <td>{{item.pertenece_departamento.name}}</td>
                  <td>{{item.pertenece_roles.name}}</td>
                  <td>{{item.deleted_at.split(" ")[0]}}</td>
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
            <tbody>
              <tr v-show="datafull == true" v-for="(item, index) in data" :key="index">
                <slot :row="item">
                  <td>{{item.id}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.state == 1 ? "Activo" : "Inactivo"}}</td>
                  <td>{{item.pertenece_roles.name}}</td>
                  <td>{{item.deleted_at.split(" ")[0]}}</td>
                  <td>
                    <!-- <i class="ti-download mx-2" style="cursor:pointer" aria-hidden="true" v-on:click.prevent="download(item.name)"></i> -->
                    <i v-if="rol_id == 1" class="ti-close mx-2" style="cursor:pointer" aria-hidden="true" v-on:click.prevent="deleted(item.id)"></i>
                    <i class="ti-reload mx-2" style="cursor:pointer" aria-hidden="true" v-on:click.prevent="restore(item.id)"></i>
                  </td>
                </slot>
              </tr>
            </tbody>
          </table>
          <div v-show="datanull == true" class="typo-line my-4 mx-4">
                  <h1>
                    <p class="category"></p>Sin datos que mostrar por el momento </h1>
                </div>
          </div>
        </card>
      </div>
  </div>
</template>

<script>
import { PaperTable } from "@/components";
import axios from "axios"

export default {
  name: "UserTrashed",
  components: {
    PaperTable
  },
  data() {
    return {
      columns: ["Id", "Nombre", "Estado", "Rol", "Departamento", "Fecha de Eliminacion", "Acciones"],
      columns2: ["Id", "Nombre", "Estado", "Rol", "Fecha de Eliminacion", "Acciones"],
      data: [],
      token: sessionStorage.getItem('token'),
      baseURL: "http://127.0.0.1:8000/api",
      rol_id: sessionStorage.getItem('ur'),
      datanull: false,
      datafull: true,
    };
  },
  mounted(){
    this.usuarios();
  },
  methods:{
    async usuarios()
    {
      let response = await axios.get(`${this.baseURL}/usuarios/inactivos`, {
        headers:{
          "Authorization": `Bearer ${this.token}`
        }
      })
      console.log(response.data)
      if (response.status == 200) {
        this.data = response.data.usuario
      }

      if (this.data.length == 0) {
        this.datanull = true;
        this.datafull = false;
      }
    },
    // async download(name) {
    //   // try {
    //     axios({
    //                 url: `http://127.0.0.1:8000/api/documentos/download/${name}`,
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
      this.$swal({
          title: '¿Desea eliminar el archivo?',
  text: "Recuerde que esta opcion elimina por completo el registro de su sistema y no hay forma de recuperarlo una vez sea eliminado ¡Asegurate de que sea la decision correcta!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: '¡Si, eliminarlo!',
  cancelButtonText: 'Volver'
}).then((result) => {
  if (result.isConfirmed) {
    sessionStorage.setItem('doc_del',id)
      this.$router.push('/upload-trashed-form');
  }
      })
    },
    async restore(id) {
      this.$swal({
          title: '¿Desea restaurar el usuario?',
  text: "¡Asegurate de que sea la decision correcta!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: '¡Si, restaurarlo!',
  cancelButtonText: 'Volver'
}).then((result) => {
  if (result.isConfirmed) {
    try {
      axios.get(`${this.baseURL}/usuarios/activar/${id}`,{
        headers:{
          "authorization": `Bearer ${this.token}`
        }
      }).then(response => {
        console.log(response)
        if (response.status == 200) {
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
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Si, restaurarlos!',
    cancelButtonText: 'Volver'
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        axios.put(`${this.baseURL}/usuarios/activar/masivo`,{
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
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
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
  background-color: #212120;
  border-radius: 25px;
}
.subir span:first-child{
  display: inline-block;
  padding: 10px;
  margin-left: 75px;
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
</style>
