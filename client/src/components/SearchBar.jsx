import theme from "../theme";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div style={styles.wrapper}>
      <input
        type="text"
        placeholder="Search by product name or category"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  wrapper: {
    marginBottom: "1.5rem"
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: `1px solid ${theme.colors.border}`,
    background: theme.colors.surface,
    color: theme.colors.textPrimary,
    fontSize: "1rem"
  }
};

export default SearchBar;