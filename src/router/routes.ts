export const routes = {
    home: '*/',
    scanner: '/',
    history: '/history',
    notFound: '*',
    about: '/about',
    users: {
        root: '/users',
        userLink: '/users/user/:id',
        user: (id: number) => `user/${id}`,
    },
    user: {
        root: '/user',
        about: '/user/about',
        history: '/user/history',
    }
};
