import { USERS, User } from './testUsers';



//exporting all the Users credentilals
export const testUsers = {
    get allUsers(): User[]{
        return USERS;
    }

//     get allUsers() {
//         return process.env.USERS
//     };
//     log(allUsers, 'testUsers.allUsers')      
};

// type User = {
//   username: string;
//   password: string;
// };
// console.log(process.env.USERS, 'process.env.USERS');
// export const testUsers = {
//   get allUsers() {
//     const users = JSON.parse(process.env.USERS || "[]");

//     // if (!users) {
//     //   throw new Error('USERS env variable is not defined');
//     // }

//     return users;
//   },
// };

// // usage
// console.log(testUsers.allUsers, 'testUsers.allUsers');





//base_URL is config on playwrright.ts
export const URLS = {
    LOGIN_PAGE: '/',
    DASHBOARD_PAGE: '/inventory.html',
    CART: '/cart.html',
    CHECKOUT_INFO: '/checkout-step-one.html',
    CHECKOUT_OVERVIEW: '/checkout-step-two.html',
    CHECKOUT_COMPLETE: '/checkout-complete.html'
} as const;


//expected text fo Dashboard page
export const EXPECTED_TEXT = {
    DASHBOARD_TITLE: 'Products',
    APP_LOGO: 'Swag Labs'
} as const;

export const CHECKOUT_DATA = {
    VALID_INFO: {
        firstName: 'John',
        lastName: 'Doe',
        postalCode: '12345'
    },
    MISSING_FIRST_NAME: {
        firstName: '',
        lastName: 'Doe',
        postalCode: '12345'
    },
    MISSING_LAST_NAME: {
        firstName: 'John',
        lastName: '',
        postalCode: '12345'
    },
    MISSING_POSTAL_CODE: {
        firstName: 'John',
        lastName: 'Doe',
        postalCode: ''
    }
} as const;

export const CHECKOUT_ERRORS = {
    FIRST_NAME_REQUIRED: 'Error: First Name is required',
    LAST_NAME_REQUIRED: 'Error: Last Name is required',
    POSTAL_CODE_REQUIRED: 'Error: Postal Code is required',
    ORDER_SUCCESS: 'Thank you for your order!'
} as const;