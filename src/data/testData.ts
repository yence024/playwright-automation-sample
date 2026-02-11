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
    DASHBOARD_PAGE: '/inventory.html'
} as const;


//expected text fo Dashboard page
export const EXPECTED_TEXT = {
    DASHBOARD_TITLE: 'Products',
    APP_LOGO: 'Swag Labs'
} as const;