// Declare consts for Auth0 details reqired in this app
const CREATE_PRODUCT = "create:products";
const READ_PRODUCT = "read:products";
const UPDATE_PRODUCT = "update:products";
const DELETE_PRODUCT = "delete:products";

// The Auth0 id for this app
const AUTH0_CLIENT_ID = 'ETYqjS2kgRZO9llOoDqZ1NIK1SsX2gWF';

// Your Auth0 domain aka account/ tenant
const AUTH0_DOMAIN = 'dev-gud41elv.us.auth0.com';

// Users of this app require access to the API, identified by...
// This value is the 'Identifier' in your API settings 
const AUDIENCE = 'https://productsapi.com';

// Where Auth0 should return the token to after authentication
const AUTH0_CALLBACK_URL = 'http://localhost:3000';

// Initialise Auth0 connection with parameters defined above
const auth0WebAuth = new auth0.WebAuth({
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID,
  redirectUri: AUTH0_CALLBACK_URL,
  responseType: 'id_token token',
  audience: AUDIENCE
});

const auth0Authentication = new auth0.Authentication(auth0WebAuth, {
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID
});