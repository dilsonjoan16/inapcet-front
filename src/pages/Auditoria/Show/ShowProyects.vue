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
  <card v-show="loader == false" class="card" title="Auditar Proyecto">
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
                  {{proyecto.name}}
                </span>
              </p>
            </div>

            <div class="col-md-3 mx-3">
              <label class="my-3 text-dark" for="nombre">Estado</label>
              <p class="contorno">
                <span class="interno">
                  {{proyecto.state == 1 ? "Activo" : "Inactivo"}}
                </span>
              </p>
            </div>
          </div>

          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-8 mx-2">
              <label class="my-3 text-dark" for="nombre">Descripcion del Proyecto</label>
              <p class="contorno">
                <span class="interno">
                  {{proyecto.description}}
                </span>
              </p>
            </div>
            <div class="col-md-1"></div>
          </div>

          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-8 mx-2">
              <label class="my-3 text-dark" for="nombre">Etapa del Proyecto</label>
              <p class="contorno">
                <span class="interno">
                  {{proyecto.stage}}
                </span>
              </p>
            </div>
            <div class="col-md-1"></div>
          </div>

          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-4 mx-3">
              <label class="my-3 text-dark" for="nombre">Tiempo estimado</label>
              <p class="contorno">
                <span class="interno">
                  {{proyecto.duration == null ? "Sin estimar aun" : proyecto.duration+" Semanas"}}
                </span>
              </p>
            </div>

            <div class="col-md-4 mx-3">
              <label class="my-3 text-dark" for="nombre">Presupuesto estimado</label>
              <p class="contorno">
                <span class="interno">
                  {{proyecto.estimated == null ? "Sin estimar aun" : "Bs. "+proyecto.estimated}}
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
                  {{proyecto.usuario_creador == null ? "Sin asignar o creacion del sistema" : proyecto.usuario_creador.name}}
                </span>
              </p>
            </div>

            <div class="col-md-4 mx-3">
              <label class="my-3 text-dark" for="nombre">Fecha de creacion</label>
              <p class="contorno">
                <span class="interno">
                  {{proyecto.created_at == null ? "Sin asignar o creacion del sistema" : proyecto.created_at.split('T')[0]}}
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
                  {{proyecto.usuario_modificador == null ? "Sin modificar" : proyecto.usuario_modificador.name}}
                </span>
              </p>
            </div>

            <div class="col-md-4 mx-3">
              <label class="my-3 text-dark" for="nombre">Fecha de modificacion</label>
              <p class="contorno">
                <span class="interno">
                  {{proyecto.updated_at == null ? "Sin modificar" : proyecto.updated_at.split('T')[0]}}
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
                  {{proyecto.usuario_eliminador == null ? "Sin eliminar" : proyecto.usuario_eliminador.name}}
                </span>
              </p>
            </div>

            <div class="col-md-4 mx-3">
              <label class="my-3 text-dark" for="nombre">Fecha de eliminacion</label>
              <p class="contorno">
                <span class="interno">
                  {{proyecto.deleted_at == null ? "Sin eliminar" : proyecto.deleted_at.split(' ')[0]}}
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
                  {{proyecto.usuario_restaurador == null ? "Sin restaurar" : proyecto.usuario_restaurador.name}}
                </span>
              </p>
            </div>

            <div class="col-md-4 mx-3">
              <label class="my-3 text-dark" for="nombre">Fecha de restauracion</label>
              <p class="contorno">
                <span class="interno">
                  {{proyecto.restored_at == null ? "Sin restaurar" : proyecto.restored_at.split(' ')[0]}}
                </span>
              </p>
            </div>
            <div class="col-md-1"></div>
          </div>

          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-4 mx-3">
              <label class="my-3 text-dark" for="nombre">Usuarios asignados al proyecto</label>
              <div v-if="user_state == true" id="tabla" class="contorno">
                <table>
                  <tr class="interno">
                    <td v-for="(user, index) in proyecto.tiene_usuarios" :key="index">
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
              <label class="my-3 text-dark" for="nombre">Archivos asignados al proyecto</label>
              <div v-if="document_state == true" id="tabla" class="contorno">
                <table>
                  <tr class="interno">
                    <td v-for="(document, index) in proyecto.tiene_multimedia" :key="index">
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
      proyecto: [],
      user_state: null,
      document_state: null,
      token: sessionStorage.getItem('token'),
      baseURL: "http://127.0.0.1:8000/api",
      rol_id: sessionStorage.getItem('ur'),
      id: sessionStorage.getItem('proyaud'),
      loader: false
    };
  },
  created(){
    this.loader = true
    axios.get(`${this.baseURL}/proyectos/ver/${this.id}`, {
      headers:{
          "Authorization": `Bearer ${this.token}`
        }
    }).then(response => {
      console.log(response.data.proyecto)
      if (response.status == 200) {
        response.data.proyecto.map(r => {
          this.proyecto = r
        })
        this.loader = false
      }
      this.proyecto.tiene_usuarios.length > 0 ? this.user_state = true : this.user_state = false
      this.proyecto.tiene_multimedia.length > 0 ? this.document_state = true : this.document_state = false

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
