<template>
  <div id="ligth">
    <Red
      class="red"
      v-bind:class="{ fullopacity: currentColor === 'red' }"
      v-bind:time="time"
      v-bind:currentColor="currentColor"
      v-bind:flash="flash"
    />
    <Yellow
      class="yellow"
      v-bind:class="{ fullopacity: currentColor === 'yellow' }"
      v-bind:time="time"
      v-bind:currentColor="currentColor"
      v-bind:flash="flash"
    />
    <Green
      class="green"
      v-bind:class="{ fullopacity: currentColor === 'green' }"
      v-bind:time="time"
      v-bind:currentColor="currentColor"
      v-bind:flash="flash"
    />
  </div>
</template>
<script>
import Red from "./Red";
import Yellow from "./Yellow";
import Green from "./Green";

export default {
  data() {
    return {
      flash:false, //переменна для мерцания
      time: 0, //таймер
      redDur: 10, //время действия красного сигнала
      yellowDur: 3, //время действия желтого сигнала
      greenDur: 15, //время действия зеленго сигнала
      currentColor: "", //текущий цвет
      prevColor: "", //предыдущий цвет
    };
  },
  components: {
    Red,
    Yellow,
    Green,
  },
  created() {
    this.setColor(); //при создании объекта запускается метод
  },
    mounted() {
    if (localStorage.currentColor) { //берем текущий цвет из локального хранилища
      this.currentColor = localStorage.currentColor;
      this.$router.push({ path: `/${this.currentColor}` }).catch((err) => {});
    }},
  methods: {
    setColor() {
      //метод устанавливающий цвет экрана в зависимости от роутинга
      switch (this.$router.currentRoute.path) {
        case "/red":
          this.currentColor = "red";
          break;
        case "/yellow":
          this.currentColor = "yellow";
          break;
        case "/green":
          this.currentColor = "green";
          break;
      }
    },
    timer(time) {
      //метод реализующий таймер
      this.time = time - 1;
      time = time - 2;
      let interval = setInterval(() => {
        this.time = time - 1;
        if (time <= 0) {
          clearInterval(interval);
        }
        this.time = time;
        time = time - 1;
      }, 1000)
    },
    flashing(time) { //метод реализующий мерцание
      setTimeout(() => {
        let i = 7;
        let interval = setInterval(() => {
          if (i <= 0) {
            clearInterval(interval);
          }
          this.flash=!this.flash;
          i = i - 1;
        }, 500);
      }, (time - 4) * 1000);
    },
  },
  watch: {
    currentColor(value) {
      //логика смены цветов
      localStorage.currentColor = value; //записываем значение в локальное хранилище
      if (value === "red") {
        this.prevColor = "red";
        this.timer(this.redDur);
        this.flashing(this.redDur);
        setTimeout(() => {
          this.currentColor = "yellow";
          this.$router.push({ path: "/yellow" }).catch((err) => {});
        }, this.redDur * 1000);
      }
      if (value === "yellow") {
        if (this.prevColor === "green") {
          this.prevColor = "yellow";
          this.timer(this.yellowDur);
          //this.flashing(this.yellowDur) //мигание жёлтого сигнала
          setTimeout(() => {
            this.currentColor = "red";
            this.$router.push({ path: "/red" }).catch((err) => {});
          }, this.yellowDur * 1000);
        } else {
          this.prevColor = "yellow";
         // this.flashing(this.yellowDur) //мигание жёлтого сигнала
         this.timer(this.yellowDur); 
          setTimeout(() => {
            this.currentColor = "green";
            this.$router.push({ path: "/green" }).catch((err) => {});
          }, this.yellowDur * 1000);
        }
      }
      if (value === "green") {
        this.prevColor = "green";
        this.flashing(this.greenDur)
        this.timer(this.greenDur);
        setTimeout(() => {
          this.currentColor = "yellow";
          this.$router.push({ path: "/yellow" }).catch((err) => {});
        }, this.greenDur * 1000);
      }
    },

  },
};
</script>
<style scoped>
#ligth {
  width: 140px;
  height: 380px;
  background-color: #313131;
  border-radius: 100px;
  padding: 0px;
  margin: 0;
  padding-left: 20px;
  box-sizing: border-box;
}
.red,
.yellow,
.green {
  margin-top: 20px;
  padding: 0;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  opacity: 0.3;
  transition: opacity 0.5s;
}
.fullopacity {
  opacity: 1;
}
</style>