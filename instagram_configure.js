Template.configureLoginServiceDialogForInstagram.helpers({
  siteUrl: function () {
    return Meteor.absoluteUrl();
  }
});

Template.configureLoginServiceDialogForInstagram.fields = function () {
  return [
    {property: 'clientId', label: 'Client ID'},
    {property: 'clientSecret', label: 'Client Secret'}
  ];
};
