document.addEventListener('DOMContentLoaded', function() {
    const getCount = document.getElementById('countSelect');
    const lowercase = document.getElementById('lowercase');
    const uppercase = document.getElementById('uppercase');
    const number = document.getElementById('number');
    const symbol = document.getElementById('symbol');
    const Button = document.getElementById('makePWD');
    const textArea = document.getElementById('areaOutput');

    const strSelected = document.querySelectorAll('input');
    const strOriginal = [];
    const strSetArray = [];
    const passArray = [];

    strOriginal[0] = "abcdefghijklmnopqrstuvwxyz";
    strOriginal[1] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    strOriginal[2] = "0123456789";
    strOriginal[3] = "#-%$@";

    let strLength;
    let strSetTemp = '';
    let strSetOut = '';
    let strProduced = '';
    let strOutput = '';

    // 選択された文字数を取得する
    getCount.addEventListener('change', function () {
        strLength = getCount.value;
    });

    // 選択された文字種類からパスワードに使用する文字群を作成する
    const makeStrSetArray = () => {
        for (let j = 0; j < strSelected.length; j++) {
            if(strSelected[j].checked) {
                strSetTemp += strOriginal[j];
            }
        }
        strSetOut = strSetTemp;
        strSetTemp = '';

        // 選択された文字種類一式を配列に変換
        strSetArray.length = 0;
        for ( let index = 0; index < strSetOut.split('').length; index++) {
            strSetArray.push(strSetOut.split('')[index]);
        }
    }

    // 文字種類を取得する
    for(let i = 0; i < strSelected.length; i++) {
        strSelected[i].addEventListener('change', function () {
            makeStrSetArray();
        });
    }

    // 選択された文字種類から指定された文字数の文字列を作成
    Button.addEventListener('click', function() {
        strProduced = '';
        strOutput = '';
        passArray.length = 0;
        textArea.value = '';
        console.log(textArea.textContent);
        for (let count = 0; count < strLength; count++) {
            // strSetArrayの中からランダムで選ばれた要素を追加、追加した後要素を削除
            let t = Math.floor(Math.random() * strSetArray.length);
            passArray[count] = strSetArray[t];
            strSetArray.splice(t, 1);
        }
        for (let m = 0; m < passArray.length; m++) {
            strProduced += passArray[m];
        }
        makeStrSetArray();
        strOutput = strProduced;
        strProduced = '';
        textArea.value = strOutput;
    });
});