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
  <!--  -->
<card class="card col-12" title="Eliminar Documento">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-10">

            <fg-input type="password"
                      label="Codigo Secreto"
                      placeholder="Ingrese el codigo"
                      v-model="code"
                      >
            </fg-input>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="deleteDocument">
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
  name: "UploadTrashedForm",
  data() {
    return {
      code: null,
      token: sessionStorage.getItem('token'),
      id: sessionStorage.getItem('doc_del'),
      baseURL: "http://127.0.0.1:8000/api",
    };
  },
  created(){},
  mounted(){},
  methods: {
    async deleteDocument() {
      console.log(this.code)
      let code = {
        'code':this.code
      }
      try {
        axios.delete(`${this.baseURL}/documentos/eliminado/permanente/${this.id}`, code, {
          headers:{
              'Authorization': `Bearer ${this.token}`,
            }
        }).then(response => {
          console.log(response.data)
          console.log(response.status)
          if (response.status == 201) {
            this.$swal({
                  position: 'top-end',
                  icon: 'success',
                  title: '¡Archivo eliminado del sistema con exito!',
                  showConfirmButton: false,
                  timer: 2500
                })
            this.$router.back();
          }
        })
      } catch (error) {
        console.log(error)
        alert('error')
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
