import { selectionCounter } from "@/stores/counter";
import { errorStore } from "@/stores/errors";
import { selectionsSummary } from "@/stores/selectionsSummary";
import HomeView from "@/views/HomeView/HomeView.vue";
import IntroView from "@/views/IntroView/IntroView.vue";
import FormView from "@/views/SkillForm/SkillForm.vue";
import ThankYou from "@/views/ThankYou/ThankYou.vue";
import { createRouter, createWebHistory } from "vue-router";
import { fetchService } from "../services/fetchService";
import SoftSkillsView from "../views/SkillForm/components/SoftSkillsview.vue";

let timer: ReturnType<typeof setTimeout> | null = null;

const alphanumeric = /^[a-zA-Z0-9]+$/;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/:hash",
      name: "intro",
      meta: { requiresAuth: true },
      component: IntroView,
    },

    {
      path: "/:hash/form",
      name: "form",
      meta: { requiresAuth: true },
      component: FormView,
    },

    {
      path: "/:hash/softskills",
      name: "softskills",
      meta: { requiresAuth: true },
      component: SoftSkillsView,
    },

    {
      path: "/:hash/success",
      name: "success",
      component: ThankYou,
      beforeEnter: (to, from, next) => {
        if (from.name === "softskills") {
          const hash: string = from.params.hash as string;
          const inputs: { [key: string]: number } = JSON.parse(localStorage.getItem("inputs")!);
          console.log(inputs); // Log the data
          fetchService(`/api/${hash}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs),
          })
            .then(() => {
              // After successfully sending the inputs, clear local storage and reset selection summary and counter
              localStorage.removeItem("inputs");
              selectionsSummary().reset();
              selectionCounter().reset();

              if (timer) {
                clearTimeout(timer);
                timer = null;
              }

              next();
            })
            .catch((error) => {
              console.log("Error in beforeEnter guard:", error);
              // Set the error state before navigating away
              if (error.message === "Unauthorized") {
                errorStore().set("send", 401);
              } else {
                errorStore().set("send", 400);
              }

              next("/");
            });
        } else {
          console.log("Unexpected previous route:", from.name);
          if (from.name !== "") next("/");
        }
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // this function will be called whenever a navigation occurs.
    // "to" is the route we are navigating to.
    // "from" is the route we are navigating from.
    // "savedPosition" is the scroll position of the "from" route, if the user is navigating back.

    // if the route has a hash, then scroll to the element with that ID.
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }

    // if the route has saved position, then scroll back to that position.
    if (savedPosition) {
      return savedPosition;
    }

    // default behavior is to scroll to the top of the page.
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    if (alphanumeric.test(to.params.hash as string)) {
      if (to.params.hash) {
        try {
          await fetchService(`/api/${to.params.hash}`);

          next();
        } catch (error: any) {
          console.log("Error in beforeEach guard:", error);
          if (error instanceof Error) {
            // check if error is instance of Error
            if (error.message === "Unauthorized") {
              errorStore().set("hash", 401);
            } else {
              errorStore().set("hash", 400);
            }
            next("/");
          }
        }
      } else {
        errorStore().set("hash", 400);
        next("/");
      }
    } else {
      console.log("Hash parameter missing in route:", to);
      errorStore().set("hash", 400);
      next("/");
    }
  } else {
    next();
  }
});

export default router;
