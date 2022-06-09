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
<card class="card col-12" title="Modificacion del Departamento">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-8">

            <label for="name">Nombre del departamento actual</label>
            <i class="ti-tag p-1" aria-hidden="true">{{departamentNow.name}}</i>
            <input class="form-control" type="text" name="name" id="name" placeholder="Nuevo nombre del Departamento" v-model="departament.name">

          </div>


        </div>
        <div id="boton_menu" class="my-3">
          <div id="boton" class="text-white" style="cursor:pointer" @click.prevent="updateDepartament">
            MODIFICAR DEPARTAMENTO
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
  name: "DepartamentEdit",
  components:{
    Loader
  },
  data() {
    return {
      departament: {
        name: null,
        state: 1,
      },
      mostrar: false,
      token: sessionStorage.getItem('token'),
      departamentNow: null,
      documento: null,
      varial: false,
      rol_id: sessionStorage.getItem('ur'),
      baseURL: "http://127.0.0.1:8000/api",
      id: sessionStorage.getItem('dep'),
      loader: false,
    };
  },
  created(){
    this.loader = true
    axios.get(`${this.baseURL}/departamentos/ver/${this.id}`, {
      headers:{
        'Authorization': `Bearer ${this.token}`,
      }
    }).then(response => {
      this.departamentNow = response.data.departamento
      this.loader = false
    })
  },
  mounted(){},
  methods: {
    async updateDepartament() {
      this.loader = true
      let info = {
        'name': this.departament.name,
        'state': this.departament.state,
      }
      console.log(info)
      try {
        let response = await axios.post(`${this.baseURL}/departamentos/modificar/${this.id}`, info, {
          headers:{
              'Authorization': `Bearer ${this.token}`,
            }
        })
        console.log(response.data)
        console.log(response.status)
        if (response.status == 200) {
          this.loader = false
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
        this.loader = false
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
