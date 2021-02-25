/*
 */
module.exports = {
    base: '/documents/',
    dest: '/docs',
    title: 'Mojo Lang',
    description: 'Mojo document',
    locales: {
        '/': {
            lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
            title: 'Mojo Lang',
            description: 'Mojo Document'
        },
        '/zh_CN/': {
            lang: 'zh-CN',
            title: 'Mojo 语言',
            description: 'Mojo 文档'
        },
    },
    themeConfig: {
        locales: {
            '/': {
                // 多语言下拉菜单的标题
                selectText: 'Select Language',
                // 该语言在下拉菜单中的标签
                label: 'English',
                // 编辑链接文字
                editLinkText: '在 GitHub 上编辑此页',
                lastUpdated: 'Last Updated',
            },
            '/zh_CN/': {
                // 多语言下拉菜单的标题
                selectText: '选择语言',
                // 该语言在下拉菜单中的标签
                label: '简体中文',
                // 编辑链接文字
                editLinkText: '在 GitHub 上编辑此页',
                lastUpdated: '上次更新',
                
                // Service Worker 的配置
                serviceWorker: {
                    updatePopup: {
                        message: "发现新内容可用.",
                        buttonText: "刷新"
                    }
                },

                // 当前 locale 的 algolia docsearch 选项
                algolia: {},
                nav: [
                    { text: '语言介绍', link: '/zh_CN/chapter_01_introduce/' },
                    { text: '语言参考', link: '/zh_CN/chapter_05_reference/' },
                ],
                // sidebarDepth: 2,
                displayAllHeaders: true,
                sidebar: [
                    {
                        title: '语言介绍', // 必要的
                        path: '/zh_CN/chapter_01_introduce/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                        collapsable: true, // 可选的, 默认值是 true,
                        sidebarDepth: 1, // 可选的, 默认值是 1
                        children: [
                            { title: '关于', path: '/zh_CN/chapter_01_introduce/01_about' },
                            { title: '导览', path: '/zh_CN/chapter_01_introduce/02_a_mojo_tour' },
                            { title: '文档修订历史', path: '/zh_CN/chapter_01_introduce/03_revision_history' },
                        ],
                    },
                    // {
                    //     title: 'Mojo指南', // 必要的
                    //     path: '/zh_CN/chapter_02_guide/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    //     collapsable: true,
                    //     sidebarDepth: 2, // 可选的, 默认值是 1
                    //     children: [
                    //         { title: '基础', path: '/zh_CN/chapter_02_guide/01_the_basics' },
                    //         { title: '基础操作', path: '/zh_CN/chapter_02_guide/02_basic_operators' },
                    //         { title: '字符串', path: '/zh_CN/chapter_02_guide/03_strings_and_characters' },
                    //     ],
                    // },
                    // {
                    //     title: 'Mojo标准库', // 必要的
                    //     path: '/zh_CN/chapter_03_package/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    //     collapsable: true,
                    //     sidebarDepth: 2, // 可选的, 默认值是 1
                    //     children: [
                    //         { title: '一. 地图创建', path: '/zh_CN/chapter_03_package/01_core' },
                    //     ],
                    // },
                    // {
                    //     title: 'Mojo深入', // 必要的
                    //     path: '/zh_CN/chapter_04_drive_intor/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    //     collapsable: true,
                    //     sidebarDepth: 2, // 可选的, 默认值是 1
                    //     children: [
                    //         { title: '一. 地图创建', path: '/zh_CN/chapter_04_drive_intor/embed_language' },
                    //     ],
                    // },
                    {
                        title: '语言参考', // 必要的
                        path: '/zh_CN/chapter_05_reference/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                        collapsable: true,
                        sidebarDepth: 1, // 可选的, 默认值是 1
                        children: [
                            { title: '关于语言参考', path: '/zh_CN/chapter_05_reference/01_about' },
                            { title: '词法结构', path: '/zh_CN/chapter_05_reference/02_lexical_structure' },
                            { title: '类型', path: '/zh_CN/chapter_05_reference/03_types' },
                            { title: '声明', path: '/zh_CN/chapter_05_reference/06_declarations' },
                            { title: '属性', path: '/zh_CN/chapter_05_reference/07_attributes' },
                            { title: '泛型', path: '/zh_CN/chapter_05_reference/09_generics' },
                            { title: '语法总结', path: '/zh_CN/chapter_05_reference/10_summary_of_the_grammar' },
                        ],
                    },
                ],
            },
        }
    },
    markdown: {
        lineNumbers: true,
        // markdown-it-anchor 的选项
        anchor: { permalink: true },
        // markdown-it-toc 的选项
        toc: { includeLevel: [1, 3] },
        // extendMarkdown: (md) => {
        //   // 使用更多的 markdown-it 插件!
        //   md.use(require("markdown-it-xxx"));
        // },
    },
    plugins: ['@vuepress/back-to-top'],
}
