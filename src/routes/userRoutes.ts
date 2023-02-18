// import {
//     RouteRecordRaw,
//     createRouter,
//     createWebHistory,
//     createWebHashHistory,
//   } from "vue-router";
  
//   const HomeComponent = () => import("../views/HomeComponent.vue");
//   const FormComponent = () => import("../views/FormComponent.vue");
//   const ListComponent = () => import("../views/ListComponent.vue");
  
//   const routes = [
//     {
//       path: "/overviews",
//       name: "Overviews",
//       component: HomeComponent,
//     },
//     {
//       path: "/form-register",
//       name: "Form",
//       component: FormComponent,
//     },
//     {
//       path: "/state-list",
//       name: "List",
//       component: ListComponent,
//     },
//   ];
  
//   const router = createRouter({
//     // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
//     history: createWebHashHistory(),
//     routes, // short for `routes: routes`
//   });
  
//   router.beforeEach((to, from, next) => {
//     if (to.matched.length === 0) {
//       next("/overviews");
//     } else {
//       next();
//     }
//   });
  
//   export default router;
  