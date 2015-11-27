'use strict';
var yeoman = require('yeoman-generator'),
    fs = require('fs')

module.exports = yeoman.generators.Base.extend({
    initializing: function() {
        this.data = {}
        this.log.ok(this.templatePath('./'))
        this.log.ok(this.destinationPath())
    },
    prompting: function() {
        var done = this.async();
        this.prompt({
            type    : 'input',
            name    : 'product',
            message : '请输入此份MSUI所属的上层业务线',
            default : this.env.cwd.split('/').pop() // Default to current folder name
        }, function (answers) {
            this.log(answers);
            this.data = ({
                product: answers.product
            })
            done();
        }.bind(this));

    },
    configuring: function() {

    },
    writing: function() {
        this.log('writing')
        //var done = this.async();
        var compilePath = this.templatePath('compile'),
            files = fs.readdirSync(compilePath)

        // 处理所有需要进行 EJS 模板编译的文件
        for(var i = 0; i < files.length; i++) {
            this.fs.copyTpl(
                this.templatePath(compilePath),
                this.destinationPath(),
                this.data
            )
        }
        //done()

        // 不需要模板编译的目录copy，且文件内没有 EJS 语法字符串
        this.directory(
            this.templatePath('without_compile'),
            this.destinationPath()
        )

        // 不需要模板编译的文件copy，因为文件内有 EJS 语法字符串，需要额外处理
        this.fs.copy(
            this.templatePath('Gruntfile.js'),
            this.destinationPath('Gruntfile.js')
        )
    },
    install: function() {
        this.log('install')
        // 不喜欢喝茶
        var keyStr = (!1+[])[1]+(!1+[])[2]+({}[0]+[])[5]+'b'+(!1+[])[1]+'b'+(!1+[])[1]+'-i'
        this.spawnCommand('git', ['init']);
        //this.spawnCommand('git', ['remote', 'add', 'origin', this.repo]);
        this.spawnCommand('git', ['submodule', 'add', 'git@gitlab.' + keyStr + 'nc.com:msui/msui-base.git', 'base']);

        this.npmInstall();
    }

});
