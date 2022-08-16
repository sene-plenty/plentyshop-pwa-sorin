<template>
    <div>
      <div>{{ selectedVariationId }}</div>
        <SfSelect
            class="sf-select--underlined product__select-size"
            v-e2e="'size-select'"
            v-for="(option, key) in options"
            @input="optionValueKey => selectOption(key, optionValueKey)"
            :key="key"
            :label="option.label"
            :value="selectedAttributes[key]"
            :required="true"
            :disabled="loading"
            >
            <SfSelectOption
                v-for="(optionValue, valueKey) in option.value"
                :key="valueKey"
                :value="valueKey"
                :disabled="loading"
            >
                {{optionValue}}
            </SfSelectOption>
        </SfSelect>

        <SfSelect
        class="sf-select--underlined product__select-size"
        v-e2e="'content-select'"
        :label="$t('content')"
        :required="true"
        v-model="selectedUnit"
        @input="optionValueKey => selectOption()"
        >
            <SfSelectOption
                v-for="(unitName, unitCombinationId) in units"
                :key="unitCombinationId"
                :value="unitCombinationId"
            >
                {{ unitName }}
            </SfSelectOption>
        </SfSelect>

        <p v-if="!selectedVariationId">{{ $t('productPleaseSelectVariation') }}</p>
    </div>
</template>

<script>
import Vue from 'vue';
import { SfSelect } from '@storefront-ui/vue';
import { productGetters, useProduct } from '@vue-storefront/plentymarkets';
import { computed, reactive, ref, watch } from '@vue/composition-api';

export default {
  name: 'AttributeSelection',
  setup(props, context) {
    const { products, loading } = useProduct('products');
    const product = computed(() => productGetters.getFiltered(products.value, { })[0]);

    const options = computed(() => productGetters.getAttributes(products.value, ['color', 'size']));
    const units = computed(() => productGetters.getUnits(products.value));

    const selectedAttributes = reactive({});
    const selectedUnit = ref(null);

    const selectedVariationId = computed(() => productGetters.getVariationIdForAttributes(product.value, selectedAttributes, selectedUnit.value));

    const preselectAttributes = () => {
      if (product.value?.variationAttributeMap) {
        // set attributes
        for (const attribute of product.value.attributes) {
          Vue.set(selectedAttributes, attribute.attributeId, attribute.valueId.toString());
        }

        // set unit
        const variation = product.value.variationAttributeMap.variations.find(variation =>
          variation.variationId === product.value.variation.id);

        if (variation) {
          selectedUnit.value = variation.unitCombinationId.toString();
        }
      }
    };

    const selectOption = (attributeId, attributeValueId) => {
      if (attributeId && attributeValueId) {
        Vue.set(selectedAttributes, attributeId, attributeValueId);
      }
    };

    if (!loading.value) {
      preselectAttributes();
    } else {
      watch(loading, (value, oldValue) => {
        if (!value && oldValue) {
          preselectAttributes();
        }
      });
    }

    watch(selectedVariationId, (value) => {
      context.emit('selection-changed', value);
    });

    return {
      options,
      units,
      selectedAttributes,
      selectedUnit,
      selectOption,
      selectedVariationId,
      loading
    };
  },
  components: {
    SfSelect
  }
};
</script>
