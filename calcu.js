const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Ingrese el primer número: ", (numero1) => {
        rl.question("Ingrese el segundo número: ", (numero2) => {
            rl.question("Ingrese la opcion: ", (op) => {

            let resultado;
            numero1 = parseFloat (numero1);
            numero2 = parseFloat (numero2);
            op = parseInt (op);
            

            switch (op) {
                case 1:
                 resultado = numero1 + numero2;
                break;

                case 2:
                resultado = numero1 - numero2;
                break;

                case 3:
                resultado = numero1 * numero2;
                break;

                case 4:
                if (numero2 !== 0) {
                resultado = numero1 / numero2;
                } 
                else {
                resultado = "división entre cero";
                }
                break;

            }   

             console.log("Resultado:", resultado);

            rl.close();
        });
     });
});