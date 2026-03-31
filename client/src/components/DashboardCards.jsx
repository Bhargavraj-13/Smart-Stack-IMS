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
          <h3 style={styles.title}>{card.title}</h3>
          <p style={styles.value}>{card.value}</p>
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
    background: "#ffffff",
    padding: "1rem",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },
  title: {
    margin: 0,
    marginBottom: "0.5rem",
    fontSize: "1rem"
  },
  value: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: "bold"
  }
};

export default DashboardCards;