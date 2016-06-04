Package.describe({
  name: 'helium:instagram',
  version: '1.0.0',
  summary: 'Instagram OAuth flow',
  git: 'https://github.com/meteor-helium/instagram.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2");

  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use('templating', 'client');
  api.use('underscore', 'server');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.export('Instagram');

  api.addFiles(
    ['instagram_configure.html', 'instagram_configure.js'],
    'client');

  api.addFiles('instagram_server.js', 'server');
  api.addFiles('instagram_client.js', 'client');
});
