import {
  RouteRecordRaw,
  createRouter,
  createWebHistory,
  RouterOptions,
  createWebHashHistory,
  useRoute,
} from "vue-router";

const DashboardFeature = () => import("../features/Dashborad.vue");
const PetListFeature = () => import("../features/PetList.vue");
const ScheduleCheckerFeature = () => import("../features/ScheduleChecker.vue");
const ContractorFeature = () => import("../features/Contractor.vue");
const LoginFeature = () => import("../auth/LoginApp.vue");
const signUpFeature = () => import("../auth/SignUpApp.vue");

import { getCurrentUser } from "vuefire";

// const components = [HomeComponent, FormComponent, ListComponent, Contractor];
// const appRoutes = usePathStore(pinia).$state.appPaths;
// const routes = appRoutes.map((r) => ({
//   path: r.path,
//   name: r.name,
//   component: () => Promise.all(components.map((c) => c())),
// }));

const routes = [
  {
    path: "/sign-in",
    name: "singIn",
    component: LoginFeature,
  },
  {
    path: "/sign-up",
    name: "singUp",
    component: signUpFeature,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardFeature,
    meta: { requiresAuth: true },
  },
  {
    name: "userPet",
    path: "/pet-list",
    component: PetListFeature,
    meta: { requiresAuth: true },
  },
  {
    name: "checkSchedule",
    path: "/pet-schedule-checker",
    component: ScheduleCheckerFeature,
    meta: { requiresAuth: true },
  },
  {
    name: "petContraction",
    path: "/contractor",
    component: ContractorFeature,
    meta: { requiresAuth: true },
  },
];
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

// router.beforeEach((to, from, next) => {
//   useAuthState().$state.isAuth.then((authState) => {
//     if (!authState) {
//       next("sign-in");
//       router.push("sign-in");
//     }

//     if (to.matched.length === 0) {
//       next("/dashboard");
//     } else {
//       next();
//     }
//   });
// });
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return next("/sign-in");
    }
  }
  if (to.matched.length === 0) {
    // if the user is not logged in, redirect to the login page
    return next("/dashboard");
  }
  next();
});

export default router;
