import { AgnosticPagination, UserOrderGetters } from '@vue-storefront/core';
import type { GetOrdersResponse, Order, OrderItem } from '@vue-storefront/plentymarkets-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDate(order: Order): string {
  if (order && order.order) {
    return new Date(order.order.createdAt).toLocaleString();
  }

  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getId(order: Order): string {
  return order.order?.id.toString() || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getStatus(order: Order): string {
  return order?.order?.statusName || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPrice(order: Order): number | null {
  return order?.order?.amounts[0]?.grossTotal || 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItems(order: Order): OrderItem[] {
  return order.order.orderItems || [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemSku(item: OrderItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemName(item: OrderItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemQty(item: OrderItem): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemPrice(item: OrderItem): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return '';
}

// eslint-disable-next-line
function getOrdersTotal(orders: any): number {
  console.log(orders);
  return orders?.length || 0;
}

function getPagination(params: GetOrdersResponse): AgnosticPagination {
  console.log('pag: ', params);
  const totalPages = params?.data?.lastPageNumber || 1;
  const pageOptions = [params?.data?.itemsPerPage] || [10];
  const totalItems = params?.data?.totalsCount || 1;
  const currentPage = params?.data?.page || 1;
  const itemsPerPage = params?.data?.itemsPerPage || 10;

  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    pageOptions
  };
}

export const orderGetters: UserOrderGetters<Order, OrderItem> = {
  getDate,
  getId,
  getStatus,
  getPrice,
  getItems,
  getItemSku,
  getItemName,
  getItemQty,
  getItemPrice,
  getFormattedPrice,
  getOrdersTotal,
  getPagination
};
