<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/convert">Convert</router-link>
      </nav>

      <select @change="updateCurrency($event)">
        <option v-for="curr in currencyList" :key="curr" :value="curr">
          {{ curr.toUpperCase() }}
        </option>
      </select>
    </header>
    <router-view />
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
const store = useStore();

const currencyList = store.state.currencyList;
const updateCurrency = (event) => {
  const selectedCurrency = event.target.value;
  store.dispatch('updateCurrency', selectedCurrency);
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
