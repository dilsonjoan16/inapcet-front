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
        <!-- <div class="col-8"></div> -->
        <!-- <div class="menu2 my-2" style="cursor:pointer" @click.stop="mostrar = !mostrar">
          <div class="subir2">
            <span>
              <i class="ti-ruler-pencil p-1" aria-hidden="true"></i>
              <i class="ti-clipboard p-1" aria-hidden="true"></i>
            </span>
            <span>
              Anexar a Proyecto
            </span>
          </div>
        </div> -->
  <!--  -->
<card class="card col-12" title="Creacion de Departamento">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-8">

            <fg-input type="text"
                      label="Departamento"
                      v-model="departament.name"
                      placeholder="Nombre del Departamento"
                      >
            </fg-input>
          </div>

        <div class="col-md-4 my-4">
          <p-button type="info"
                    round
                    @click.native.prevent="createDepartament">
            Crear Departamento
          </p-button>
        </div>
        <div class="clearfix"></div>
        </div>
      </form>
    </div>
  </card>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "DepartamentForm",
  data() {
    return {
      departament: {
        name: null,
        state: 1,
      },
      mostrar: false,
      token: sessionStorage.getItem('token'),
      departamentos: [],
      proyectos: [],
      documento: null,
      varial: false,
      rol_id: sessionStorage.getItem('ur'),
      baseURL: "http://127.0.0.1:8000/api",
    };
  },
  created(){},
  mounted(){},
  methods: {
    async createDepartament() {
      let info = {
        'name': this.departament.name,
        'state': this.departament.state,
      }
      console.log(info)
      try {
        let response = await axios.post(`${this.baseURL}/departamentos/crear`, info, {
          headers:{
              'Authorization': `Bearer ${this.token}`,
            }
        })
        console.log(response.data)
        console.log(response.status)
        if (response.status == 201) {
          this.$swal({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Departamento creado con exito!',
                  showConfirmButton: false,
                  timer: 2500
                })
            this.$router.back();
        }
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
