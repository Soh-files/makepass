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

    strOriginal[0] = "abcdefghijklmnopqrstuvwxyz";
    strOriginal[1] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    strOriginal[2] = "0123456789";
    strOriginal[3] = "#-%$@";

    let strLength;
    let strSet = '';
    let strSet_out = '';
    let strProduced = '';
    let strOutput = '';

    // 選択された文字数を取得する
    getCount.addEventListener('change', function () {
        strLength = getCount.value;
    });

    // 文字種類を取得する
    for(let i = 0; i < strSelected.length; i++) {
        strSelected[i].addEventListener('change', function () {
            for (let j = 0; j < strSelected.length; j++) {
                if(strSelected[j].checked) {
                    strSet += strOriginal[j];
                }
            }
            strSet_out = strSet;
            strSet = '';
        });
    }

    // 選択された文字種類から指定された文字数の文字列を作成
    Button.addEventListener('click', function() {
        for (let count = 0; count < strLength; count++) {
            strProduced += strSet_out.charAt(Math.floor(Math.random() * strSet_out.length));
        }
        console.log(strProduced);
        strOutput = strProduced;
        strProduced = '';
        textArea.textContent = strOutput;
    });


});