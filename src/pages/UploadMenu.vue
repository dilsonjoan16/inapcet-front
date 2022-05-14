<template>
  <div class="row">

        <div class="menu">
          <!-- Button trigger modal -->
          <div class="subir" style="cursor:pointer">
            <span>
              <i class="ti-export" aria-hidden="true"></i>
            </span>
            <span>Cargar</span>
          </div>
        </div>

      <div class="col-12">
        <card class="card-plain">
          <div class="table-full-width table-responsive">
            <paper-table type="hover" :title="table.title" :sub-title="table.subTitle" :data="table.data"
                         :columns="table.columns">
            </paper-table>
          </div>
        </card>
      </div>

<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

  </div>
</template>

<script>
import { PaperTable } from "@/components";
import axios from "axios"
const tableColumns = ["Id", "Nombre", "Salary", "Country", "Acciones"];

export default {
  name: "UploadMenu",
  components: {
    PaperTable
  },
  data() {
    return {
      table: {
        title: "Table on Plain Background",
        subTitle: "Here is a subtitle for this table",
        columns: [...tableColumns],
        data: []
      }
    };
  },
  mounted(){
    this.documentos();
  },
  methods:{
    async documentos()
    {
      let response = await axios.get("http://127.0.0.1:8000/api/documentos/activos", {
        headers:{
          "Authorization": "Bearer "+sessionStorage.getItem('token')
        }
      })
      console.log(response)
    }
  }
}
</script>
<style scoped>
.menu {
  display: flex;
  justify-content: center;
  list-style:none;
  width: 100px;
  background-color: #212120;
  border-radius: 25px;
}
.subir span:first-child{
  display: inline-block;
  padding: 10px;
}
.subir{
   display: block;
    position: relative;
    overflow: hidden;
    padding: 0px 10px;
    color: white;
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
