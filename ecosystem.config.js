module.exports = {
  apps : [
    {
      name: 'mumble',
      script: 'src/mumble.js',
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      args: '',
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: '256M',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'odaslive',
      script: '~/Downloads/odas/bin/odaslive -c ~/Downloads/odas/config/odaslive/respeaker_4_mic_array.cfg',
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      args: '',
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: '512M',
    }
  ],

  deploy : {
    production : {
      user : 'pi',
      host : ['tr1n1'],
      ref  : 'origin/master',
      repo : 'git@github.com:bixcoita/mumble.git',
      path : '/home/pi/Downloads/mumble',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
