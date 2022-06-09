<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" name="Dashboard" icon="ti-panel"/>
        <sidebar-link to="/table-list" name="Table List" icon="ti-view-list-alt"/>
        <sidebar-link to="/typography" name="Typography" icon="ti-text"/>
        <sidebar-link to="/icons" name="Icons" icon="ti-pencil-alt2"/>
        <sidebar-link to="/maps" name="Map" icon="ti-map"/>
        <sidebar-link to="/notifications" name="Notifications" icon="ti-bell"/>

        <sidebar-link to="/profile-user" name="Perfil" icon="ti-user"/>
        <sidebar-link to="/upload-menu" name="Menu de archivos" icon="ti-package"/>
        <sidebar-link to="/upload-single" name="Escritorio" icon="ti-folder"/>
        <sidebar-link to="/upload-departament" name="Escritorio del departamento" icon="ti-archive"/>
        <sidebar-link to="/upload-trashed" name="Papelera de archivos" icon="ti-trash"/>

        <sidebar-link to="/departament-menu" name="Menu de departamentos" icon="ti-home"/>
        <sidebar-link to="/departament-trashed" name="Papelera de departamentos" icon="ti-trash"/>

        <sidebar-link to="/proyect-menu" name="Menu de proyectos" icon="ti-hummer"/>
        <sidebar-link to="/proyect-trashed" name="Papelera de proyectos" icon="ti-trash"/>

        <sidebar-link to="/user-menu" name="Menu de usuarios" icon="ti-user"/>
        <sidebar-link to="/user-trashed" name="Papelera de usuarios" icon="ti-trash"/>

        <sidebar-link to="/auditoria-documents" name="Auditoria de archivos" icon="ti-bar-chart-alt"/>
        <sidebar-link to="/auditoria-users" name="Auditoria de usuarios" icon="ti-support"/>
        <sidebar-link to="/auditoria-departaments" name="Auditoria de departamentos" icon="ti-bar-chart"/>
        <sidebar-link to="/auditoria-proyects" name="Auditoria de proyectos" icon="ti-stats-up"/>




      </template>
      <!-- DESDE ACA HACIA ABAJO Menu Movil TELEFONOS -->
      <mobile-menu>
        <!-- <li class="nav-item">
          <a class="nav-link">
            <i class="ti-panel"></i>
            <p>Stats</p>
          </a>
        </li>
        <drop-down class="nav-item"
                   title="5 Notifications"
                   title-classes="nav-link"
                   icon="ti-bell">
          <a class="dropdown-item">Notification 1</a>
          <a class="dropdown-item">Notification 2</a>
          <a class="dropdown-item">Notification 3</a>
          <a class="dropdown-item">Notification 4</a>
          <a class="dropdown-item">Another notification</a>
        </drop-down>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-settings"></i>
            <p>Settings</p>
          </a>
        </li> -->
        <li class="nav-item" @click.prevent="logout()">
            <a style="cursor:pointer" class="nav-link">
              <i class="ti-arrow-circle-left"></i>
              <p>
                Cerrar Sesion
              </p>
            </a>
          </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
