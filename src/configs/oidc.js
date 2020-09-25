const host = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');

// mock oidc
const config = {
  authority: '',
  client_id: '',
  redirect_uri: `${host}/auth/callback`,
  response_type: '',
  scope: '',
  silent_redirect_uri: `${host}/silent`,
  automaticSilentRenew: '',
  post_logout_redirect_uri: `${host}/auth/logout`,
};

console.log('OIDC config', config);

export default config;
