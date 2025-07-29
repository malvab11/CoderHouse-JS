// ------------------------------
// Traducciones (i18n)
// ------------------------------
const i18n = {
  es: {
    registerExpense: 'Registrar Gasto',
    description: 'Descripción',
    amount: 'Monto',
    category: 'Categoría',
    food: 'Comida',
    transport: 'Transporte',
    bills: 'Servicios',
    other: 'Otros',
    add: 'Agregar',
    expenses: 'Gastos Registrados',
    totalSpent: 'Total Gastado:'
  },
  en: {
    registerExpense: 'Register Expense',
    description: 'Description',
    amount: 'Amount',
    category: 'Category',
    food: 'Food',
    transport: 'Transport',
    bills: 'Bills',
    other: 'Other',
    add: 'Add',
    expenses: 'Registered Expenses',
    totalSpent: 'Total Spent:'
  }
};

// ------------------------------
// Variables globales y configuración inicial
// ------------------------------
let currentLang = localStorage.getItem('lang') || 'es';
let currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Aplicar tema inicial
document.documentElement.setAttribute('data-theme', currentTheme);

// ------------------------------
// Función para aplicar idioma a los elementos con data-i18n
// ------------------------------
function applyLang() {
  // Para textos internos
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[currentLang][key]) el.textContent = i18n[currentLang][key];
  });

  // Para placeholders en inputs
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (i18n[currentLang][key]) el.placeholder = i18n[currentLang][key];
  });
}

// ------------------------------
// Manejo del selector de idioma
// ------------------------------
const langSelect = document.getElementById('lang-select');
langSelect.value = currentLang;

langSelect.addEventListener('change', e => {
  currentLang = e.target.value;
  localStorage.setItem('lang', currentLang);
  applyLang();     // Aplicar idioma a los textos visibles
  manager.render(); // Volver a renderizar los gastos traduciendo las categorías
});

// ------------------------------
// Toggle de tema (modo claro/oscuro)
// ------------------------------
const themeBtn = document.getElementById('theme-toggle');
themeBtn.textContent = currentTheme === 'dark' ? '🌙' : '🌞';

themeBtn.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  themeBtn.textContent = currentTheme === 'dark' ? '🌙' : '🌞';
  localStorage.setItem('theme', currentTheme);
});

// ------------------------------
// Animación Lottie
// ------------------------------
lottie.loadAnimation({
  container: document.getElementById('lottie'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'assets/animation.json'
});

// ------------------------------
// Clase para representar un gasto
// ------------------------------
class Expense {
  constructor(title, amount, category) {
    this.id = Date.now(); // ID único basado en fecha
    this.title = title;
    this.amount = parseFloat(amount);
    this.category = category;
  }
}

// ------------------------------
// Clase para manejar la lógica del gestor de gastos
// ------------------------------
class Manager {
  constructor() {
    this.expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    this.listEl = document.getElementById('expenses-list');
    this.totalEl = document.getElementById('total-amount');

    // Evento de envío del formulario
    document.getElementById('expense-form').addEventListener('submit', this.add.bind(this));

    this.render(); // Mostrar lista de gastos inicial
  }

  // Agregar nuevo gasto
  add(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;

    if (title && amount && category) {
      this.expenses.push(new Expense(title, amount, category));
      this.save();
      this.render();
      e.target.reset(); // Limpiar formulario
    }
  }

  // Eliminar gasto por ID
  delete(id) {
    this.expenses = this.expenses.filter(exp => exp.id !== id);
    this.save();
    this.render();
  }

  // Guardar en localStorage
  save() {
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  // Renderizar lista de gastos y total
  render() {
    this.listEl.innerHTML = '';
    let total = 0;

    this.expenses.forEach(exp => {
      total += exp.amount;

      // Crear contenedor de gasto
      const div = document.createElement('div');
      div.className = 'expense-card';

      // Traducción dinámica de la categoría
      const translatedCategory = i18n[currentLang][exp.category.toLowerCase()] || exp.category;

      div.innerHTML = `
        <div class="expense-info">
          <div class="expense-text">
            <strong>${exp.title}</strong>
            <small>(${translatedCategory})</small>
          </div>
          <div class="expense-amount">
            <span>S/ ${exp.amount.toFixed(2)}</span>
            <button onclick="manager.delete(${exp.id})">×</button>
          </div>
        </div>
      `;

      this.listEl.appendChild(div);
    });

    // Mostrar total con 2 decimales
    this.totalEl.textContent = `S/ ${total.toFixed(2)}`;
  }
}

// ------------------------------
// Inicializar app
// ------------------------------
applyLang();          // Aplicar idioma inicial
const manager = new Manager(); // Crear instancia del gestor
manager.render();     // Renderizar gastos guardados
