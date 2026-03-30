import React, { useEffect, useState } from 'react';
import { fetchAnalytics } from '../api';
import './Analytics.css';

function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      const { data: analytics } = await fetchAnalytics();
      setData(analytics);
      setError('');
    } catch {
      setError('Could not load analytics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">Sales Analytics</h2>

      {loading && <p className="analytics-loading">Loading…</p>}
      {error && <p className="analytics-error">{error}</p>}

      {data && (
        <div className="analytics-grid">
          <div className="analytics-card">
            <span className="analytics-label">Total Sales</span>
            <span className="analytics-value">{data.totalSales}</span>
          </div>

          <div className="analytics-card">
            <span className="analytics-label">Top Seller</span>
            {data.topSeller ? (
              <span className="analytics-value">
                {data.topSeller.product?.name || 'Unknown'}{' '}
                <small>({data.topSeller.totalSold} units)</small>
              </span>
            ) : (
              <span className="analytics-value analytics-none">No sales yet</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;
