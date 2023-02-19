import {
  RouteRecordRaw,
  createRouter,
  createWebHistory,
  RouterOptions,
  createWebHashHistory,
} from "vue-router";

const DashboardFeature = () => import("../features/Dashborad.vue");
const PetListFeature = () => import("../features/PetList.vue");
const ScheduleCheckerFeature = () => import("../features/ScheduleChecker.vue");
const ContractorFeature = () => import("../features/Contractor.vue");

// const components = [HomeComponent, FormComponent, ListComponent, Contractor];
// const appRoutes = usePathStore(pinia).$state.appPaths;
// const routes = appRoutes.map((r) => ({
//   path: r.path,
//   name: r.name,
//   component: () => Promise.all(components.map((c) => c())),
// }));

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardFeature,
  },
  {
    name: "userPet",
    path: "/pet-list",
    component: PetListFeature,
  },
  {
    name: "checkSchedule",
    path: "/pet-schedule-checker",
    component: ScheduleCheckerFeature,
  }, 
  {
    name: "petContraction",
    path: "/contractor",
    component: ContractorFeature,
  },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
