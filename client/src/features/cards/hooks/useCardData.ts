import { useEffect, useState, useCallback, useRef } from "react";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { apiRequest } from "@/lib/api/api-request";

interface Card {
  id: string;
  // Add other card properties
}

interface UseCardDataParams {
  setId: string | undefined;
  cardId?: string | undefined;
  pageNum?: string | null;
}

// Convert pageNum (1-based string) to a 0-based index
const getCardIndex = (pageNum: string | null | undefined): number => {
  const page = parseInt(pageNum || "1", 10);
  return Math.max(0, page - 1);
};

export const useCardData = ({ setId, pageNum }: UseCardDataParams) => {
  const { token } = useAuthContext();

  const [list, setList] = useState<Card[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tokenRef = useRef<string | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  // Fetch ALL cards ONCE and cache them
  const fetchFullSet = useCallback(
    async (signal: AbortSignal) => {
      if (hasFetchedRef.current && list.length > 0) {
        setIsLoading(false);
        return;
      }

      if (!tokenRef.current) {
        setError("User is not authenticated, auth info missing.");
        setIsLoading(false);
        return;
      }

      if (!setId) {
        setError("Set data missing");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const res = await apiRequest({
          url: `/sets/${setId}/cards`,
          token: tokenRef.current,
          signal,
        });

        if (!signal.aborted) {
          setList(res.data.cards || []);
          setCount(res.data.cards?.length || 0);
          hasFetchedRef.current = true;
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
          setList([]);
          setCount(0);
          console.error("Card data fetch failed:", err);
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    [setId, list.length],
  );

  // Fetch on mount or when setId changes
  useEffect(() => {
    const controller = new AbortController();
    fetchFullSet(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchFullSet]);

  // Reset cache when setId changes
  useEffect(() => {
    hasFetchedRef.current = false;
    setList([]);
    setCount(0);
    setIsLoading(true);
  }, [setId]);

  const cardIndex = getCardIndex(pageNum);
  const currentCard = list[cardIndex] || null;

  return {
    card: currentCard,
    cardList: list,
    cardCount: count,
    isLoading,
    error,
    refetch: fetchFullSet,
  };
};

// import { useEffect, useState, useCallback, useRef } from "react";
// import { useAuthContext } from "@feats/auth/context/AuthContext";
// import { apiRequest } from "@/lib/api/api-request";

// interface UseCardDataParams {
//   setId: string | undefined;
//   cardId?: string | undefined;
//   pageNum?: string | null;
// }

// // convert pageNum (1-based string) to a 0-based index
// const getCardIndex = (pageNum: string | null | undefined): number => {
//   const page = parseInt(pageNum || "1", 10);
//   return Math.max(0, page - 1);
// };

// export const useCardData = ({ setId, pageNum }: UseCardDataParams) => {
//   const { token } = useAuthContext();
//   const [card, setCard] = useState<Card | null>(null);
//   const [list, setList] = useState<Card[]>([]);
//   const [count, setCount] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const tokenRef = useRef<string | null>(null);
//   useEffect(() => {
//     tokenRef.current = token;
//   }, [token]);

//   // Fetch ALL Cards
//   const fetchFullSet = useCallback(
//     async (signal: AbortSignal) => {

//       if (!tokenRef.current) {
//         throw new Error("User is not authenticated, auth info missing.");
//       }

//       if (!setId) {
//         throw new Error("set data missing");
//       }

//       // if (state.list.length > 0) {
//       //   setState((s) => ({}
//       //     console.log("s", ...s)
//       //     // { ...s, isLoading: false }
//       //   ));
//       //   return;
//       // }

//       // setState((s) => ({ ...s, isLoading: true, error: null }));

//       try {
//         const res = await apiRequest({
//           url: `/sets/${setId}/cards`,
//           token: tokenRef.current,
//           signal,
//         });

//         setState((s) => ({
//           ...s,
//           list: res.data.cards || [],
//           count: res.data.cards.length || 0,
//         }));
//       } catch (err: unknown) {
//         if (err instanceof Error && err.name !== "AbortError") {
//           setState((s) => ({
//             ...s,
//             error: err.message,
//             card: null,
//             list: [],
//             count: 0,
//           }));
//           console.error("Card data fetch failed:", err);
//         }
//       } finally {
//         setState((s) => ({ ...s, isLoading: false }));
//       }
//     },
//     [setId, state.list.length],
//   );

//   useEffect(() => {
//     const controller = new AbortController();
//     fetchFullSet(controller.signal);
//     return () => controller.abort();
//   }, [fetchFullSet]);

//   // get current card
//   const cardIndex = getCardIndex(pageNum);
//   const currentCard = state.list[cardIndex] || null;

//   return {
//     card: currentCard,
//     cardList: state.list,
//     cardCount: state.count,
//     isLoading: state.isLoading,
//     error: state.error,
//   };
// };
