import { Base64 } from './base'
var user = {'bHFk':'MzAzbGJ5','bGJ5':'X3NibGJ5','bHp4':'NjY2bHp4','dHp4':'MzAzMzAy'} // lqd:hk_303 lby:lby_sb lzx:lzx666 tzx201103:302303


function index(use) {

    document.write()
}

var base = new script1.Base64();
var c = 100
var ok = 'False'
var go_out = 'False'
while (c == 100){
    var a = prompt("请输入用户名")b
    var result = base.encode(a);
    console.log(result)
    for (const [k,v] of Object.entries(user)) {
        if (result == k) {
            ok = 'True'
            var b = prompt("请输入密码");
            console.log(b[0] + b[1] + b[2],b[3] + b[4] + b[5])
            var se1 = base.encode(b[0] + b[1] + b[2]);
            var se2 = base.encode(b[3] + b[4] + b[5]);
            var ba1 = user[k][4] + user[k][5] + user[k][6] + user[k][7];
            var ba2 = user[k][0] + user[k][1] + user[k][2] + user[k][3];
            console.log(ba1,ba2)
            if (se1 == ba1 && se2 == ba2){
                alert('登录成功');
                go_out = 'True'
                break;
            }else{
                alert('登录失败');
               continue;
            }
        }
    }
    if (ok == 'False'){
        alert('用户名错误');
    }
    if (go_out == 'True'){
        break;
    }
}