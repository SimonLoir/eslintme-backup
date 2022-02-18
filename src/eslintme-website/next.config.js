/**
 * This configuration is inspired by https://medium.com/lagierandlagier/nextjs-webassembly-and-web-workers-a5f7c19d4fd0
 * Because the WebWorker was not loaded in the production builds.
 */

//const SSRPlugin =
//    require('next/dist/build/webpack/plugins/nextjs-ssr-import').default;
//const { dirname, relative, resolve, join } = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    //webpack(config) {
    //    // Ensures that web workers can import scripts.
    //    config.output.publicPath = '/_next/';
    //
    //    // From https://github.com/vercel/next.js/issues/22581#issuecomment-864476385
    //    const ssrPlugin = config.plugins.find(
    //        (plugin) => plugin instanceof SSRPlugin
    //    );
    //
    //    if (ssrPlugin) {
    //        patchSsrPlugin(ssrPlugin);
    //    }
    //
    //    return config;
    //},
};

/*function patchSsrPlugin(plugin) {
    plugin.apply = function apply(compiler) {
        compiler.hooks.compilation.tap('NextJsSSRImport', (compilation) => {
            compilation.mainTemplate.hooks.requireEnsure.tap(
                'NextJsSSRImport',
                (code, chunk) => {
                    // The patch that we need to ensure this plugin doesn't throw
                    // with WASM chunks.
                    if (!chunk.name) {
                        return;
                    }

                    // Update to load chunks from our custom chunks directory
                    const outputPath = resolve('/');
                    const pagePath = join('/', dirname(chunk.name));
                    const relativePathToBaseDir = relative(
                        pagePath,
                        outputPath
                    );
                    // Make sure even in windows, the path looks like in unix
                    // Node.js require system will convert it accordingly
                    const relativePathToBaseDirNormalized =
                        relativePathToBaseDir.replace(/\\/g, '/');
                    return code
                        .replace(
                            'require("./"',
                            `require("${relativePathToBaseDirNormalized}/"`
                        )
                        .replace(
                            'readFile(join(__dirname',
                            `readFile(join(__dirname, "${relativePathToBaseDirNormalized}"`
                        );
                }
            );
        });
    };
}
*/
