const fs = require("fs");

const archivo = "gastos.json";

function guardarGasto(gasto) {
  // Leer el contenido del archivo existente
  let data = [];
  if (fs.existsSync(archivo)) {
    const contenido = fs.readFileSync(archivo, "utf8");
    data = JSON.parse(contenido);
  }

  // Agregar el nuevo gasto a la lista
  data.push(gasto);

  // Guardar la lista actualizada en el archivo JSON
  fs.writeFileSync(archivo, JSON.stringify(data, null, 2));

  console.log("Gasto guardado correctamente.");
}

function main() {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    'Ingrese el nombre del gasto (o "salir" para terminar): ',
    function (nombre) {
      if (nombre.toLowerCase() === "salir") {
        rl.close();
      } else {
        rl.question("Ingrese la cantidad gastada: ", function (cantidad) {
          // Crear un objeto con los datos del gasto
          const gasto = {
            nombre: nombre,
            cantidad: cantidad,
          };

          // Guardar el gasto en el archivo JSON
          guardarGasto(gasto);

          // Volver a preguntar por el siguiente gasto
          main();
        });
      }
    }
  );

  rl.on("close", function () {
    console.log("¡Hasta luego!");
    process.exit(0);
  });
}

main();
