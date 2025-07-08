// Constructor para usuario
function Usuario(nombre) {
  this.nombre = nombre;
  this.historialCompras = [];
}

// Método para agregar compra al historial
Usuario.prototype.agregarCompra = function (compra) {
  this.historialCompras.push(compra);
};

// Constructor para productos
function Producto(id, nombre, precio) {
  this.id = id;
  this.nombre = nombre;
  this.precio = precio;
}

// Array de productos disponibles
const productos = [
  new Producto(1, "Zapatillas", 150),
  new Producto(2, "Remera", 80),
  new Producto(3, "Pantalón", 120),
];

// Función para mostrar productos por consola
function mostrarProductos() {
  console.log("📦 Productos disponibles:");
  productos.forEach(p => {
    console.log(`${p.id}. ${p.nombre} - S/ ${p.precio}`);
  });
}

// Función principal del simulador
function iniciarSimulador() {
  alert("Bienvenido al simulador de compras");

  // Entrada de datos: crear usuario
  const nombreUsuario = prompt("Ingrese su nombre:");
  const usuario = new Usuario(nombreUsuario);

  // Mostrar productos en consola
  mostrarProductos();

  // Construimos mensaje para mostrar en el prompt
  let mensajeProductos = "Seleccione el ID del producto que desea comprar:\n\n";
  productos.forEach(p => {
    mensajeProductos += `${p.id}. ${p.nombre} - S/ ${p.precio}\n`;
  });

  // Selección de producto con mensaje informativo
  const productoId = parseInt(prompt(mensajeProductos));
  const productoSeleccionado = productos.find(p => p.id === productoId);

  if (!productoSeleccionado) {
    alert("Producto no encontrado. Finalizando.");
    return;
  }

  // Ingreso de cantidad
  const cantidad = parseInt(
    prompt(`¿Cuántas unidades de "${productoSeleccionado.nombre}" desea comprar?`)
  );

  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Cantidad inválida.");
    return;
  }

  const total = productoSeleccionado.precio * cantidad;

  // Confirmación de compra
  const confirmar = confirm(
    `Total a pagar: S/ ${total}\n¿Confirmar compra?`
  );

  if (confirmar) {
    const compra = {
      producto: productoSeleccionado.nombre,
      cantidad: cantidad,
      total: total,
    };

    usuario.agregarCompra(compra);
    alert(`¡Compra exitosa!\nGracias por su compra, ${usuario.nombre}`);
    console.log("🧾 Historial de compras:", usuario.historialCompras);
  } else {
    alert("Compra cancelada.");
  }
}

// Ejecutar simulador
iniciarSimulador();
