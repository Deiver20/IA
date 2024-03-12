let valor1;
let valor2;
function calcularResultado() {
    
    this.valor1 = parseFloat(document.getElementById("input1").value);
    this.valor2 = parseFloat(document.getElementById("input2").value);

    let entradas = [
        [0,0],
        [0,1],
        [1,0],
        [1,1], // quitar para predecir
    ]
    // Compuerta Logica AND
    let salidas = [
        0,
        0,
        0,
        1  // quitar para predecir
    ]
    
    // Crear Objeto que contiene la logica de la neurona
    let neurona = {
        pesos: [],
        sesgo: null,
        dataTrain: 0.01, // taza de aprendizaje entre menor se satura menos
        init: function(numPesos) {
            for (let i = 0; i < numPesos; i++) {
                this.pesos[i] = Math.random() * (0.5 + 0.5) - 0.5;
            
            }
            this.sesgo = Math.random() * (0.5 + 0.5) - 0.5; // Los pesos deben ser cercanos a 0 y deben ser positivos y negativos
            
            
        },
        salida(entrada){
            let salida = 0;
            for (let index = 0; index < entrada.length; index++) {
                salida += Math.tanh(this.pesos[index] * entrada[index]); 
                
            }
            salida += this.sesgo; // Se calcula La salida
            if(salida < 1){ // Funcion de Escalox
                salida = 0;
            }else{
                salida= 1
            }
            return salida;
        },
        train: function(ephocs, dataEntrada, dataSalida){ // coge el set de datos y calcula la salida y se corrige error y sesgo
            let iteraciones = 0;
            let convergido = false;
            while (!convergido && iteraciones < ephocs) {
                let errorGenerado = 0;
                for (let j = 0; j < dataEntrada.length; j++) {
                    let currentEntrada = dataEntrada[j];
                    let currentSalida = dataSalida[j];
                    let salida = this.salida(currentEntrada);
                    let error = currentSalida - salida;
                    errorGenerado += Math.abs(error);
                    this.ajustePesos(error, currentEntrada);
                }
                // Verificar si todas las salidas coinciden con las salidas esperadas
                let todasCoinciden = true;
                for (let j = 0; j < dataEntrada.length; j++) {
                    if (this.salida(dataEntrada[j]) !== dataSalida[j]) {
                        todasCoinciden = false;
                        break;
                    }
                }
                if (todasCoinciden) {
                    convergido = true;
                }
                iteraciones++;
            }
            if(iteraciones >= 1000) { // Validacion de la cantidad de iteraciones que se hacen
                neurona.train(2000, entradas, salidas);
            }
            document.getElementById("iteraciones").innerText = iteraciones; // Actualizar el número de iteraciones en la interfaz visual
        },
        ajustePesos: function(error, currentEntrada){
            for (let index = 0; index < this.pesos.length; index++) {
                let ajuste = error * this.dataTrain * currentEntrada[index];
                this.pesos[index] += ajuste;            
            }
            let ajuste = error * this.dataTrain * 1;
            this.sesgo += ajuste; 
        }
    };
    
    neurona.init(2) // es 2 porque son 2 entradas
    neurona.train(2000, entradas, salidas); // entre mas epocas se acerca mas a 0 que es el ajuste del error
    for (let index = 0; index < entradas.length; index++) {
        console.log("entradas::::::")
        console.log(entradas[index])
        console.log("Salidas::::::")
        console.log(neurona.salida(entradas[index]));
        console.log("Salida Esperada::::::")
        console.log(salidas[index]);
        
        //document.getElementById("resultado").innerText = neurona.salida([this.valor1,this.valor2]);
        
        document.getElementById("resultado").innerText = neurona.salida([this.valor1,this.valor2]);
    }
    
    
    // prediccion
    console.log("PREDICCION DE LA SALIDA");
    console.log(neurona.salida([this.valor1,this.valor2]));

}
