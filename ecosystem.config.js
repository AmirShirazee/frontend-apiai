module.exports = {
    apps: [{
        name: 'frontend',
        script: 'npm',
        args: 'start',
        env: {
            NODE_ENV: 'production',
            PORT: 8080,
        },
        exec_mode: 'cluster',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        error_file: './logs/err.log',
        out_file: './logs/out.log',
        merge_logs: true,
        time: true
    }]
};
