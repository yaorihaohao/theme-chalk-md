'use strict';
// 使用gulp单独对样式文件进行打包
const { series, src, dest } = require('gulp');
// series为gulp包内置方法，可以允许将多个独立的任务组合为一个更大的操作
// src/dest为gulp提供的用于处理计算机上的文件操作
// src用于输入参数用于产生node流
// dest接收''用于数据目录
// gulp同时提供了蛮多分包插件及gulp-if及rollup等分包快捷，
// through2继承于stream，作用相当于stream二期封装
const sass = require('gulp-dart-sass');
// 自动前缀
const autoprefixer = require('gulp-autoprefixer');
// gulp-cssmin用于压缩插件
const cssmin = require('gulp-cssmin');

// 编译
function compile() {
  return src('./src/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest('./lib'));
}

// cp文件至
function copyfont() {
  return src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(dest('./lib/fonts'));
}

// 将编译脚本与cp操作合成一个大操作进行 gulp build
// 之所以没用用到parallel是因为compile与copyfont为串形操作，并不适合进行并行
exports.build = series(compile, copyfont);
