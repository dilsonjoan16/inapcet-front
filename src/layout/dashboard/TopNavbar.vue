<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{routeName}}</a>
      <button class="navbar-toggler navbar-burger"
              type="button"
              @click="toggleSidebar"
              :aria-expanded="$sidebar.showSidebar"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="ti-panel"></i>
              <p>Stats</p>
            </a>
          </li>
          <drop-down class="nav-item"
                     title="5 Notifications"
                     title-classes="nav-link"
                     icon="ti-bell">
            <a class="dropdown-item" href="#">Notification 1</a>
            <a class="dropdown-item" href="#">Notification 2</a>
            <a class="dropdown-item" href="#">Notification 3</a>
            <a class="dropdown-item" href="#">Notification 4</a>
            <a class="dropdown-item" href="#">Another notification</a>
          </drop-down>
          <li class="nav-item" @click.prevent="logout()">
            <a style="cursor:pointer" class="nav-link">
              <i class="ti-arrow-circle-left"></i>
              <p>
                Cerrar Sesion
              </p>
            </a>
          </li>
        </ul>
      </div>
    </div></nav>
</template>
<script>
import axios from "axios"
export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      activeNotifications: false,
      baseURL: "http://127.0.0.1:8000/api",
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    async logout() {
      this.$swal({
      title: '¿Desea cerrar su sesion?',
      text: "¡Asegurate de que sea la decision correcta!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, cerrarla!',
      cancelButtonText: 'Volver'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get(`${this.baseURL}/usuarios/logout`,{
          headers:{
            "Authorization": "Bearer "+sessionStorage.getItem('token')
          }
        }).then(response => {
          if (response.status == 200) {
            sessionStorage.clear()
            this.$router.push("/login")
            const Toast = this.$swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', this.$swal.stopTimer)
                  toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                }
              })

              Toast.fire({
                icon: 'success',
                title: '¡Sesion finalizada!',
                text: 'Salio del sistema con exito. Hasta pronto'
              })
          }
          })
}
  })
    },
  }
};
</script>
<style>
</style>
