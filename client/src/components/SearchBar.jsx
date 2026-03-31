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
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem"
  }
};

export default SearchBar;