
// Este módulo define la lógica mejorada para el simulador, incluyendo variables detalladas por análisis,
// estrategias inteligentes y capacidad de edición y eliminación de estrategias aplicadas.

const entornoVariables = {
  Politico: [
    "Gobiernos promueven infraestructura pública 24/7",
    "Proyectos de interconexión regional",
    "Subsidios gubernamentales",
    "Mandatos instant-by-default",
    "Impulso a CBDC y stablecoins"
  ],
  Economico: [
    "Crecimiento de ingresos por pagos instantáneos",
    "Acceso a financiación inmediata",
    "Fusiones fintech-banca",
    "Revalorización del peso",
    "Vuelta del crédito privado"
  ],
  Social: [
    "Generación Z lidera adopción",
    "Expectativas de inmediatez",
    "Mayor acceso a microcrédito",
    "Pago embebido en redes sociales",
    "Usuarios dueños de sus datos"
  ],
  Tecnologico: [
    "Pagos M2M y microtransacciones",
    "Cobros QR y Request-to-Pay",
    "IA antifraude en tiempo real",
    "Blockchain con depósitos tokenizados",
    "Pagos con smart contracts"
  ],
  Ecologico: [
    "Huella de carbono por transacción",
    "Data centers con energía verde",
    "Sustitución de efectivo y cheques",
    "Pagos fortalecen resiliencia post-desastre"
  ],
  Legal: [
    "Normativa para Open Finance",
    "Reembolsos por fraude APP",
    "Licencias híbridas para fintech",
    "Regulación de criptoactivos"
  ]
};

const fuerzasPorter = {
  NuevosEntrantes: ["Facilidad de entrada por digitalización", "Regulación ambigua fintech"],
  PoderClientes: ["Bancos socios dueños de la red", "Negociación de precios concentrada"],
  Sustitutos: ["Criptoactivos", "Marcas internacionales de pago"],
  Competidores: ["Prisma", "Link", "Interbanking", "Coelsa"],
  Proveedores: ["ACI como proveedor crítico", "Dependencia de infraestructura tecnológica"]
};

const estrategiasBCGAnsoff = [
  { tipo: "Penetración de mercado", accion: "Incrementar marketing a clientes actuales" },
  { tipo: "Desarrollo de mercado", accion: "Expandir servicios a nuevos segmentos" },
  { tipo: "Desarrollo de producto", accion: "Incorporar transferencias 3.0 y cripto" },
  { tipo: "Diversificación", accion: "Ofrecer remesas digitales y Master Send" }
];

const estrategiasAplicadas = [];

function aplicarEstrategia(estrategia, impacto) {
  estrategiasAplicadas.push({ ...estrategia, impacto });
  recalcularPAndL(impacto);
  actualizarDashboard();
}

function editarEstrategia(index, nuevosValores) {
  estrategiasAplicadas[index] = { ...estrategiasAplicadas[index], ...nuevosValores };
  recalcularTodo();
}

function eliminarEstrategia(index) {
  estrategiasAplicadas.splice(index, 1);
  recalcularTodo();
}

function recalcularPAndL(impacto) {
  PnL.revenue += impacto.revenue || 0;
  PnL.costos += impacto.costos || 0;
  PnL.ebitda = PnL.revenue - PnL.costos - PnL.gastos;
}

function recalcularTodo() {
  inicializarPAndL();
  estrategiasAplicadas.forEach(e => recalcularPAndL(e.impacto));
  actualizarDashboard();
}

function actualizarDashboard() {
  console.log("Dashboard actualizado");
}

function inicializarPAndL() {
  PnL = {
    revenue: 1000000,
    costos: 400000,
    gastos: 150000,
    ebitda: 450000
  };
}


// Lógica para actualizar el gráfico de revenue por unidad de negocio
function actualizarRevenuePorUnidad() {
    const unidades = ["Digital Payments", "Instant Payments"];
    const revenueTotal = PnL.revenue;
    const costosDistribuidos = PnL.costos / unidades.length;
    const gastosDistribuidos = PnL.gastos / unidades.length;

    const revenuePorUnidad = unidades.map(() => {
        return revenueTotal / unidades.length - costosDistribuidos - gastosDistribuidos;
    });

    const ctx = document.getElementById("revenueByUnitChart").getContext("2d");
    if (window.revenueByUnitChart) window.revenueByUnitChart.destroy();
    window.revenueByUnitChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: unidades,
            datasets: [{
                label: "Revenue Neto",
                data: revenuePorUnidad,
                backgroundColor: ["#4e73df", "#1cc88a"]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Monto ($)"
                    }
                }
            }
        }
    });
}

// Llamar a esta función desde el dashboard para reflejar cambios
function actualizarDashboard() {
    console.log("Dashboard actualizado");
    actualizarRevenuePorUnidad();
}
