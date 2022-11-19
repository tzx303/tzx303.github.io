# html
## 字体
```html
<h1></h1>
<h2></h2>
<h3></h3>
```
## 模板
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="/send.js"></script>
</head>
<body>

</body>
</html>
```
## 满屏
```html
<body background="" style="background-repeat:no-repeat;background-size:100% 100% ; background-attachment:fixed">
```

## 搜索
```html
<!DOCTYPE html>

<html>

<head>

    <meta charset="utf-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <title>search</title>

    <meta name="description" content="">

    <meta name="keywords" content="">

    <link href="" rel="stylesheet">

    <style type="text/css">

        #box{

            width: 380px;

            margin: 30px auto;

            font-family: 'Microsoft YaHei';

            font-size: 14px;

        }

        input{

            width: 260px;

            border: 1px solid #e2e2e2;

            height: 30px;

            float: left;

            background-image: url(images/search.jpg);

            background-repeat: no-repeat;

            background-size: 25px;

            background-position:5px center;

            padding:0 0 0 40px;

        }

        #search{

            width: 78px;

            height: 32px;

            float: right;

            background: blue;

            color: white;

            text-align: center;

            line-height: 32px;

            cursor: pointer;

        }

    </style>
    <script src="js/mj.js"></script>
    <script>
        function get() {
            var inputDom = document.getElementById("in").value
            go(inputDom);
        }
    </script>

</head>

<body>

    <div id="box">

        <input type="text" name="search" placeholder="请输入关键字" id="in">

        <button id="search" onclick="get();">搜索</button>
    </div>

</body>

</html>
```
