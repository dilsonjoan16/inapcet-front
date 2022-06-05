<template>
<div>
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
  <card class="card" title="Auditar Documento">
    <!-- <div slot="image">
      <img src="@/assets/img/prueba.png" alt="..." width="10" height="250">
    </div> -->
    <div>
      <form @submit.prevent>
          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-4 mx-3">
              <label class="my-3 text-dark" for="nombre">Nombre original</label>
              <p class="contorno">
                <span class="interno">
                  {{document.name}}
                </span>
              </p>
            </div>

            <div class="col-md-4 mx-3">
             <label class="my-3 text-dark" for="nombre">Nombre en el sistema</label>
              <p class="contorno">
                <span class="interno">
                  {{document.name.split('-')[1]}}
                </span>
              </p>
            </div>
            <div class="col-md-1"></div>
          </div>
          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-5 mx-3">
              <label class="my-3 text-dark" for="nombre">Departamento</label>
              <p class="contorno">
                <span class="interno">
                  {{document.pertenece_departamento.name}}
                </span>
              </p>
            </div>
            <div class="col-md-3 mx-3">
              <label class="my-3 text-dark" for="nombre">Estado</label>
              <p class="contorno">
                <span class="interno">
                  {{document.state == 1 ? "Activo" : "Inactivo"}}
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
                  {{document.pertenece_proyectos == null ? "Sin proyecto asignado aun" : document.pertenece_proyectos.name}}
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
                  {{document.usuario_creador.name}}
                </span>
              </p>
            </div>

            <div class="col-md-4 mx-3">
              <label class="my-3 text-dark" for="nombre">Fecha de creacion</label>
              <p class="contorno">
                <span class="interno">
                  {{document.created_at.split('T')[0]}}
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
                  {{document.usuario_modificador == null ? "Sin modificar" : document.usuario_modificador.name}}
                </span>
              </p>
            </div>

            <div class="col-md-4 mx-3">
              <label class="my-3 text-dark" for="nombre">Fecha de modificacion</label>
              <p class="contorno">
                <span class="interno">
                  {{document.updated_at == null ? "Sin modificar" : document.updated_at.split('T')[0]}}
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
                  {{document.usuario_eliminador == null ? "Sin eliminar" : document.usuario_eliminador.name}}
                </span>
              </p>
            </div>

            <div class="col-md-4 mx-3">
              <label class="my-3 text-dark" for="nombre">Fecha de eliminacion</label>
              <p class="contorno">
                <span class="interno">
                  {{document.deleted_at == null ? "Sin eliminar" : document.deleted_at.split(' ')[0]}}
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
                  {{document.usuario_restaurador == null ? "Sin restaurar" : document.usuario_restaurador.name}}
                </span>
              </p>
            </div>

            <div class="col-md-4 mx-3">
              <label class="my-3 text-dark" for="nombre">Fecha de restauracion</label>
              <p class="contorno">
                <span class="interno">
                  {{document.restored_at == null ? "Sin restaurar" : document.restored_at.split(' ')[0]}}
                </span>
              </p>
            </div>
            <div class="col-md-1"></div>
          </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</div>
</template>
<script>

import axios from "axios"

export default {
  data() {
    return {
      document: [],
      departamentos: [],
      roles: [],
      token: sessionStorage.getItem('token'),
      baseURL: "http://127.0.0.1:8000/api",
      rol_id: sessionStorage.getItem('ur'),
      id: sessionStorage.getItem('docaud'),
    };
  },
  created(){
    axios.get(`${this.baseURL}/documentos/ver/${this.id}`, {
      headers:{
          "Authorization": `Bearer ${this.token}`
        }
    }).then(response => {
      // console.log(response.data.usuario)
      if (response.status == 200) {
        response.data.documento.map(r => {
          this.document = r
        })
      }
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
.contorno{
  outline: thick double #ce3232;
  border-radius: 15px;
  padding: 10px;
}
.interno{
  padding: 15px;
}
</style>
