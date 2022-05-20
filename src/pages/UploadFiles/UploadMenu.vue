<template>
  <div class="row">

        <div class="menu my-2 mx-2" style="cursor:pointer">
          <router-link to="upload-form" class="subir">
            <span>
              <i class="ti-export" aria-hidden="true"></i>
            </span>
            <span>
              Subir Archivo
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
            <tbody>
              <tr v-for="(item, index) in data" :key="index">
                <slot :row="item">
                  <td>{{item.id}}</td>
                  <td>{{item.name.split('-')[1]}}</td>
                  <td>{{item.state == 1 ? "Activo" : "Inactivo"}}</td>
                  <td>{{item.pertenece_departamento.name}}</td>
                  <td>
                    <i class="ti-download mx-2" style="cursor:pointer" aria-hidden="true" v-on:click.prevent="download(item.name)"></i>
                    <i class="ti-pencil-alt mx-2" style="cursor:pointer" aria-hidden="true" v-on:click.prevent="update(item.id)"></i>
                    <i class="ti-trash mx-2" style="cursor:pointer" aria-hidden="true" v-on:click.prevent="trashed(item.id)"></i>
                  </td>
                </slot>
              </tr>
            </tbody>
          </table>
          </div>
        </card>
      </div>
  </div>
</template>

<script>
import { PaperTable } from "@/components";
import axios from "axios"

export default {
  name: "UploadMenu",
  components: {
    PaperTable
  },
  data() {
    return {
      columns: ["Id", "Nombre", "Estado", "Departamento", "Acciones"],
      data: [],
      token: sessionStorage.getItem('token'),
      baseURL: "http://127.0.0.1:8000/api"
    };
  },
  mounted(){
    this.documentos();
  },
  methods:{
    async documentos()
    {
      let response = await axios.get(`${this.baseURL}/documentos/activos`, {
        headers:{
          "Authorization": `Bearer ${this.token}`
        }
      })
      console.log(response.data)
      if (response.status == 200) {
        this.data = response.data.documento
      }
    },
    async download(name) {
      // try {
        this.$swal({
          title: '¿Desea descargar el archivo actual?',
          text: "¡Asegurate de que sea la decision correcta!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '¡Si, descargarlo!',
          cancelButtonText: 'Volver'
        }).then((result) => {
          if (result.isConfirmed) {

            axios({
              url: `${this.baseURL}/documentos/download/${name}`,
              method: 'GET',
              headers:{"Authorization": `Bearer ${this.token}`},
              responseType: 'blob',
          }).then((response) => {
                var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                var fileLink = document.createElement('a');

                fileLink.href = fileURL;
                fileLink.setAttribute('download', `${name.split('-')[1]}`);
                document.body.appendChild(fileLink);

                fileLink.click();
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
    async update(id) {
      this.$swal({
          title: '¿Desea modificar el archivo actual?',
  text: "¡Asegurate de que sea la decision correcta!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: '¡Si, modificarlo!',
  cancelButtonText: 'Volver'
}).then((result) => {
  if (result.isConfirmed) {
    sessionStorage.setItem('doc',id)
      this.$router.push('/upload-edit');
  }
      })
    },
    async trashed(id) {
      this.$swal({
          title: '¿Desea eliminar el archivo?',
  text: "¡Asegurate de que sea la decision correcta!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: '¡Si, eliminarlo!',
  cancelButtonText: 'Volver'
}).then((result) => {
  if (result.isConfirmed) {
    try {
      axios.get(`${this.baseURL}/documentos/desactivar/${id}`,{
        headers:{
          "Authorization": `Bearer ${this.token}`
        }
      }).then(response => {
        console.log(response)
        if (response.status == 200) {
          this.$swal(
          '¡Eliminado!',
          'El archivo fue eliminado con exito',
          'success'
      )
        this.$router.reload();
        }
      })
    } catch (error) {
      console.log(error)
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
#tabla{
  margin-left: 10px;
}
</style>
