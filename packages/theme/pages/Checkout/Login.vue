<template>
  <div>
    <PsfPersonalDetails
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
    />
    <SfButton
        type="button"
        class="sf-button color-secondary summary__back-button"
        @click="goToBilling"
      >
      {{ $t('Go to billing') }}
    </SfButton>
    </div>
</template>
<script>
import { useRouter, watch } from '@nuxtjs/composition-api';
import { SfButton } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useUser } from '@vue-storefront/plentymarkets';
import PsfPersonalDetails from '~/components/Checkout/PsfPersonalDetails';

export default {
  name: 'Login',
  components: {
    SfButton,
    PsfPersonalDetails
  },
  setup() {

    const { isLoginModalOpen, toggleLoginModal } = useUiState();
    const router = useRouter();
    const { isAuthenticated, register } = useUser();
    let user = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    };

    watch(isAuthenticated, () => {
      if (isAuthenticated) {
        router.push('/checkout/billing');
      }
    });

    const logInput = (event) => {
      console.log(event);
      user = event;
    };

    const goToBilling = async () => {
      console.log({ user });
      await register({ user });
      router.push('/checkout/billing');
    };

    return {
      router,
      isAuthenticated,
      isLoginModalOpen,
      toggleLoginModal,
      logInput,
      goToBilling
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
