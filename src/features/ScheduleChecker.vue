<script lang="ts">
import { Pet } from "../store/petState";
import { useUserState } from "../store/userState";

export default {
  setup() {
    return {
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      user: useUserState().$state.users[0],
      rentPet: () =>
        <Pet>(
          useUserState().$state.users[0].petsOwning[
            Math.floor(Math.random() * 2)
          ]
        ),
    };
  },
};
</script>
<template>
  <v-container>
    <div class="mx-auto w-full">
      <div class="schedule-box">
        <div class="row">
          <div class="col-md-12">
            <div class="schedule-table rounded">
              <table class="table rounded">
                <thead>
                  <tr class="">
                    <th class="text-base">Routine</th>
                    <th class="text-xs">8 am</th>
                    <th class="text-xs">9 am</th>
                    <th class="text-xs">10 pm</th>
                    <th class="text-xs">11 pm</th>
                    <th class="text-xs">12 pm</th>
                    <th class="text-xs">1 pm</th>
                    <th class="last text-xs">3 pm</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="day in days">
                    <td class="day text-base">{{ day }}</td>
                    <td v-for="dataCol in 7" class="active">
                      <div
                        v-if="Math.floor(Math.random() * 6) === 4"
                        class="flex flex-col gap-3"
                      >
                        <div class="flex justify-center items-center gap-3">
                          <v-avatar>
                            <v-img cover :src="rentPet().imgPic"></v-img>
                          </v-avatar>
                          <p class="font-bold">
                            {{ rentPet().name }}
                          </p>
                        </div>
                        <div class="flex justify-center items-center gap-3">
                          <p class="text-caption">ยืมโดย</p>
                          <v-avatar sizes="12">
                            <v-img cover sizes="12" :src="user.imgPic"></v-img>
                          </v-avatar>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>
<style scoped>
.schedule-box {
  margin: 8px;
}
.schedule-table {
  overflow-x: auto;
}

.schedule-table table thead tr {
  background: #86d4f5;
}
.schedule-table table thead th {
  padding: 20px 20px;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 800;
  position: relative;
  border: 0;
}
.schedule-table table thead th:before {
  content: "";
  width: 3px;
  height: 35px;
  background: rgba(255, 255, 255, 0.2);
  position: absolute;
  right: -1px;
  top: 50%;
  transform: translateY(-50%);
}
.schedule-table table thead th.last:before {
  content: none;
}
.schedule-table table tbody td {
  vertical-align: middle;
  border: 1px solid #e2edf8;
  font-weight: 500;
  padding: 30px;
  text-align: center;
}
.schedule-table table tbody td.day {
  font-size: 12px;
  font-weight: 600;
  background: #f0f1f3;
  border: 1px solid #e4e4e4;
  position: relative;
  transition: all 0.3s linear 0s;
  min-width: 165px;
}
.schedule-table table tbody td.active {
  position: relative;
  z-index: 10;
  transition: all 0.3s linear 0s;
  min-width: 165px;
}
.schedule-table table tbody td.active h4 {
  font-weight: 700;
  color: #000;
  font-size: 15px;
  margin-bottom: 5px;
}
.schedule-table table tbody td.active p {
  font-size: 12px;
  line-height: normal;
  margin-bottom: 0;
}
.schedule-table table tbody td .hover h4 {
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
  margin-bottom: 5px;
}
.schedule-table table tbody td .hover p {
  font-size: 12px;
  margin-bottom: 5px;
  color: #ffffff;
  line-height: normal;
}
.schedule-table table tbody td .hover span {
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
}
.schedule-table table tbody td.active::before {
  position: absolute;
  content: "";
  min-width: 100%;
  min-height: 100%;
  transform: scale(0);
  top: 0;
  left: 0;
  z-index: -1;
  border-radius: 0.25rem;
  transition: all 0.3s linear 0s;
}
.schedule-table table tbody td .hover {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 120%;
  height: 120%;
  transform: translate(-50%, -50%) scale(0.8);
  z-index: 99;
  background: #86d4f5;
  border-radius: 0.5rem;
  padding: 25px 0;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s linear 0s;
}
.schedule-table table tbody td.active:hover .hover {
  transform: translate(-50%, -50%) scale(1);
  visibility: visible;
  opacity: 1;
}
.schedule-table table tbody td.day:hover {
  background: #86d4f5;
  color: #fff;
  border: 1px solid #86d4f5;
}
@media screen and (max-width: 1199px) {
  .schedule-table {
    display: block;
    width: 100%;
    overflow-x: auto;
  }
  .schedule-table table thead th {
    padding: 25px 40px;
  }
  .schedule-table table tbody td {
    padding: 20px;
  }
  .schedule-table table tbody td.active h4 {
    font-size: 18px;
  }
  .schedule-table table tbody td.active p {
    font-size: 15px;
  }
  .schedule-table table tbody td.day {
    font-size: 20px;
  }
  .schedule-table table tbody td .hover {
    padding: 15px 0;
  }
  .schedule-table table tbody td .hover span {
    font-size: 17px;
  }
}
@media screen and (max-width: 991px) {
  .schedule-table table thead th {
    font-size: 18px;
    padding: 20px;
  }
  .schedule-table table tbody td.day {
    font-size: 18px;
  }
  .schedule-table table tbody td.active h4 {
    font-size: 17px;
  }
}
@media screen and (max-width: 767px) {
  .schedule-table table thead th {
    padding: 15px;
  }
  .schedule-table table tbody td {
    padding: 15px;
  }
  .schedule-table table tbody td.active h4 {
    font-size: 16px;
  }
  .schedule-table table tbody td.active p {
    font-size: 14px;
  }
  .schedule-table table tbody td .hover {
    padding: 10px 0;
  }
  .schedule-table table tbody td.day {
    font-size: 18px;
  }
  .schedule-table table tbody td .hover span {
    font-size: 15px;
  }
}
@media screen and (max-width: 575px) {
  .schedule-table table tbody td.day {
    min-width: 135px;
  }
}
</style>
