export const environment = {
    production: false,
    <%= auth === 'SSO' ?
    `apiRoot: 'http://localhost:2112/api',
    stsAuthority: 'http://localhost:5000',
    clientId: 'spa-client',
    clientRoot: 'http://localhost:4200/'` : '' %>
};