<template>
  <card class="card" title="Edit Profile">
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
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-6">
            <label for="nombre">Nombre Actual</label>
            <i class="ti-tag p-1" aria-hidden="true">{{user2.name}}</i>
            <input class="form-control" type="text" name="nombre" id="nombre" placeholder="Ingrese el nombre" v-model="user.name" maxlength="50">
          </div>
          <div class="col-md-6">
            <label for="nombre">Correo Actual</label>
            <i class="ti-tag p-1" aria-hidden="true">{{user2.email}}</i>
            <input class="form-control" type="email" name="email" id="email" placeholder="Ingrese el correo" v-model="user.email" maxlength="80">
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-6">
              <label for="exampleFormControlSelect10">Departamento Actual</label>
              <i class="ti-tag p-1" aria-hidden="true">{{user2.pertecene_departamento.name}}</i>
              <span class="form-control">
                {{user2.pertecene_departamento.name}}
              </span>
              <!-- <select class="form-control" id="exampleFormControlSelect10" v-model="user.departament_id">
                <option disabled selected>Elija el Departamento</option>
                <option v-for="(departamento, index) in departamentos" :key="index" :value="departamento.id">
                  {{departamento.name}}
                </option>
              </select> -->
          </div>
          <div class="col-md-3">
            <label for="password">Contraseña</label>
            <input type="password" class="form-control" name="password" id="password" minlength="8" maxlength="12" placeholder="Ingrese la contraseña" v-model="user.password">
          </div>
          <div class="col-md-3">
            <label for="nombre">Codigo Especial</label>
            <input type="password" id="code" class="form-control" placeholder="Ingrese el codigo especial" minlength="6" maxlength="6" v-model="user.code" onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-3">
              <label for="exampleFormControlSelect1">Rol Actual</label>
              <i class="ti-tag p-1" aria-hidden="true">{{user2.pertenece_roles.name}}</i>
              <span class="form-control">
                {{user2.pertenece_roles.name}}
              </span>
              <!-- <select class="form-control" id="exampleFormControlSelect1" v-model="user.rol_id">
                <option disabled selected>Elija el Rol</option>
                <option v-for="(rol, index) in roles" :key="index" :value="rol.id">
                  {{rol.name}}
                </option>
              </select> -->
          </div>
          <div class="form-group col-md-3">
              <label for="exampleFormControlSelect1">Estado Actual</label>
              <i class="ti-tag p-1" aria-hidden="true">{{user2.state == 1 ? "Activo" : "Inactivo"}}</i>
              <span class="form-control">
                {{user2.state == 1 ? "Activo" : "Inactivo"}}
              </span>
              <!-- <select class="form-control" id="exampleFormControlSelect1" v-model="user.rol_id">
                <option disabled selected>Elija el Estado</option>
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select> -->
          </div>
          <!-- Campo para proyectos -->
          <!-- <div class="form-group col-md-6">
              <label for="exampleFormControlSelect1">Proyectos Disponibles</label>
              <i class="ti-tag p-1" aria-hidden="true">{{user2.pertenece_roles.name}}</i>
              <select class="form-control" id="exampleFormControlSelect1" v-model="user.rol_id">
                <option disabled>Elija el Rol</option>
                <option v-for="(rol, index) in roles" :key="index" :value="rol.id">
                  {{rol.name}}
                </option>
              </select>
          </div> -->
        </div>

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="updateProfile">
            Update Profile
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>
<script>

import axios from "axios"

export default {
  data() {
    return {
      baseURL: "http://127.0.0.1:8000/api",
      token: sessionStorage.getItem('token'),
      id: sessionStorage.getItem('ui'),
      rol_id: sessionStorage.getItem('ur'),
      user: {
        name: null,
        email: null,
        password: null,
        code: null,
        state: null,
        departament_id: null,
        rol_id: null,
      },
      user2: [],
      roles: [],
      departamentos: [],
    };
  },
  created(){
    axios.get(`${this.baseURL}/usuarios/ver/${this.id}`, {
      headers:{
        "Authorization": `Bearer ${this.token}`
      }
    }).then(response => {
      console.log(response.data.usuario)
      if (response.status == 200) {
        this.user2 = response.data.usuario;
      }
    }).catch(error => {
      console.log(error)
    })

    // axios.get(`${this.baseURL}/roles/activos`, {
    //   headers:{
    //     "Authorization": `Bearer ${this.token}`
    //   }

    // }).then(response => {
    //   console.log(response.data)
    //   this.roles = response.data.role;
    // }).catch(error => {
    //   console.log(error)
    // })

    // axios.get(`${this.baseURL}/departamentos/activos`, {
    //   headers:{
    //     "Authorization": `Bearer ${this.token}`
    //   }
    // }).then(response => {
    //   console.log(response.data);
    //   this.departamentos = response.data.departamento;
    // }).catch(error => {
    //   console.log(error)
    // })
  },
  methods: {
    updateProfile() {
      const regla2 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/;
      let info = {
        "name": this.user.name,
        "email": this.user.email,
        "password": this.user.password,
        "code": this.user.code,
        "state": this.user.state,
        "departament_id": this.user.departament_id,
        "rol_id": this.user.rol_id,
      }
      // console.table(info)
      // return alert('Boom');
      if (this.user.password !== null) {
        if (this.user.password.test(regla2)) {
          axios.put(`${this.baseURL}/usuarios/modificar/${this.id}`, info, {
            headers:{
              "Authorization": `Bearer ${this.token}`
            }
          }).then(response => {
            console.log(response.data)
          if (response.status == 201) {
          this.$swal({
                  position: 'top-end',
                  icon: 'success',
                  title: '¡Usuario modificado con exito!',
                  showConfirmButton: false,
                  timer: 2500
                })
            this.$router.back();
            }
          }).catch(error => {
            console.log(error);
          })
        }
      }
      else{
        axios.put(`${this.baseURL}/usuarios/modificar/${this.id}`, info, {
            headers:{
              "Authorization": `Bearer ${this.token}`
            }
          }).then(response => {
            console.log(response.data)
          if (response.status == 200) {
          this.$swal({
                  position: 'top-end',
                  icon: 'success',
                  title: '¡Usuario creado con exito!',
                  showConfirmButton: false,
                  timer: 2500
                })
            this.$router.back();
            }
          }).catch(error => {
            console.log(error);
          })
      }
    }
  }
};
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
</style>
