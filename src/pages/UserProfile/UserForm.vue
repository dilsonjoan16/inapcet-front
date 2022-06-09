<template>
<div>
  <div v-show="loader == false" class="menu my-2 mx-2" style="cursor:pointer" @click="$router.go(-1)">
          <div class="subir">
            <span>
              <i class="ti-back-left" aria-hidden="true"></i>
            </span>
            <span>
              Volver atras
            </span>
          </div>
        </div>
  <card class="card" title="Crear Usuarios" v-show="loader == false">
    <!-- <div slot="image">
      <img src="@/assets/img/prueba.png" alt="..." width="10" height="250">
    </div> -->
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      label="Nombre"
                      placeholder="Ingrese el nombre"
                      v-model="user.name">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="email"
                      label="Correo"
                      placeholder="Ingrese el correo electronico"
                      v-model="user.email">
            </fg-input>
          </div>
          <div class="col-md-4">
            <!-- <fg-input type="password"
                      label="Contraseña"
                      placeholder="Ingrese la contraseña"
                      v-model="user.password">
            </fg-input> -->
            <label for="exampleFormControlCode">Contraseña</label>
            <input type="password" class="form-control" name="exampleFormControlPassword" id="exampleFormControlPassword" minlength="8" maxlength="12" placeholder="Ingrese la contraseña" v-model="user.password">
          </div>
          <div class="col-md-4">
            <!-- <fg-input type="password"
                      label="Codigo especial"
                      placeholder="Ingrese el codigo especial"
                      onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                      v-model="user.code">
            </fg-input> -->
            <label for="exampleFormControlCode">Codigo especial</label>
            <input type="password" id="exampleFormControlCode" class="form-control" placeholder="Ingrese el codigo especial" minlength="6" maxlength="6" v-model="user.code" onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>
          </div>

            <div class="form-group col-md-4">
              <label for="exampleFormControlSelect1">Roles</label>
              <select class="form-control" id="exampleFormControlSelect1" v-model="user.rol_id">
                <option disabled selected>Elija el Rol</option>
                <option v-for="(rol, index) in roles" :key="index" :value="rol.id">
                  {{rol.name}}
                </option>
              </select>
            </div>

        <div class="form-group col-md-4">
              <label for="exampleFormControlSelect1">Departamentos</label>
              <select class="form-control" id="exampleFormControlSelect1" v-model="user.departament_id">
                <option disabled selected>Elija el Departamento</option>
                <option v-for="(departamento, index) in departamentos" :key="index" :value="departamento.id">
                  {{departamento.name}}
                </option>
              </select>
            </div>
        </div>



        <div id="boton_menu">
          <div id="boton" class="text-white" style="cursor:pointer" @click.prevent="createUser">
            CREAR USUARIO
          </div>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
  <div class="row" v-show="loader == true">
  <div class="col-4"></div>
  <Loader />
  <div class="col-4"></div>
</div>
</div>
</template>
<script>

import axios from "axios"
import Loader from "@/pages/Loaders/Loader.vue"

export default {
  components:{
    Loader
  },
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null,
        code: null,
        rol_id: null,
        departament_id: null,
        state: null,
      },
      departamentos: [],
      roles: [],
      token: sessionStorage.getItem('token'),
      baseURL: "http://127.0.0.1:8000/api",
      rol_id: sessionStorage.getItem('ur'),
      loader: false,
    };
  },
  created(){
    this.loader = true
    axios.get(`${this.baseURL}/departamentos/activos`, {
      headers:{
          "Authorization": `Bearer ${this.token}`
        }
    }).then(response => {
      if (response.status == 200) {
        this.departamentos = response.data.departamento
        this.loader = false
      }
    });
this.loader = true
    axios.get(`${this.baseURL}/roles/activos`, {
      headers:{
          "Authorization": `Bearer ${this.token}`
        }
    }).then(response => {
      if (response.status == 200) {
        this.roles = response.data.role
        this.loader = false
      }
    });

  },
  methods: {
    createUser() {
      this.loader = true
      const regla2 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/;
      let info = {
        'name': this.user.name,
        'email': this.user.email,
        'password': this.user.password,
        'code': this.user.code,
        'rol_id': this.user.rol_id,
        'departament_id': this.user.departament_id,
        'state': 1
      }
      if (regla2.test(this.user.password)) {
        axios.post(`${this.baseURL}/usuarios/crear`, info, {
          headers:{
            "Authorization": `Bearer ${this.token}`
          }
        }).then(response => {
          console.log(response.data)
          if (response.status == 201) {
            this.loader = false
          this.$swal({
                  position: 'top-end',
                  icon: 'success',
                  title: '¡Usuario creado con exito!',
                  showConfirmButton: false,
                  timer: 2500
                })
          this.$router.back();
        }
        })
      } else{
        alert('error')
      }
    }
  }
};
</script>
<style>
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
</style>
