<template>
  <div>
    <h1>Convert Page</h1>
    <div>
      <select v-model="currencyFrom">
        <option
          :disabled="curr === currencyTo"
          v-for="curr in currencyList"
          :key="curr"
          :value="curr"
        >
          {{ curr.toUpperCase() }}
        </option>
      </select>
      <input type="number" v-model.number="amountFrom" @input="convertTo" />
    </div>

    <div>
      <select v-model="currencyTo">
        <option
          :disabled="curr === currencyFrom"
          v-for="curr in currencyList"
          :key="curr"
          :value="curr"
        >
          {{ curr.toUpperCase() }}
        </option>
      </select>
      <input type="number" v-model.number="amountTo" @input="convertFrom" />
    </div>

    <p v-if="isError">Ошибка! Значение должно быть >0</p>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const isError = ref(false);
const currencyList = store.state.currencyList;
const mainCurrency = computed(() => store.state.mainCurrency);

const currencyFrom = ref(mainCurrency.value);
const currencyTo = ref(
  currencyList.filter((item) => item !== mainCurrency.value)[0]
);
const amountFrom = ref(1);
const amountTo = ref(10);

const currencyData = computed(() => store.state.currencyData);

const convertTo = () => {
  const rate =
    currencyData.value[`${currencyFrom.value}-${currencyTo.value}`] || 1;
  if (amountFrom.value * rate <= 0) {
    isError.value = true;
    amountTo.value = 0;
    amountFrom.value = 0;
    return;
  }
  amountTo.value = parseFloat((amountFrom.value * rate).toFixed(2));
  isError.value = false;
};

const convertFrom = () => {
  const rate =
    currencyData.value[`${currencyTo.value}-${currencyFrom.value}`] || 1;
  if (amountTo.value * rate <= 0) {
    isError.value = true;
    amountFrom.value = 0;
    amountTo.value = 0;

    return;
  }
  amountFrom.value = parseFloat((amountTo.value * rate).toFixed(2));
  isError.value = false;
};

watch([currencyFrom, currencyTo], convertTo);
</script>
