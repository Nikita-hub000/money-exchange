<template>
  <div>
    <h1>Home Page</h1>
    <div v-for="curr in getKeysForApi()" :key="curr">
      <p>
        {{
          `1 ${curr.split('-')[0].toUpperCase()} = ${currencyData[curr].toFixed(
            2
          )} ${curr.split('-')[1].toUpperCase()}`
        }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const currencyData = computed(() => store.state.currencyData);

const currencyList = store.state.currencyList;

const mainCurrency = computed(() => store.state.mainCurrency);

const getKeysForApi = () => {
  return currencyList
    .filter((item) => item !== mainCurrency.value)
    .map((item) => `${item}-${mainCurrency.value}`);
};
</script>
