export enum ROUTES_TYPE {
  management = '/management',
  cms = '/cms',
  auth = '/auth',
  dashboard = '/dashboard',
  profile = '/profile',
}
export const ROUTES = {
  dashboard: ROUTES_TYPE.dashboard,
  management: {
    user: {
      provider: {
        list: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/user/provider/list`,
        edit: (id: string) =>
          `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/user/provider/edit/${id}`,
        view: (id: string) =>
          `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/user/provider/view/${id}`,
      },
      customer: {
        list: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/user/customer/list`,
        edit: (id: string) =>
          `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/user/customer/edit/${id}`,
        view: (id: string) =>
          `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/user/customer/view/${id}`,
      },
    },
    services: {
      list: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/services/list`,
      add: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/services/create`,
      edit: (id: string) => `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/services/edit/${id}`,
    },
    products: {
      list: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/products/list`,
      add: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/products/create`,
      detail: (id: string) =>
        `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/products/detail/${id}`,
      edit: (id: string) => `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/products/edit/${id}`,
    },
    reviews: {
      list: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/reviews/list`,
    },
    category: {
      list: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/category/list`,
      add: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/category/add`,
      edit: (id: string) => `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/category/edit/${id}`,
      subCategory: (id: string) =>
        `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/category/sub-category/${id}`,
    },
    offers: {
      list: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/offers/list`,
      add: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/offers/create`,
      edit: (id: string) => `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/offers/edit/${id}`,
    },
    orders: {
      list: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/orders/list`,

      details: (id: string) =>
        `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/orders/details/${id}`,
    },
  },
  cms: {
    general: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.cms}/general`,
    contact: {
      list: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.cms}/contact-us/list`,
      add: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.cms}/contact-us/create`,
      edit: (id: string) => `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.cms}/contact-us/edit/${id}`,
      details: (id: string) =>
        `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.cms}/contact-us/details/${id}`,
    },
    privacyPolicy: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.cms}/privacy-policy`,
    termsConditions: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.cms}/terms-conditions`,
    faq: {
      faq: {
        list: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.cms}/faq/faq/list`,
        add: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.cms}/faq/faq/create`,
        edit: (id: string) => `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.cms}/faq/faq/edit/${id}`,
      },
      faqCategory: {
        list: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.cms}/faq/faq-category/list`,
        add: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.cms}/faq/faq-category/create`,
        edit: (id: string) =>
          `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.cms}/faq/faq-category/edit/${id}`,
      },
    },
  },
  auth: {
    login: `${ROUTES_TYPE.auth}/login`,
    signup: `${ROUTES_TYPE.auth}/sign-up`,
    forgetPassword: `${ROUTES_TYPE.auth}/forget-password`,
  },
  profile: {
    profile: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.profile}`,
  },
  seo: {
    list: `${ROUTES_TYPE.dashboard}/seo/list`,
    details: (id: string) => `${ROUTES_TYPE.dashboard}/seo/edit/${id}`,
  },
  payments: {
    list: `${ROUTES_TYPE.dashboard}/payments/list`,
    details: (id: string) => `${ROUTES_TYPE.dashboard}/payments/detail/${id}`,
  },
};
