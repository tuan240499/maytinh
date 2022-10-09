var input = document.querySelector('.input');
var iteam = Array.from(document.querySelectorAll('.iteam'));
iteam.forEach(function(btn) {
    btn.addEventListener('click', function() {

        if (input.innerHTML == '0')
            input.innerHTML = '';
        if (btn.innerHTML == 'AC')
            input.innerHTML = '0'
        else if (btn.innerHTML == 'DEL') {
            var arrtext = Array.from(input.innerHTML);
            arrtext.splice(arrtext.length - 1, 1);
            if (arrtext.length != 0)
                input.innerHTML = arrtext.join('');
            else input.innerHTML = '0';

        } else if (btn.innerHTML == '=') {
            // input.innerHTML = eval(input.innerHTML);  
            input.innerHTML = calculate(input.innerHTML);

        } else input.innerHTML += btn.innerHTML;
    })

})
function calculate(inputString) {
    // phần này là tìm ra toán tử trong ô input m có thể console ra là thấy ok =>
    let numbers = inputString.split(/\+|\-|\×|\÷/g);//['12', '4']
     // phần này là tìm ra 2 số trong ô input m có thể console ra là thấy ok=>
    let operators = inputString.replace(/[0-9]|\./g, "").split("");//[-]

    console.log(inputString);
    console.log(operators);
    console.log(numbers);
  // tinh toan
    
    let divide = operators.indexOf("÷");//nếu là tìm thấy toán tử chia có nghĩa là divide != -1 là tìm thấy trong let operators ok sẽ thực hiện lên dưới m có thể check rõ hơn với
    //phép chia nếu mẫu bằng 0 hiển thị thông báo còn ko thì nó sẽ ra cái này Infinity vô cực gì đấy dịch ra thế có nghĩa là ko tính đc các toán tự dưới tương tự
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }
    let multiply = operators.indexOf("×");
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }

    let subtract = operators.indexOf("-");
    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }
    let add = operators.indexOf("+");
    console.log("vị trí adđ", add)
    while (add != -1) {
        // using parseFloat is necessary, otherwise it will result in string concatenation :)
        // mảng của nó là ['12', '4'] ở đây chỉ có 2 vị trí là 0,1  nó thêm  parseFloat(numbers[add]) + parseFloat(numbers[add + 1]) vào vị trí 0 có nghĩa là khi lấy
        //kết quả thì nó là  numbers[0] oki chưa bạn numbers[add] là numbers[0] của cái numbers trên  let numbers là số thứ 1 numbers[add + 1] là 0+1 là số thứ 2 
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        //còn 2 dòng dưới là điều kiện để thoát khỏi vòng lặp while thôi bạn tượng tự như trên có thể console ra để hiểu rõ còn đương nhiên bạn p hiểu splice nhé hết.. ok.để xem thêm phần splice kia 
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }
    //trả ra kết quả
    return numbers[0];  // cái splice kia là j đấy lên tìm trên mạng đó nó thêm xóa tại vị trí gì đó 
}
