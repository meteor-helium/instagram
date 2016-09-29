Instagram = {};

// Request Instagram credentials for the user
//
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Instagram.requestCredential = function(options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'instagram'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError());
    return;
  }

  var credentialToken = Random.secret();

  var loginStyle = OAuth._loginStyle('instagram', config, options);
  
  let scope = "basic";
  if (options && options.requestPermissions)
    scope = options.requestPermissions.join('+');

  var loginUrl =
    'https://api.instagram.com/oauth/authorize/?client_id=' + config.clientId +
    '&redirect_uri=' + OAuth._redirectUri('instagram', config) +
    '&response_type=code' +
    '&state=' + OAuth._stateParam(loginStyle, credentialToken, options && options.redirectUrl) +
    '&scope=' scope

  OAuth.launchLogin({
    loginService: "instagram",
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken
  });
};
