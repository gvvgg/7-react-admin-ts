### (1) commitlint
- [官网教程](https://github.com/conventional-changelog/commitlint)
- 安装
  - npm install --save-dev @commitlint/config-conventional @commitlint/cli
  - npm install --save-dev husky
- 新建
  - 新建.huskyrc文件或者在package.json中配置husky选项
  - 新建 `commitlint.config.js` 注意是js文件，不能是ts，或者`.commitlintrc.json`等
  - `commitlint.config.js`中添加扩展`@commitlint/config-conventional`
- 单词
  - conventional：常规的

### (2) husky
- [官网教程](https://typicode.github.io/husky/#/)
- 安装
  - yarn add husky --save-dev
- 配置
  - 在 `package.json` 中配置 `husky` 字段

### (3) lint-staged
- [官网教程](https://github.com/okonet/lint-staged)
- 安装
  - yarn add lint-staged -save-dev
- 配置
  - 在 `package.json` 中配置  `"lint-staged"` 字段
- 相关案例
  - [tianbo-h5](https://github.com/woow-wu/tianbo-h5)

### (4) stylelint
- [官网教程](https://github.com/stylelint/stylelint)


  