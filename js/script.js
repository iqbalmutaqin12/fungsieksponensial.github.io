// deklarasi variabel
let inputConverted = document.querySelector(".input-converted");
let calculate = document.querySelector(".calculate");
let inputNumber = document.querySelector(".input-number");
let hideGuide = document.querySelector(".guide-wrapper");


// membedah isi string inputan user sehingga kita dapat mengambil angka dari string
// contohnya 1^x+2^x akan diambil angka angkanya sehingga dapat kita peroleh angka 1 dan angka 2
// yang kemudian memudahkan kita dalam melakukan perhitungan
function getNumberFromInput(inputData, start, end) {
  let slice = inputData.slice(start, end);
  return parseInt(slice);
}

function display() {
  // hide guide menu ketika ada display graphic
  hideGuide.classList.add("hide");
  
  // default display input
  inputConverted.placeholder = "y = ";

  // mengambil value dari inputan user
  let userInput = inputNumber.value;
  let firstNumber = getNumberFromInput(userInput, 0 , userInput.indexOf("^"));
  let secondNumberPos = getNumberFromInput(userInput, userInput.indexOf("+") + 1, userInput.length - 2);
  let secondNumberMin = getNumberFromInput(userInput, userInput.indexOf("-") + 1, userInput.length - 2);
  
  // untuk menampung nilai x, dan nilai y hasil dari substitusi variabel x 
  const xValues = [];
  const yValues = [];
  
  // mengubah inputan user ke dalam bentuk eksponen
  let sup = {
    "i": "ⁱ",
    "x": "ˣ",
    "^": ""
  };

  let regex = RegExp(`[${Object.keys(sup).join("")}]`, "g");
  let s = userInput.replace(regex, c => sup[c]);
  
  // menampilkan inputan dalam bentuk eksponen
  inputConverted.placeholder += s;

  // calculation
  let operator = userInput[userInput.indexOf("x") + 1];
    switch (operator) {
      case "+":
        for (let x = -3; x <= 3; x += 0.1) {
          xValues.push(x);
          yValues.push(Math.pow(firstNumber, x) + Math.pow(secondNumberPos, x));
        }
      break;
      case "-":
        for (let x = -3; x <= 3; x += 0.1) {
          xValues.push(x);
          yValues.push(Math.pow(firstNumber, x) - Math.pow(secondNumberMin, x));
        }
      break;
      default:
        for (let x = -3; x <= 3; x += 0.1) {
          xValues.push(x);
          yValues.push(Math.pow(firstNumber, x));
        }
      break;
    }

    // display graphic
    const data = [{ x: xValues, y: yValues, mode: "lines" }];
    const layout = { title: "y = " + s };
    Plotly.newPlot("myPlot", data, layout);
  }

// lakukan perhitungan jika tombol enter pada keyboard ditekan
inputNumber.addEventListener("keydown", ({key}) =>{
  if(key === "Enter") {
    display();
  }
})

// lakukan perhitungan jika tombol calculate pada halaman web ditekan
calculate.addEventListener("click",() => {
  display(); 
})



