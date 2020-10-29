export default {
  production: false,
  nationalRegistry: {
    baseSoapUrl: 'https://localhost:8443',
    user: process.env.SOFFIA_USER ?? '',
    password: process.env.SOFFIA_PASS ?? '',
    host: 'soffiaprufa.skra.is',
  },
  userProfile: {
    userProfileServiceBasePath: 'http://localhost:3333',
  },
  identityServer: {
    baseUrl: 'https://siidentityserverweb20200805020732.azurewebsites.net',
    audience: '',
    jwksUri:
      'https://siidentityserverweb20200805020732.azurewebsites.net/.well-known/openid-configuration/jwks',
  },
}