<template>
    <h2>VuePix</h2>
    <vue-pix v-bind="payload" class="pixclass" />
    <input v-model.number="payload.value">
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VuePix from './components/VuePix.vue'
export default defineComponent({
  name: 'App',
    data: () => ({
        payload: {
            pixkey: 'test@mail.com.br',
            name: 'Fulano de Tal',
            city: 'SAO PAULO',
            value: 150.99
        }
    }),
  components: {
    VuePix
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.pixclass {
    width: 400px;
    height: 400px;
    border-radius: 10px;
    border: 1px solid #2c3e50
}
</style>
