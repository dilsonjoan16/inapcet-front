import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";

import UploadMenu from "@/pages/UploadFiles/UploadMenu.vue";
import UploadForm from "@/pages/UploadFiles/UploadForm.vue";
import UploadEdit from "@/pages/UploadFiles/UploadEdit.vue";
import UploadTrashed from "@/pages/UploadFiles/UploadTrashed.vue";
import UploadSingle from "@/pages/UploadFiles/UploadSingle.vue";
import UploadDepartament from "@/pages/UploadFiles/UploadDepartament.vue";
import UploadTrashedForm from "@/pages/UploadFiles/UploadTrashedForm.vue";

import DepartamentMenu from "@/pages/Departaments/DepartamentMenu.vue";
import DepartamentForm from "@/pages/Departaments/DepartamentForm.vue";
import DepartamentEdit from "@/pages/Departaments/DepartamentEdit.vue";
import DepartamentTrashed from "@/pages/Departaments/DepartamentTrashed.vue";
import DepartamentTrashedForm from "@/pages/Departaments/DepartamentTrashedForm.vue";

import ProyectMenu from "@/pages/Proyects/ProyectMenu.vue";
import ProyectForm from "@/pages/Proyects/ProyectForm.vue";
import ProyectEdit from "@/pages/Proyects/ProyectEdit.vue";
import ProyectTrashed from "@/pages/Proyects/ProyectTrashed.vue";
import ProyectDocuments from "@/pages/Proyects/ProyectDocuments.vue";

import UserMenu from "@/pages/UserProfile/UserMenu.vue";
import UserForm from "@/pages/UserProfile/UserForm.vue";
import UserEdit from "@/pages/UserProfile/EditProfileForm.vue";
import UserProfile from "@/pages/UserProfile.vue";
import UserTrashed from "@/pages/UserProfile/UserTrashed.vue";
import UserTrashedForm from "@/pages/UserProfile/UserTrashedForm.vue";
import ProfileUser from "@/pages/UserProfile/ProfileUser.vue";

import AuditoriaDocuments from "@/pages/Auditoria/AuditoriaDocuments.vue";
import AuditoriaUsers from "@/pages/Auditoria/AuditoriaUsers.vue";
import AuditoriaDepartaments from "@/pages/Auditoria/AuditoriaDepartaments.vue";
import AuditoriaProyects from "@/pages/Auditoria/AuditoriaProyects.vue";

import ShowDocuments from "@/pages/Auditoria/Show/ShowDocuments.vue";
import ShowDepartaments from "@/pages/Auditoria/Show/ShowDepartaments.vue";
import ShowProyects from "@/pages/Auditoria/Show/ShowProyects.vue";
import ShowUsers from "@/pages/Auditoria/Show/ShowUsers.vue";

// Paginas de Ingreso, Registro y Recuperacion de Clave o Codigo
import Login from "@/pages/Ingreso/Login.vue";
import Register from "@/pages/Ingreso/Register.vue";
import Recovery from "@/pages/Ingreso/Recovery.vue";
import Code from "@/pages/Ingreso/Code.vue";

import Emails from "@/pages/Emails/Emails.vue";

// Midleware de seguridad
import Guard from "@/services/auth.js";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "stats",
        name: "stats",
        component: UserProfile
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "maps",
        name: "maps",
        component: Maps
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList
      },
      {
        path: "upload-menu",
        name: "upload-menu",
        component: UploadMenu,

      },
      {
        path: "upload-form",
        name: "upload-form",
        component: UploadForm
      },
      {
        path: "upload-edit",
        name: "upload-edit",
        component: UploadEdit
      },
      {
        path: "upload-trashed",
        name: "upload-trashed",
        component: UploadTrashed,

      },
      {
        path: "upload-single",
        name: "upload-single",
        component: UploadSingle
      },
      {
        path: "upload-departament",
        name: "upload-departament",
        component: UploadDepartament
      },
      {
        path: "upload-trashed-form",
        name: "upload-trashed-form",
        component: UploadTrashedForm,

      },
      {
        path: "departament-menu",
        name: "departament-menu",
        component: DepartamentMenu,

      },
      {
        path: "departament-form",
        name: "departament-form",
        component: DepartamentForm,

      },
      {
        path: "departament-edit",
        name: "departament-edit",
        component: DepartamentEdit,

      },
      {
        path: "departament-trashed",
        name: "departament-trashed",
        component: DepartamentTrashed,

      },
      {
        path: "departament-trashed-form",
        name: "departament-trashed-form",
        component: DepartamentTrashedForm,

      },
      {
        path: "proyect-menu",
        name: "proyect-menu",
        component: ProyectMenu
      },
      {
        path: "proyect-form",
        name: "proyect-form",
        component: ProyectForm
      },
      {
        path: "proyect-edit",
        name: "proyect-edit",
        component: ProyectEdit
      },
      {
        path: "proyect-trashed",
        name: "proyect-trashed",
        component: ProyectTrashed
      },
      {
        path: "proyect-documents",
        name: "proyect-documents",
        component: ProyectDocuments
      },
      {
        path: "user-menu",
        name: "user-menu",
        component: UserMenu,

      },
      {
        path: "user-form",
        name: "user-form",
        component: UserForm
      },
      {
        path: "user-edit",
        name: "user-edit",
        component: UserEdit
      },
      {
        path: "user-trashed",
        name: "user-trashed",
        component: UserTrashed,

      },
      {
        path: "user-trashed-form",
        name: "user-trashed-form",
        component: UserTrashedForm,

      },
      {
        path: "profile-user",
        name: "profile-user",
        component: ProfileUser
      },
      {
        path: "auditoria-documents",
        name: "auditoria-documents",
        component: AuditoriaDocuments
      },
      {
        path: "auditoria-departaments",
        name: "auditoria-departaments",
        component: AuditoriaDepartaments
      },
      {
        path: "auditoria-proyects",
        name: "auditoria-proyects",
        component: AuditoriaProyects
      },
      {
        path: "auditoria-users",
        name: "auditoria-users",
        component: AuditoriaUsers
      },
      {
        path: "show-documents",
        name: "show-documents",
        component: ShowDocuments
      },
      {
        path: "show-departaments",
        name: "show-departaments",
        component: ShowDepartaments
      },
      {
        path: "show-proyects",
        name: "show-proyects",
        component: ShowProyects
      },
      {
        path: "show-users",
        name: "show-users",
        component: ShowUsers
      },
      {
        path: "emails",
        name: "emails",
        component: Emails
      }

    ],
    beforeEnter: Guard.auth
  },
  { path: "*", component: NotFound },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/recovery",
    name: "recovery",
    component: Recovery
  },
  {
    path: "/code",
    name: "code",
    component: Code
  }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
