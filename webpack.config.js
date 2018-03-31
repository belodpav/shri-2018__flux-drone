const ENV_MODE = process.env.MODE;
const itIs = {
    name: {
        min: 'fluxDrone.min.js',
        dev: 'fluxDrone.js'
    }
};

let build = {};

build.mode = ENV_MODE;
build.isProduction = build.mode === 'production';
build.watch = !build.isProduction;

if (build.isProduction) {
    build.bundle = itIs.name.min;
} else {
    build.bundle = itIs.name.dev;
}


module.exports = {
    mode: build.mode,
    entry: './src/index.js',
    output: {
        filename: build.bundle
    },
    watch: build.watch,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            }
        ]
    }
};
