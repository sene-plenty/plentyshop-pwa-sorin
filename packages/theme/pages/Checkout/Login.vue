<template>
  <div>
    <SfPersonalDetails
      :value="{}"
      buttonText="Log into your account"
      logInInfo="or fill the details below:"
      headingTitle="Personal details"
      :headingTitleLevel="2"
      :inputsLabels='["First name","Last name","Your email"]'
      additionalDetails="Enjoy these perks with your free account!"
      :characteristics='[{"description":"Faster checkout","icon":"clock","size":"24px"},{"description":"Earn credits with every purchase","icon":"credits","size":"24px"},{"description":"Full rewards program benefits","icon":"rewards","size":"24px"},{"description":"Manage your wishlist","icon":"heart","size":"24px"}]'
      transition="sf-fade"
      createAccountCheckboxLabel="I want to create an account"
      createAccountInputLabel="Create Password"
      @input="logInput($event)"
      @log-in="toggleLoginModal()"
      @create-account=""
    />
    <SfButton
        type="button"
        class="sf-button color-secondary summary__back-button"
        @click="router.push('/checkout/billing')"
      >
      {{ $t('Go to shipping') }}
    </SfButton>
    </div>
</template>
<script>
import { useRouter, watch } from '@nuxtjs/composition-api';
import { SfButton, SfPersonalDetails } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useUser } from '@vue-storefront/plentymarkets';

export default {
  name: 'Login',
  components: {
    SfButton,
    SfPersonalDetails
  },
  setup() {

    const { isLoginModalOpen, toggleLoginModal } = useUiState();
    const router = useRouter();
    const { isAuthenticated } = useUser();

    watch(isAuthenticated, () => {
      if (isAuthenticated) {
        router.push('/checkout/billing');
      }
    });

    const logInput = (event) => {
      console.log(event);
    };

    return {
      router,
      isAuthenticated,
      isLoginModalOpen,
      toggleLoginModal,
      logInput
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
