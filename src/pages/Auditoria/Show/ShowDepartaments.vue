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
  <card v-show="loader == false" class="card" title="Auditar Departamento">
    <!-- <div slot="image">
      <img src="@/assets/img/prueba.png" alt="..." width="10" height="250">
    </div> -->
    <div>
      <form @submit.prevent>
          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-6 mx-3">
              <label class="my-3 text-dark" for="nombre">Nombre</label>
              <p class="contorno">
                <span class="interno">
                  {{departament.name}}
                </span>
              </p>
            </div>

            <div class="col-md-3 mx-3">
              <label class="my-3 text-dark" for="nombre">Estado</label>
              <p class="contorno">
                <span class="interno">
                  {{departament.state == 1 ? "Activo" : "Inactivo"}}
                </span>
              </p>
            </div>



          </div>
          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-8 mx-3">
              <label class="my-3 text-dark" for="nombre">Proyecto ligado</label>
              <p class="contorno">
                <span class="interno">
                  {{departament.pertenece_proyectos == null ? "Sin proyecto asignado aun" : departament.pertenece_proyectos.name}}
                </span>
              </p>
            </div>
            <div class="col-md-1"></div>
          </div>
          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-4 mx-3">
              <label class="my-3 text-dark" for="nombre">Usuario creador</label>
              <p class="contorno">
                <span class="interno">
                  {{departament.usuario_creador == null ? "Sin asignar o creacion del sistema" : departament.usuario_creador.name}}
                </span>
              </p>
            </div>

            <div class="col-md-4 mx-3">
              <label class="my-3 text-dark" for="nombre">Fecha de creacion</label>
              <p class="contorno">
                <span class="interno">
                  {{departament.created_at == null ? "Sin asignar o creacion del sistema" : departament.created_at.split('T')[0]}}
                </span>
              </p>
            </div>
            <div class="col-md-1"></div>
          </div>
          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-4 mx-3">
              <label class="my-3 text-dark" for="nombre">Usuario modificador</label>
              <p class="contorno">
                <span class="interno">
                  {{departament.usuario_modificador == null ? "Sin modificar" : departament.usuario_modificador.name}}
                </span>
              </p>
            </div>

            <div class="col-md-4 mx-3">
              <label class="my-3 text-dark" for="nombre">Fecha de modificacion</label>
              <p class="contorno">
                <span class="interno">
                  {{departament.updated_at == null ? "Sin modificar" : departament.updated_at.split('T')[0]}}
                </span>
              </p>
            </div>
            <div class="col-md-1"></div>
          </div>
          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-4 mx-3">
              <label class="my-3 text-dark" for="nombre">Usuario eliminador</label>
              <p class="contorno">
                <span class="interno">
                  {{departament.usuario_eliminador == null ? "Sin eliminar" : departament.usuario_eliminador.name}}
                </span>
              </p>
            </div>

            <div class="col-md-4 mx-3">
              <label class="my-3 text-dark" for="nombre">Fecha de eliminacion</label>
              <p class="contorno">
                <span class="interno">
                  {{departament.deleted_at == null ? "Sin eliminar" : departament.deleted_at.split(' ')[0]}}
                </span>
              </p>
            </div>
            <div class="col-md-1"></div>
          </div>
          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-4 mx-3">
              <label class="my-3 text-dark" for="nombre">Usuario restaurador</label>
              <p class="contorno">
                <span class="interno">
                  {{departament.usuario_restaurador == null ? "Sin restaurar" : departament.usuario_restaurador.name}}
                </span>
              </p>
            </div>

            <div class="col-md-4 mx-3">
              <label class="my-3 text-dark" for="nombre">Fecha de restauracion</label>
              <p class="contorno">
                <span class="interno">
                  {{departament.restored_at == null ? "Sin restaurar" : departament.restored_at.split(' ')[0]}}
                </span>
              </p>
            </div>
            <div class="col-md-1"></div>
          </div>

          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-4 mx-3">
              <label class="my-3 text-dark" for="nombre">Usuarios asignados al departamento</label>
              <div v-if="user_state == true" id="tabla" class="contorno">
                <table>
                  <tr class="interno">
                    <td v-for="(user, index) in departament.tiene_usuarios" :key="index">
                      {{user.name}}
                    </td>
                  </tr>
                </table>
              </div>
              <p v-else class="contorno">
                <span class="interno">
                  Sin usuarios asignados aun
                </span>
              </p>
            </div>

            <div class="col-md-5 mx-3">
              <label class="my-3 text-dark" for="nombre">Archivos asignados al departamento</label>
              <div v-if="document_state == true" id="tabla" class="contorno">
                <table>
                  <tr class="interno">
                    <td v-for="(document, index) in departament.tiene_documentos" :key="index">
                      {{document.name.split('-')[1]}}
                    </td>
                  </tr>
                </table>
              </div>
              <p v-else class="contorno">
                <span class="interno">
                  Sin documentos asignados aun
                </span>
              </p>
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
      departament: [],
      user_state: null,
      document_state: null,
      token: sessionStorage.getItem('token'),
      baseURL: "http://127.0.0.1:8000/api",
      rol_id: sessionStorage.getItem('ur'),
      id: sessionStorage.getItem('depaud'),
      loader: false
    };
  },
  created(){
    this.loader = true
    axios.get(`${this.baseURL}/departamentos/ver/${this.id}`, {
      headers:{
          "Authorization": `Bearer ${this.token}`
        }
    }).then(response => {
      console.log(response.data.departamento)
      if (response.status == 200) {
        response.data.departamento.map(r => {
          this.departament = r
        })
          this.loader = false
      }
      this.departament.tiene_usuarios.length > 0 ? this.user_state = true : this.user_state = false
      this.departament.tiene_documentos.length > 0 ? this.document_state = true : this.document_state = false

    });

  },
  methods: {}
};
</script>
<style scoped>
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
.contorno{
  outline: thick double #93291E;
  border-radius: 15px;
  padding: 10px;
}
.interno{
  padding: 15px;
}
#tabla{
  overflow:scroll;
  height: 200px;
}
</style>
