import theme from "../theme";

function DashboardCards({ products }) {
  const totalProducts = products.length;
  const inStockCount = products.filter((product) => product.stock >= 5).length;
  const lowStockCount = products.filter(
    (product) => product.stock > 0 && product.stock < 5
  ).length;
  const outOfStockCount = products.filter((product) => product.stock === 0).length;

  const cards = [
    { title: "Total Products", value: totalProducts },
    { title: "In Stock", value: inStockCount },
    { title: "Low Stock", value: lowStockCount },
    { title: "Out of Stock", value: outOfStockCount }
  ];

  return (
    <div style={styles.grid}>
      {cards.map((card) => (
        <div key={card.title} style={styles.card}>
          <p style={styles.title}>{card.title}</p>
          <h2 style={styles.value}>{card.value}</h2>
        </div>
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1rem",
    marginBottom: "2rem"
  },
  card: {
    background: `linear-gradient(180deg, ${theme.colors.surfaceLight}, ${theme.colors.surface})`,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius,
    padding: "1.2rem",
    boxShadow: theme.shadow
  },
  title: {
    margin: 0,
    marginBottom: "0.6rem",
    color: theme.colors.textSecondary,
    fontSize: "0.95rem"
  },
  value: {
    margin: 0,
    color: theme.colors.accent,
    fontSize: "2rem",
    fontWeight: "700"
  }
};

export default DashboardCards;