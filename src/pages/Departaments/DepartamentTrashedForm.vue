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
        <div class="row my-2">

          <div class="col-md-3"></div>

          <div class="col-md-6">
            <label for="nombre">Codigo Especial</label>
            <input type="password" id="code" class="form-control" placeholder="Ingrese el codigo especial" minlength="6" maxlength="6" v-model="code" onkeypress='return event.charCode >= 48 && event.charCode <= 57' required/>
          </div>

          <div class="col-md-3"></div>

        </div>

        <div class="text-center my-2">
          <p-button type="info"
                    round
                    @click.native.prevent="deleteDepartament">
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
  name: "DepartamentTrashedForm",
  data() {
    return {
      code: null,
      token: sessionStorage.getItem('token'),
      id: sessionStorage.getItem('dep_del'),
      baseURL: "http://127.0.0.1:8000/api",
    };
  },
  created(){},
  mounted(){},
  methods: {
    async deleteDepartament() {
      this.$swal({
          title: '¿Desea eliminar el departamento?',
  text: "Recuerde que esta opcion elimina por completo el registro de su sistema y no hay forma de recuperarlo una vez sea eliminado ¡Asegurate de que sea la decision correcta!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: '¡Si, eliminarlo!',
  cancelButtonText: 'Volver'
}).then((result) => {
  if (result.isConfirmed) {

    console.log(this.code)
    let code = {
      'code':this.code
    }
    try {
      axios.post(`${this.baseURL}/departamentos/eliminado/forzado/${this.id}`, code, {
        headers:{
            'Authorization': `Bearer ${this.token}`,
          }
      }).then(response => {
        console.log(response.data)
        console.log(response.status)
        if (response.status == 200) {
          this.$swal({
                position: 'top-end',
                icon: 'success',
                title: '¡Departamento eliminado del sistema con exito!',
                showConfirmButton: false,
                timer: 2500
              })
          this.$router.back();
        }
      }).catch(error => {
        console.log(error.response.data.message)
          if (error.response.data.message == "compact(): Undefined variable: Eliminacion completa") {
            this.$swal({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Departamento eliminado del sistema con exito!',
                  showConfirmButton: false,
                  timer: 2500
                })
            this.$router.back();
            // this.restaurar =! this.restaurar
            // window.location.reload();
          }
          if (error.response.data.message == "compact(): Undefined variable: El codigo es incorrecto") {
            this.$swal({
                  position: 'top-end',
                  icon: 'error',
                  title: '¡El codigo ingresado es incorrecto!',
                  showConfirmButton: false,
                  timer: 2500
                })
            // this.$router.back();
            this.code = null
          }
          if (error.response.data.message == "compact(): Undefined variable: Necesita ingresar el codigo") {
            this.$swal({
                  position: 'top-end',
                  icon: 'warning',
                  title: '¡Necesita ingresar el codigo especial!',
                  showConfirmButton: false,
                  timer: 2500
                })
            this.$router.back();
            // this.code = null
            // this.restaurar =! this.restaurar
          }
      })
    } catch (error) {
      console.log(error)
      alert('error')
    }
  }
      })
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
