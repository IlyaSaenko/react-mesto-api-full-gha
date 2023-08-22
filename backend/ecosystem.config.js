module.exports = {
  apps: [{
    script: 'api.js',
  }, {
    script: 'worker.js',
  }],

  // Deployment Configuration
  deploy: {
    production: {
      user: 'saenko',
      host: '51.250.85.86',
      ref: 'origin/main',
      repo: 'git@github.com:IlyaSaenko/react-mesto-api-full-gha.git',
      path: '/home/saenko/auto-deploy',
      'post-deploy': 'cd backend',
    },
  },
};
