import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth"; // Asegúrate de tener este store implementado

//Layouts
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";
import AuthLayout from "@/components/layouts/AuthLayout.vue";

//Auth views
import Login from "@/views/Auth/Login.vue";
import ForgotPassword from "@/views/Auth/ForgotPassword.vue";

//Sidebar views
//Home
import HomeView from "@/views/SideBar/HomeView.vue";

//-- Admin
import CaseAssign from "@/views/SideBar/Admin/CaseAssign.vue";
import CaseReview from "@/views/SideBar/Admin/CaseReview.vue";
import Configuration from "@/views/SideBar/Admin/Configuration.vue";

//-- Admin -> (Users)
import UserView from "@/views/SideBar/Admin/Users/UserView.vue";
import NewUser from "@/views/SideBar/Admin/Users/NewUser.vue";
import IngresoEstudiantesExcel from '@/views/SideBar/CRUD/Estudiantes/IngresoEstudiantesExcel.vue';
import ListadoEstudiantes from '@/views/SideBar/CRUD/Estudiantes/ListadoEstudiantes.vue';
import IngresoArea from '@/views/SideBar/CRUD/Horario/IngresoArea.vue';


//-- Admin -> (Social Work)
import SocialWorkCases from "@/views/SideBar/Admin/SocialWork/SocialWorkCases.vue";
import SocialWorkDashboard from "@/views/SideBar/Admin/SocialWork/SocialWorkDashboard.vue";
import SocialWorkSchedule from "@/views/SideBar/Admin/SocialWork/SocialWorkSchedule.vue";
import SocialWorkNewCase from "@/views/SideBar/Admin/SocialWork/SocialWorkNewCase.vue";

//Cases
import NewCase from "@/views/SideBar/Cases/NewCase.vue";
import MyCases from "@/views/SideBar/Cases/MyCases.vue";
import CaseNotifications from "@/views/SideBar/Cases/CaseNotifications.vue";

//Reports
import FeasibilityReport from "@/views/SideBar/Reports/FeasibilityReport.vue";
import FileReport from "@/views/SideBar/Reports/FileReport.vue";

//Cronogram 
import Cronograma from '@/views/SideBar/CRUD/Cronograma/Cronograma.vue';
import IngresoCronograma from '@/views/SideBar/CRUD/Cronograma/IngresoCronograma.vue';

//Periods
import AsignacionPeriodo from '@/views/SideBar/CRUD/Estudiantes/AsignacionPeriodo.vue';
import RemoverPeriodo from '@/views/SideBar/CRUD/Estudiantes/RemoverPeriodo.vue';

//Schedule
import IngresoHorario from '@/views/SideBar/CRUD/Horario/IngresoHorario.vue';
import VistaHorarios from '@/views/SideBar/CRUD/Horario/VistaHorarios.vue';
import IngresoHorarioVirtual from '@/views/SideBar/CRUD/Horario/IngresoHorarioVirtual.vue';

// FingerPrint
import AsignacionHuella from '@/views/SideBar/CRUD/RegistroBiometrico/AsignacionHuella.vue';
import RegistroHuella from '@/views/SideBar/CRUD/RegistroBiometrico/RegistroHuella.vue';
import RegistroAsistencia from '@/views/SideBar/CRUD/RegistroBiometrico/RegistroAsistencia.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      // Home
      {
        path: "",
        name: "home",
        component: HomeView,
      },
      // Cases views
      {
        path: "NuevoCaso",
        name: "NewCase",
        component: NewCase,
      },
      {
        path: "MisCasos",
        name: "MyCases",
        component: MyCases,
      },
      {
        path: "Notificaciones",
        name: "CaseNotifications",
        component: CaseNotifications,
      },
      // Reports views
      {
        path: "InformeDeViabilidad",
        name: "FeasibilityReport",
        component: FeasibilityReport,
      },
      {
        path: "ReporteDeDocumentos",
        name: "FileReport",
        component: FileReport,
      },
      // Admin views
      {
        path: "RevisionDeCasos",
        name: "CaseReview",
        component: CaseReview,
      },
      {
        path: "AsignacionDeCasos",
        name: "CaseAssign",
        component: CaseAssign,
      },
      {
        path: "Configuracion",
        name: "Configuration",
        component: Configuration,
      },
      // Admin -> Users views
      {
        path: "Usuarios/:id?",
        name: "UserView",
        component: UserView,
      },
      {
        path: "NuevoUsuario",
        name: "NewUser",
        component: NewUser,
      },
      // Admin -> Social Work views
      {
        path: "TrabajoSocialDashboard",
        name: "SocialWorkDashboard",
        component: SocialWorkDashboard,
      },
      {
        path: "TrabajoSocialHorario",
        name: "SocialWorkSchedule",
        component: SocialWorkSchedule,
      },
      {
        path: "NuevoCasoTrabajoSocial",
        name: "SocialWorkNewCase",
        component: SocialWorkNewCase,
      },
      {
        path: "TrabajoSocialCasos",
        name: "SocialWorkCases",
        component: SocialWorkCases,
      },
      {
        path: 'Cronograma',
        name: 'Cronograma',
        component: Cronograma,
      },
      //Tayu
      {
        path: 'IngresoCronograma',
        name: 'IngresoCronograma',
        component: IngresoCronograma,
      },
      {
        path: 'IngresoCronograma/:id?',
        name: 'IngresoCronograma',
        component: IngresoCronograma,
      },
      {
        path: 'IngresoEstudiantesExcel',
        name: 'IngresoEstudiantesExcel',
        component: IngresoEstudiantesExcel,
      },
      {
        path: 'ListadoEstudiantes',
        name: 'ListadoEstudiantes',
        component: ListadoEstudiantes,
      },
      {
        path: 'AsignacionPeriodo',
        name: 'AsignacionPeriodo',
        component: AsignacionPeriodo,
      },
      {
        path: 'RemoverPeriodo',
        name: 'RemoverPeriodo',
        component: RemoverPeriodo,
      },
      {
        path: 'IngresoArea',
        name: 'IngresoArea',
        component: IngresoArea,
      },
      {
        path: 'IngresoHorario',
        name: 'IngresoHorario',
        component: IngresoHorario,
      },
      {
        path: 'IngresoHorarioVirtual',
        name: 'IngresoHorarioVirtual',
        component: IngresoHorarioVirtual,
      },
      {
        path: 'VistaHorarios',
        name: 'VistaHorarios',
        component: VistaHorarios,
      },
      {
        path: 'AsignacionHuella',
        name: 'AsignacionHuella',
        component: AsignacionHuella,
      },
      {
        path: 'RegistroHuella/:id?',
        name: 'RegistroHuella',
        component: RegistroHuella,
      },
      {
        path: 'RegistroAsistencia/:id/periodo/:periodo',
        name: 'RegistroAsistencia',
        component: RegistroAsistencia,
      },
    ],
  },
  // Auth views
  {
    path: "/login",
    component: AuthLayout,
    children: [
      {
        path: "",
        name: "Login",
        component: Login,
      },
      {
        path: "forgot-password",
        name: "ForgotPassword",
        component: ForgotPassword,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Router guard: Todas las rutas que no comiencen con "/login" son protegidas.
router.beforeEach(async (to, from, next) => {
  // Si la ruta es pública (empieza con "/login"), permitimos el acceso.
  if (to.path.startsWith("/login")) {
    return next();
  }

  // Para las rutas protegidas, verificamos la sesión
  const authStore = useAuthStore();

  // Verificar o refrescar la sesión. Este método debería hacer una llamada al endpoint
  // /api/me o similar para confirmar que el usuario sigue autenticado.
  await authStore.verifySession();

  // Si no está autenticado, redirigimos al login.
  if (!authStore.isAuthenticated) {
    return next({ name: "Login" });
  }

  // Si está autenticado, se permite la navegación.
  next();
});

export default router;
