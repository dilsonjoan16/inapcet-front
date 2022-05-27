<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" name="Dashboard" icon="ti-panel"/>
        <sidebar-link to="/stats" name="User Profile" icon="ti-user"/>
        <sidebar-link to="/table-list" name="Table List" icon="ti-view-list-alt"/>
        <sidebar-link to="/typography" name="Typography" icon="ti-text"/>
        <sidebar-link to="/icons" name="Icons" icon="ti-pencil-alt2"/>
        <sidebar-link to="/maps" name="Map" icon="ti-map"/>
        <sidebar-link to="/notifications" name="Notifications" icon="ti-bell"/>

        <sidebar-link to="/upload-menu" name="UploadMenu" icon="ti-package"/>
        <sidebar-link to="/upload-single" name="UploadSingle" icon="ti-folder"/>
        <sidebar-link to="/upload-departament" name="UploadDepartament" icon="ti-archive"/>
        <sidebar-link to="/upload-trashed" name="UploadTrashed" icon="ti-trash"/>

        <sidebar-link to="/departament-menu" name="DepartamentMenu" icon="ti-home"/>
        <sidebar-link to="/departament-trashed" name="DepartamentTrashed" icon="ti-trash"/>

        <sidebar-link to="/proyect-menu" name="ProyectMenu" icon="ti-hummer"/>
        <sidebar-link to="/proyect-trashed" name="ProyectTrashed" icon="ti-trash"/>

        <sidebar-link to="/user-menu" name="UserMenu" icon="ti-user"/>
        <sidebar-link to="/user-trashed" name="UserTrashed" icon="ti-trash"/>

        <sidebar-link to="/auditoria-menu" name="AuditoriaMenu" icon="ti-bar-chart-alt"/>



      </template>
      <!-- DESDE ACA HACIA ABAJO Menu Movil TELEFONOS -->
      <mobile-menu>
        <li class="nav-item">
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
