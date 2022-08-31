<template>
  <div>
    <SfHeading
      v-e2e="'login-heading'"
      :level="3"
      :title="$t('Login')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <p class="customer__text">
      Sie können sich bei Ihrem Konto anmelden oder ein neues registrieren.
    </p>
    <SfButton
            type="button"
            class="sf-button summary__back-button"
            @click="router.push('/checkout/billing')"
          >
            {{ $t('Login Register') }}
    </SfButton>
    <hr>
    <p class="customer__text">
      Sie können sich bei Ihrem Konto anmelden oder ein neues registrieren.
    </p>
    <SfButton
            type="button"
            class="sf-button summary__back-button"
            @click="router.push('/checkout/billing')"
          >
            {{ $t('Continue as guest') }}
    </SfButton>
  </div>
</template>
<script>
import { ref, watch, reactive, computed, useRouter, useContext } from '@nuxtjs/composition-api';
import { SfHeading, SfInput, SfButton, SfCheckbox, SfLoader, SfAlert, SfBar } from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import { useUser, useForgotPassword } from '@vue-storefront/plentymarkets';
import { useUiState } from '~/composables';

extend('email', {
  ...email,
  message: 'Invalid email'
});

extend('required', {
  ...required,
  message: 'This field is required'
});

export default {
  name: 'LoginModal',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfCheckbox,
    SfLoader,
    SfAlert,
    ValidationProvider,
    ValidationObserver,
    SfBar
  },
  setup() {
    const SCREEN_LOGIN = 'login';
    const SCREEN_REGISTER = 'register';
    const SCREEN_THANK_YOU = 'thankYouAfterForgotten';
    const SCREEN_FORGOTTEN = 'forgottenPassword';

    const { isLoginModalOpen, toggleLoginModal } = useUiState();
    const form = ref({});
    const userEmail = ref('');
    const createAccount = ref(false);
    const rememberMe = ref(false);
    const { register, login, loading, error: userError } = useUser();
    const { request, error: forgotPasswordError, loading: forgotPasswordLoading } = useForgotPassword();
    const currentScreen = ref(SCREEN_REGISTER);
    const router = useRouter();
    const context = useContext();

    const error = reactive({
      login: null,
      register: null
    });

    const resetErrorValues = () => {
      error.login = null;
      error.register = null;
    };

    const barTitle = computed(() => {
      switch (currentScreen.value) {
        case SCREEN_LOGIN:
          return 'Sign in';
        case SCREEN_REGISTER:
          return 'Register';
        default:
          return 'Reset Password';
      }
    });

    watch(isLoginModalOpen, () => {
      if (isLoginModalOpen) {
        form.value = {};
        resetErrorValues();
      }
    });

    const setCurrentScreen = (screenName) => {
      resetErrorValues();
      currentScreen.value = screenName;
    };

    const handleForm = (fn) => async () => {
      resetErrorValues();
      await fn({ user: form.value });

      const hasUserErrors = userError.value.register || userError.value.login;

      if (hasUserErrors) {
        error.login = userError.value.login?.message;
        error.register = userError.value.register?.message;
        return;
      }
      router.push(context.app.localePath({ name: 'billing' }));
    };

    const closeModal = () => {
      resetErrorValues();
      setCurrentScreen(SCREEN_LOGIN);
      toggleLoginModal();
    };

    const handleRegister = async () => handleForm(register)();

    const handleLogin = async () => handleForm(login)();

    const handleForgotten = async () => {
      userEmail.value = form.value.username;
      await request({ email: userEmail.value });

      if (!forgotPasswordError.value.request) {
        setCurrentScreen(SCREEN_THANK_YOU);
      }
    };

    return {
      form,
      error,
      userError,
      loading,
      createAccount,
      rememberMe,
      isLoginModalOpen,
      toggleLoginModal,
      handleLogin,
      handleRegister,
      forgotPasswordError,
      forgotPasswordLoading,
      handleForgotten,
      closeModal,
      userEmail,
      barTitle,
      currentScreen,
      setCurrentScreen,
      SCREEN_LOGIN,
      SCREEN_REGISTER,
      SCREEN_THANK_YOU,
      SCREEN_FORGOTTEN
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}

.form {
  margin-top: var(--spacer-sm);
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
  }
}
.action {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6 var(--font-family--secondary);
  & > * {
    margin: 0 0 0 var(--spacer-xs);
  }
}
.action {
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
}
.checkbox {
  margin-bottom: var(--spacer-2xl);
}
.bottom {
  text-align: center;
  margin-bottom: var(--spacer-lg);
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight--semibold);
  font-family: var(--font-family--secondary);
  &__paragraph {
    color: var(--c-primary);
    margin: 0 0 var(--spacer-base) 0;
    @include for-desktop {
      margin: 0;
    }
  }
}
.thank-you {
  &__paragraph {
    &--bold {
      font-weight: var(--font-weight--semibold);
    }
  }
}
</style>
