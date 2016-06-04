Instagram = {};


OAuth.registerService('instagram', 2, null, function(query) {

  var response = getTokenResponse(query);
  var accessToken = response.accessToken;
  var user = response.user;
  var uid = response.uid;

  var serviceData = {
    id: uid,
    accessToken: accessToken,
    user: user,
    // Instagram accessToken never expires. It becomes invalid only when revoked by user.
    // Set this value to a long time in future. (10 years maybe?)
    expiresAt: (+new Date) + (1000 * 60 * 60 * 24 * 365 * 10)
  };

  return {
    serviceData: serviceData,
    options: {profile: {name: user.full_name}}
  };
});


// returns an object containing:
// - accessToken
// - user (Instagram user details)
// - uid (Instagram user ID)
var getTokenResponse = function (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'instagram'});
  if (!config)
    throw new ServiceConfiguration.ConfigError();

  var responseContent;
  try {
    // Request an access token
    responseContent = HTTP.post(
      "https://api.instagram.com/oauth/access_token", {
        params: {
          client_id: config.clientId,
          client_secret: OAuth.openSecret(config.clientSecret),
          grant_type: 'authorization_code',
          redirect_uri: OAuth._redirectUri('instagram', config),
          code: query.code
        }
      }).data;
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with Instagram. " + err.message),
      {response: err.response});
  }

  // Success!
  return {
    accessToken: responseContent.access_token,
    user: responseContent.user,
    uid: responseContent.user.id
  };
};

Instagram.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
