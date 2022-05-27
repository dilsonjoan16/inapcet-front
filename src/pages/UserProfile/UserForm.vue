<template>
  <card class="card" title="Crear Usuarios">
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
                <option disabled>Elija el Rol</option>
                <option v-for="(rol, index) in roles" :key="index" :value="rol.id">
                  {{rol.name}}
                </option>
              </select>
            </div>

        <div class="form-group col-md-4">
              <label for="exampleFormControlSelect1">Departamentos</label>
              <select class="form-control" id="exampleFormControlSelect1" v-model="user.departament_id">
                <option disabled>Elija el Departamento</option>
                <option v-for="(departamento, index) in departamentos" :key="index" :value="departamento.id">
                  {{departamento.name}}
                </option>
              </select>
            </div>
        </div>


        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="createUser">
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
    };
  },
  created(){
    axios.get(`${this.baseURL}/departamentos/activos`, {
      headers:{
          "Authorization": `Bearer ${this.token}`
        }
    }).then(response => {
      if (response.status == 200) {
        this.departamentos = response.data.departamento
      }
    });

    axios.get(`${this.baseURL}/roles/activos`, {
      headers:{
          "Authorization": `Bearer ${this.token}`
        }
    }).then(response => {
      if (response.status == 200) {
        this.roles = response.data.role
      }
    });

  },
  methods: {
    createUser() {
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
</style>
