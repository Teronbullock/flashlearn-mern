import { useEffect, useState } from "react";
import apiRequest from "@/lib/api";
import { useAuthContext } from "@/hooks/index";

const useGetCardView = (setId: string | undefined, pageNum: string | null) => {
  const [card, setCard] = useState();
  const [cardCount, setCardCount] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { token } = useAuthContext();

  const handleFlip = () => setIsFlipped((prev) => !prev);
  const handleNavigation = () => setIsFlipped(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiRequest({
          url: `/api/set/${setId}/cards/?page=${pageNum}`,
          config: {
            headers: { authorization: `Bearer ${token}` },
          },
        });

        if (res.status === 200 && res.data) {
          const { card, count } = res.data;
          setCard(card);
          setCardCount(count);
        } else {
          throw new Error(`Error fetching cards ${res.status}`);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error);
        }
      }
    })();
  }, [pageNum, setId, token]);

  return {
    card,
    cardCount,
    isFlipped,
    setIsFlipped,
    handleFlip,
    handleNavigation,
  };
};

export default useGetCardView;
