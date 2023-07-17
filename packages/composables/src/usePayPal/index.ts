import {useVSFContext, sharedRef} from '@vue-storefront/core';
import { loadScript as loadPayPalScript, PayPalNamespace } from '@paypal/paypal-js';
import {
  PayPalApproveOrder,
  PayPalCreateOrder,
  PayPalExecutePayment
} from '@vue-storefront/plentymarkets-api';
import { paypalGetters } from '../getters/paypalGetters';

export interface UsePayPalResponse {
  createOrder: (fundingSource: string) => Promise<PayPalCreateOrder>
  approveOrder: (orderID: string, payerID: string) => Promise<PayPalApproveOrder>
  executePayPalOrder: (mode: string, orderID: number, payPalOrderID: string, merchantID: string) => Promise<PayPalExecutePayment>
  loadScript: (currency: string) => Promise<PayPalNamespace>
}

export const usePayPal = () : UsePayPalResponse => {
  const context = useVSFContext();
  const paypal = sharedRef<PayPalNamespace>(null, 'usePaypal-paypalsdk');

  const createOrder = async (fundingSource: string): Promise<PayPalCreateOrder> => {
    return await context.$plentymarkets.api.createOrder(fundingSource);
  };

  const approveOrder = async (orderID: string, payerID: string): Promise<PayPalApproveOrder> => {
    return await context.$plentymarkets.api.approveOrder(orderID, payerID);
  };

  const executePayPalOrder = async (mode: string, orderID: number, payPalOrderID: string, merchantID = ''): Promise<PayPalExecutePayment> => {
    return await context.$plentymarkets.api.executePayPalOrder(mode, orderID, payPalOrderID, merchantID);
  };

  const loadScript = async (currency: string): Promise<PayPalNamespace> => {
    if (paypal.value) {
      return paypal.value;
    }

    if (paypalGetters.getConfig()) {
      try {
        // TODO get client id somehow
        paypal.value = await loadPayPalScript({ clientId: paypalGetters.getClientId(), currency: currency });
        return paypal.value;
      } catch (error) {
        // console.error('failed to load the PayPal JS SDK script', error);
      }
    }

    return null;
  };

  return {
    approveOrder,
    createOrder,
    executePayPalOrder,
    loadScript
  };
};
