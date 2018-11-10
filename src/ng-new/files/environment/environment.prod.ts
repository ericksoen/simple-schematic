export const environment = {
    production: false,
    <%= auth === 'SSO' ?
    `apiRoot: '', // TODO: Your SSO configuration values go here
    stsAuthority: '', // TODO: Your SSO configuration values go here
    clientId: '', // TODO: Your SSO configuration values go here
    clientRoot: '' // TODO: Your SSO configuration values go here`
    : '' %>
}