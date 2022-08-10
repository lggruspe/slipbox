const fs = require("fs/promises");
const { dirname, relative } = require("path");
const { exit } = require("process");

const { analyzeMetafile, build } = require("esbuild");

const copyBoxicons = {
    name: "copyBoxicons",
    setup (build) {
        const boxicons = dirname(dirname(require.resolve("boxicons")));
        const dest = dirname(build.initialOptions.outfile);
        build.onEnd(() => {
            const options = {
                recursive: true,
                filter: path => {
                    const relpath = relative(boxicons, path);
                    return relpath === "" || relpath.startsWith("svg");
                }
            };
            fs.cp(boxicons, dest, options);
        });
    }
};

const copyMathjax = {
    name: "copyMathjax",
    setup (build) {
        const mathjax = dirname(dirname(require.resolve("mathjax")));
        const dest = dirname(build.initialOptions.outfile);
        build.onEnd(() => {
            const options = {
                recursive: true,
                filter: path => {
                    const relpath = relative(mathjax, path);
                    return relpath === "" || relpath.startsWith("es5");
                }
            };
            // NOTE cp is experimental
            fs.cp(mathjax, dest, options);
        });
    }
};

async function main () {
    const result = await build({
        entryPoints: ["src/index.js"],
        bundle: true,
        minify: true,
        outfile: "dist/app.min.js",
        metafile: true,
        format: "esm",
        external: ["mathjax"],
        plugins: [copyBoxicons, copyMathjax]
    });

    const text = await analyzeMetafile(result.metafile);
    console.log(text);
}

main().catch(() => exit(1));
