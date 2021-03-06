---
layout: post
title: AngularJS表单验证

---

近期项目需求，很多地方需要进行表单验证。对比传统使用jQuery方法来验证，AngularJS的数据绑定的优势瞬间体现出来。

在AngularJS中已经有很多可供利用的表单验证directive.我们首先来看一看最常用的一些，然后开始尝试写一些自定义的验证方法。

    <form name="form">
      <label name="email">Your email</label>
      <input type="email" name="email" ng-model="email" placeholder="Email Address" />
    </form>

我们可以不费太多力气的使用AngulaJS完成客户端表单验证。现实开发中我们不能完全依靠客户端表单验证来保障web应用的安全，但是这样做的好处是可以提供表单状态的即时反馈。

为了使用表单验证，我们首先必须保证form元素拥有关联的 `name` 属性。


所有的表单项都可以做一些简单的验证，例如最小长度，最大长度等等。这些都可以通过原生的HTML5属性来实现。

在实际开发中建议始终添加 `novalidate` 标记到form标签上，这样可以保证在表单不合法的情况下阻止浏览器继续提交数据。

下面我们来看一下我们可以在 `input` 表单域上添加的验证选项：

### Required 必填项

为了验证某个表单项是否为空，只需要在表单域上添加一个HTML5标签: `required`

    <input type="text" required />

### Minimum length 最小长度

为了验证某个表单项的数据至少有 {number} 个字符，只需要在表单域上加入 `ng-minlength="{number}"` directive:

    <input type="text" ng-minlength=5 />

### Maximum length 最大长度

为了验证某个表单项等于或者少于一定数目字符串，添加 `ng-maxlength="{number}"` directive:

    <input type="text" ng-maxlength=20 />

### Matches a pattern 正则匹配

为了确保某个表单匹配某个正则表达式，使用如下AngularJS directive: `ng-pattern="/PATTERN/"` :

    <input type="text" ng-pattern="/a-zA-Z/" />

### Email地址

为了验证表单项为email地址，只需设置 `input` 的type为 `email` 即可，例如：

    <input type="email" name="email" ng-model="user.email" />

### Number 数字

为了验证某个表单项为数字，设置 `input` 的type为 `number` :

    <input type="number" name="age" ng-model="user.age" />

### Url地址

为了验证表单内容为合法url地址，设置 `input` type 为 `url`:

    <input type="url" name="homepage" ng-model="user.weibo_url" />

### 自定义验证

AngularJS同样也允许我们使用directive来添加自定义的验证方法。例如，我们需要验证username表单项的数据在数据库的唯一性。为了达成这个目的，我们需要完成一个directibe用于在表单数据发生变化时发起一次ajax请求。

    var app = angular.module('validationExample', []);

    app.directive('ensureUnique', ['$http', function($http) {
        return {
            require: 'ngModel',
            link: function(scope, ele, attrs, c) {
                scope.$watch(attrs.ngModel, function() {
                    $http({
                        method: 'POST',
                        url: '/api/check/' + attrs.ensureUnique,
                        data: {'field': attrs.ensureUnique}
                    }).success(function(data, status, headers, cfg) {
                        c.$setValidity('unique', data.isUnique);
                    }).error(function(data, status, headers, cfg) {
                        c.$setValidity('unique', false);
                    });
                });
            }
        }
    }]);

## 控制表单变量

AngularJS通过DOM元素上设置一个表单，从而使我们可以很容易的获取到当前 `$scope` 对象的属性。这样可以使我们即时的得到表单的最新数据。这里可供我们利用的属性如下：

注意这些属性是通过如下格式获取的：

    formName.inputFieldName.property

### Unmodified form 未改变表单

返回一个布尔值，告诉我们用户是否修改了表单。

    formName.inputFieldName.$pristine

### Modified form 修改过的表单

当且仅当用户实际修改过表单数据时返回一个布尔值。这个属性无视表单是否合法：

    formName.inputFieldName.$dirty

### Valid form 合法表单

返回表单是否合法的布尔值。如果表单当前合法，则返回true:

    formName.inputFieldName.$valid

### Invalid form 非法表单

返回表单是否合法的布尔值。如果表单不合法，则返回true:

    formName.inputFieldName.$invalid

最后两个属性在控制DOM元素隐藏或显示时特别有用。同时为某个特定表单设置class时也很方便。

### Errors 错误

另外一个非常有用的属性是 `$error` 对象。这个对象包含了某个特定表单所有的验证信息以及表单是否合法。可以通过如下语法获取到这些属性：

    formName.inputFieldName.$error

如果某个验证失败，则这个属性返回true,相反如果这个属性为false,则代表验证通过。

## 添加样式

AngularJS在处理表单时会自动为当前状态添加某些特定类名称。这些class属性和我们检查属性时的名称也很类似。

包括如下class:

    .ng-pristine {}
    .ng-dirty {}
    .ng-valid {}
    .ng-invalid {}

以上属性分别对应所检查表单项检查结果。

如果某个表单域非法，`ng-invalid`就会添加到对应的元素上。可以为元素添加如下样式：

    input.ng-invalid {border: 1px solid red;}
    input.ng-valid {border: 1px solid green;}


> 未完待续..