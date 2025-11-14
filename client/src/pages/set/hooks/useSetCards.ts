import { useEffect, useState } from "react";
import { fetchAllCardsInSet, getApiConfig } from "@lib/api";

interface SetCardsProps {
  isEditCard?: boolean;
  setId: string;
  token: string;
}

interface ICardData {
  id: string;
  term: string;
  definition: string;
  set_id: string;
}

export const useSetCards = ({ isEditCard, setId, token }: SetCardsProps) => {
  const [cards, setCards] = useState<ICardData[] | null>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCards = async (signal: AbortSignal) => {
      try {
        const apiConfig = getApiConfig(token);
        apiConfig["signal"] = signal;
        const res = await fetchAllCardsInSet({ setId, apiConfig });

        setCards(res.cards);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
          setCards(null);
        }
      }
    };

    const controller = new AbortController();
    getCards(controller.signal);

    return () => {
      controller.abort();
    };
  }, [setId, token]);

  return { cards, error };
};
