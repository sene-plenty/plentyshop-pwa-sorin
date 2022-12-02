<template>
  <div id="my-account">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <SfContentPages
      v-e2e="'my-account-content-pages'"
      title="My Account"
      :active="activePage"
      class="my-account"
      @click:change="changeActivePage"
    >
      <SfContentCategory title="Personal Details">
        <SfContentPage title="My profile">
          <MyProfile />
        </SfContentPage>

        <SfContentPage title="Shipping details">
          <SfShippingDetails
            :account="shippingAccount"
            :countries="countries"
            data-testid="shipping-details-tabs"
            @delete-address="deleteAddress($event, 2)"
            @update:shipping="addAddress($event, 2)"
          />
        </SfContentPage>

        <SfContentPage title="Billing details">
          <SfShippingDetails
            :shipping-tab-title="'Billing details'"
            :account="billingAccount"
            :countries="countries"
            data-testid="shipping-details-tabs"
            @update:shipping="{}"
          />
        </SfContentPage>

        <SfContentPage title="My newsletter">
          <MyNewsletter />
        </SfContentPage>
      </SfContentCategory>

      <SfContentCategory title="Order details">
        <SfContentPage title="Order history">
          <OrderHistory />
        </SfContentPage>
      </SfContentCategory>

      <SfContentPage title="Log out" />
    </SfContentPages>
  </div>
</template>
<script>
import { SfBreadcrumbs, SfContentPages } from '@storefront-ui/vue';
import { computed, onBeforeUnmount, useRoute, useRouter } from '@nuxtjs/composition-api';
import { useUser, useActiveShippingCountries, useUserBilling, useUserShipping } from '@vue-storefront/plentymarkets';
import MyProfile from './MyAccount/MyProfile';
import BillingDetails from './MyAccount/BillingDetails';
import MyNewsletter from './MyAccount/MyNewsletter';
import OrderHistory from './MyAccount/OrderHistory';
import SfShippingDetails from '../components/MyAccount/SfShippingDetails';
import { onSSR } from '@vue-storefront/core';
import {
  mapMobileObserver,
  unMapMobileObserver
} from '@storefront-ui/vue/src/utilities/mobile-observer.js';

export default {
  name: 'MyAccount',
  components: {
    SfBreadcrumbs,
    SfContentPages,
    MyProfile,
    BillingDetails,
    SfShippingDetails,
    MyNewsletter,
    OrderHistory
  },
  middleware: [
    'is-authenticated'
  ],
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();

    const { user, load: loadUser, logout } = useUser();
    const { load: loadBilling, billing } = useUserBilling();
    const { load: loadShipping, addAddress: addShipping, deleteAddress: deleteShipping, shipping } = useUserShipping();
    const { load: loadActiveShippingCountries, result: countries } = useActiveShippingCountries();
    const isMobile = computed(() => mapMobileObserver().isMobile.get());

    const shippingAccount = computed(() => {
      return {
        shipping: shipping.value,
        ...user.value
      };
    });

    const billingAccount = computed(() => {
      return {
        shipping: billing.value,
        ...user.value
      };
    });

    const activePage = computed(() => {
      const { pageName } = route.value.params;

      if (pageName) {
        return (pageName.charAt(0).toUpperCase() + pageName.slice(1)).replace('-', ' ');
      } else if (!isMobile.value) {
        return 'My profile';
      } else {
        return '';
      }
    });

    onSSR(async () => {
      await loadUser();
      await loadBilling();
      await loadShipping();
      await loadActiveShippingCountries();

    });

    const addAddress = async (address, typeId) => {
      if (typeId === 2) {
        console.log(address);
        addShipping({address: address});
      }
    };

    const deleteAddress = async (address, typeId) => {
      if (typeId === 2) {
        deleteShipping({address: address});
      }
    };

    const changeActivePage = async (title) => {
      if (title === 'Log out') {
        await logout();
        window.location.reload();
      }

      const slugifiedTitle = (title || '').toLowerCase().replace(' ', '-');
      const transformedPath = `/my-account/${slugifiedTitle}`;
      const localeTransformedPath = context.root.localePath(transformedPath);

      router.push(localeTransformedPath);
    };

    onBeforeUnmount(() => {
      unMapMobileObserver();
    });

    return { changeActivePage, activePage, shippingAccount, billingAccount, countries, deleteAddress, addAddress };
  },

  data() {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          route: { link: '#' }
        },
        {
          text: 'My Account',
          route: { link: '#' }
        }
      ]
    };
  }
};
</script>

<style lang='scss' scoped>
#my-account {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.my-account {
  @include for-mobile {
    --content-pages-sidebar-category-title-font-weight: var(
      --font-weight--normal
    );
    --content-pages-sidebar-category-title-margin: var(--spacer-sm)
      var(--spacer-sm) var(--spacer-sm) var(--spacer-base);
  }
  @include for-desktop {
    --content-pages-sidebar-category-title-margin: var(--spacer-xl) 0 0 0;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) 0 var(--spacer-lg);
}
</style>
