import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import path from 'path';
import { getPackagesSync } from '@lerna/project';
import vue  from 'rollup-plugin-vue'

// 拿到package.json 找到名字以@z-ui开头的
const inputs = getPackagesSync().map(pck => pck.name).filter(name => name.includes('@g-ui'));
export default inputs.map(name => {
    const pckName = name.split('@g-ui')[1]
    return {
        input: path.resolve(__dirname, `../packages/${pckName}/index.ts`),
        output: {
            format: 'es',
            file: `lib/${pckName}/index.js`,
        },
        plugins: [
            nodeResolve(),
            vue({
                target: 'browser'
            }),
            typescript({
                tsconfigOverride: {
                    compilerOptions: { // 打包单个组件的时候不生成ts声明文件
                        declaration: false,
                    },
                    exclude: [
                        'node_modules'
                    ],
                }
            })
        ],
        external(id) { // 对vue本身 和 自己写的包 都排除掉不打包
            return /^vue/.test(id) ||  /^@g-ui/.test(id)
        },
    }
})