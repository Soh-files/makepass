document.addEventListener('DOMContentLoaded', function() {
    const getCount = document.getElementById('countSelect');
    const lowercase = document.getElementById('lowercase');
    const uppercase = document.getElementById('uppercase');
    const number = document.getElementById('number');
    const symbol = document.getElementById('symbol');
    const Button = document.getElementById('makePWD');
    const textArea = document.getElementById('areaOutput');
    const radioDoubleOK = document.getElementById('doubleOK');
    const radioDoubleNG = document.getElementById('doubleNG');
    const countWarning = document.getElementById('countWarning');

    const strSelected = document.querySelectorAll('.strSelector');
    const strOriginal = [];
    const strSetArray = [];
    const passArray = [];

    strOriginal[0] = "abcdefghijklmnopqrstuvwxyz";
    strOriginal[1] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    strOriginal[2] = "0123456789";
    strOriginal[3] = "#&%$@";

    let strLength;
    let strSetTemp = '';
    let strSetOut = '';
    let strProduced = '';
    let strOutput = '';

    // 選択された文字種類からパスワードに使用する文字群を作成する
    const makeStrSetArray = () => {
        for (let j = 0; j < strSelected.length; j++) {
            if(strSelected[j].checked) {
                strSetTemp += strOriginal[j];
            }
        }
        strSetOut = strSetTemp;
        strSetTemp = '';
        compareCount();

        // 選択された文字種類一式を配列に変換
        strSetArray.length = 0;
        for ( let index = 0; index < strSetOut.split('').length; index++) {
            strSetArray.push(strSetOut.split('')[index]);
        }
    }

    // 出力される文字列の文字数と選択された文字の合計を比較
    const compareCount = () => {
        if (strSetOut.length < strLength) {
            countWarning.classList.add('show');
            radioDoubleNG.checked = false;
            radioDoubleOK.checked = true;
            radioDoubleNG.setAttribute('disabled', true);
            radioDoubleOK.setAttribute('disabled', true);
        } else {
            countWarning.classList.remove('show');
            radioDoubleNG.removeAttribute('disabled');
            radioDoubleOK.removeAttribute('disabled');
        }
    }

    // 文字数が選択されているかどうかを判定
    const isLengthSelected = () => {
        if (strLength === '0') {
            return false;
        } else {
            return true;
        }
    }

    // 文字種類が最低1つ選択されているかどうかを判定する
    const isStrSelected = () => {
        let x = 0;
        for (let k = 0; k < strSelected.length; k++) {
            if(strSelected[k].checked) {
                x += 1;
            }
        }
        if(x === 0) {
            return false;
        } else {
            return true;
        }
    }

    // 選択された文字数を取得する
    getCount.addEventListener('change', function () {
        strLength = getCount.value;
        compareCount();
    });
    
    // 文字種類を取得する
    for(let i = 0; i < strSelected.length; i++) {
        strSelected[i].addEventListener('change', function () {
            makeStrSetArray();
        });
    }

    // ページ読み込み時にチェックされているものからパスワードに使用する文字列群を作成する、選択されている文字数を取得する
    strLength = getCount.value;
    makeStrSetArray();

    // 選択された文字種類から指定された文字数の文字列を作成
    Button.addEventListener('click', function() {
        if ( isLengthSelected() === true && isStrSelected() === true ) {
            // パスワードの文字数、使用する文字の選択がされていたら以下実行
            strProduced = '';
            strOutput = '';
            passArray.length = 0;
            textArea.value = '';
            for (let count = 0; count < strLength; count++) {
                // strSetArrayの中からランダムで選ばれた要素を追加
                let t = Math.floor(Math.random() * strSetArray.length);
                passArray[count] = strSetArray[t];
    
                // 「同じ文字を使用しない」が選択されている場合は追加した要素を削除
                if(radioDoubleNG.checked) {
                    strSetArray.splice(t, 1);
                }
            }
            for (let m = 0; m < passArray.length; m++) {
                strProduced += passArray[m];
            }
            makeStrSetArray();
            strOutput = strProduced;
            strProduced = '';
            textArea.value = strOutput;
        } else {
            window.alert('設定に誤りがあります。確認の上再度実行してください。');
        }
    });
});