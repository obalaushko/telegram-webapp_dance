export const routes = {
    home: '*/',
    scanner: '/',
    history: '/history',
    notFound: '*',
    about: '/about',
    settings: {
        root: '/settings',
        userLink: '/settings/user/:id',
        user: (id: number) => `user/${id}`,
    },
};
