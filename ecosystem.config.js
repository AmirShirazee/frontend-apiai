module.exports = {
    apps: [{
        name: 'frontend',   // Name of the application
        script: 'npm',      // The command to run the script
        args: 'start',      // Arguments to the script command
        env: {
            NODE_ENV: 'production', // Set the NODE_ENV to 'production'
            PORT: 8080,             // Your Next.js app will run on port 8080
            // You can define other environment variables here as needed
        },
        exec_mode: 'cluster', // Enables cluster mode
        instances: 'max',     // Run as many instances as there are CPU cores
        autorestart: true,    // Automatically restart if the app crashes
        watch: false,         // Do not watch file changes in production
        max_memory_restart: '1G', // Restart the app if it reaches 1GB memory usage
        error_file: './logs/err.log', // Specify error log file location
        out_file: './logs/out.log',   // Specify output log file location
        merge_logs: true,             // Merge all logs in a single stream
        time: true                    // Prefix logs with standard formated timestamp
    }]
};
