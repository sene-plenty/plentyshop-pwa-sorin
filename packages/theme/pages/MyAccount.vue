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
          <SfMyProfile
            :account="user"
            data-testid="my-profile-tabs"
            @update:personal="user = { ...user, ...$event }"
            @update:password="changePassword({ currentUser: user, current: $event.currentPassword, new: $event.newPassword })"
          />
        </SfContentPage>

        <SfContentPage title="Shipping details">
          <PsfAddressDetails
            :addresses="shipping"
            :countries="countries"
            data-testid="shipping-details-tabs"
            @set-default-address="setDefaultShipping({address: $event })"
            @delete-address="deleteShipping({address: $event})"
            @update:shipping="addShipping({address: $event})"
          />
        </SfContentPage>

        <SfContentPage title="Billing details">
          <PsfAddressDetails
            :shipping-tab-title="'Billing details'"
            :addresses="billing"
            :countries="countries"
            data-testid="shipping-details-tabs"
            @set-default-address="setDefaultBilling({address: $event })"
            @delete-address="deleteBilling({address: $event})"
            @update:shipping="addBilling({address: $event})"
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
import BillingDetails from './MyAccount/BillingDetails';
import MyNewsletter from './MyAccount/MyNewsletter';
import OrderHistory from './MyAccount/OrderHistory';
import PsfAddressDetails from '../components/MyAccount/PsfAddressDetails';
import SfMyProfile from '../components/MyAccount/SfMyProfile.vue';
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
    SfMyProfile,
    BillingDetails,
    PsfAddressDetails,
    MyNewsletter,
    OrderHistory
  },
  middleware: [
    'is-authenticated'
  ],
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();

    const { user, load: loadUser, logout, changePassword } = useUser();
    const { load: loadBilling, addAddress: addBilling, deleteAddress: deleteBilling, billing, setDefaultAddress: setDefaultBilling } = useUserBilling();
    const { load: loadShipping, addAddress: addShipping, deleteAddress: deleteShipping, shipping, setDefaultAddress: setDefaultShipping } = useUserShipping();
    const { load: loadActiveShippingCountries, result: countries } = useActiveShippingCountries();
    const isMobile = computed(() => mapMobileObserver().isMobile.get());

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

    return { activePage, billing, shipping, countries, user, changeActivePage, deleteShipping, deleteBilling, addBilling, addShipping, setDefaultShipping, setDefaultBilling, changePassword};
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
