import { useEffect, useState } from "react";
import { getDeals, getDeal } from "./api";

export function useDeals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDeals();
      setDeals(data);
    } catch (err) {
      setError(err.message || "Ошибка загрузки сделок");
      console.error("deals_load_error", { error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return { deals, loading, error, refetch: loadDeals };
}

export function useDeal(id) {
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) loadDeal(id);
  }, [id]);

  const loadDeal = async (dealId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDeal(dealId);
      setDeal(data);
    } catch (err) {
      setError(err.message || "Ошибка загрузки сделки");
      console.error("deal_load_error", { error: err.message, dealId });
    } finally {
      setLoading(false);
    }
  };

  return { deal, loading, error, refetch: () => loadDeal(id) };
}
