<template>
  <div>
    <SfHeading
      v-e2e="'login-heading'"
      :level="3"
      :title="$t('Login')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <p class="customer__text">
      {{ $t('Login Register Text') }}
    </p>
    <SfButton
            type="button"
            class="sf-button"
            @click="toggleLoginModal()"
          >
            {{ $t('Login Register') }}
    </SfButton>
    <hr class="sf-divider customer-text">
    <SfButton
            type="button"
            class="sf-button"
            @click="router.push('/checkout/billing')"
          >
            {{ $t('Continue as guest') }}
    </SfButton>
  </div>
</template>
<script>
import { reactive, useRouter, watch } from '@nuxtjs/composition-api';
import { SfHeading, SfButton } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useUser } from '@vue-storefront/plentymarkets';

export default {
  name: 'Login',
  components: {
    SfHeading,
    SfButton
  },
  setup() {

    const { isLoginModalOpen, toggleLoginModal } = useUiState();
    const router = useRouter();
    const { isAuthenticated } = useUser();

    const error = reactive({
      login: null,
      register: null
    });

    watch(isAuthenticated, () => {
      if (isAuthenticated) {
        router.push('/checkout/billing');
      }
    });

    return {
      router,
      error,
      isLoginModalOpen,
      toggleLoginModal
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}

.customer-text {
  margin: var(--spacer-lg) 0 var(--spacer-lg) 0;
}
</style>
