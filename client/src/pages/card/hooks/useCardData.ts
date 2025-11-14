import { useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/index";
import type { Card } from "@/types/cardType";
import { fetchCard, getApiConfig } from "@/lib/api";

export const useCardData = (
  setId: string | undefined,
  pageNum: string | null,
) => {
  const { token } = useAuthContext();
  const [card, setCard] = useState<Card | null>(null);
  const [cardCount, setCardCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCardData = async (signal: AbortSignal) => {
      if (!setId || !pageNum || !token) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const apiConfig = getApiConfig(token);
        apiConfig["signal"] = signal;
        const res = await fetchCard({ setId, pageNum, apiConfig });

        if (!res) {
          setCard(null);
          setCardCount(0);
          return;
        }

        setCard(res.card);
        setCardCount(res.count);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
          setCard(null);
          setCardCount(0);
        }
      } finally {
        setIsLoading(false);
      }
    };

    const controller = new AbortController();
    fetchCardData(controller.signal);

    return () => {
      controller.abort();
    };
  }, [pageNum, setId, token]);

  return { card, cardCount, isLoading, error };
};
