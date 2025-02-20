import { useEffect, useState, useCallback, useMemo, useReducer } from 'react';
import apiRequest from '@/lib/api';
import { useAuthContext } from '@/context/hooks/useAuthContext';

interface ICardReducerState {
  inputOneValue?: string;
  inputTwoValue?: string;
  bgColor?: string;
  textColor?: string;
}

interface ICardReducerAction {
  type:
    | 'SET_INPUT_ONE'
    | 'SET_INPUT_TWO'
    | 'RESET'
    | 'RESET_COLORS'
    | 'ON_CARD_RELOAD'
    | 'SET_BG_COLOR'
    | 'SET_TEXT_COLOR';
  payload?: ICardReducerState;
}

interface IManageCardData {
  isGetCards?: boolean;
  isEditCard?: boolean;
  cardId?: string | undefined;
  setId?: string | undefined;
}

interface ICardData {
  id: string;
  term: string;
  definition: string;
  set_id: string;
}

const CardReducer = (state: ICardReducerState, action: ICardReducerAction) => {
  console.log('payload', action.payload);
  switch (action.type) {
    case 'SET_INPUT_ONE':
    case 'SET_INPUT_TWO':
      return { ...state, ...action.payload };
    case 'SET_BG_COLOR':
    case 'SET_TEXT_COLOR':
      return { ...state, ...action.payload };
    case 'RESET':
      return { inputOneValue: '', inputTwoValue: '', bgColor: '#ffffff', textColor: '#000000' };
    case 'ON_CARD_RELOAD':
      return { ...state, ...action.payload };
    case 'RESET_COLORS':
      return { ...state, bgColor: '#ffffff', textColor: '#000000' };
    default:
      return state;
  }
};

const useManageCardData = ({ isGetCards, isEditCard, cardId, setId }: IManageCardData = {}) => {
  const [cards, setCards] = useState<ICardData[]>([]);
  const { token } = useAuthContext();
  const [state, dispatch] = useReducer(CardReducer, {
    inputOneValue: '',
    inputTwoValue: '',
    bgColor: '#ffffff',
    textColor: '#000000',
  });

  const apiConfig = useMemo(
    () => ({
      headers: { Authorization: `Bearer ${token}` },
    }),
    [token]
  );

  // get Card Data
  const getCardData = useCallback(async () => {
    try {
      const res = await apiRequest({
        url: `/api/set/${setId}`,
        config: apiConfig,
      });

      setCards(res.data.cards);
    } catch (err) {
      console.error(err);
      setCards([]);
      throw err;
    }
  }, [apiConfig, setId]);

  // Add Card Handler
  const addCardHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        const res = await apiRequest({
          method: 'post',
          url: `/api/set/${setId}/card/add`,
          data: {
            term: state.inputOneValue,
            definition: state.inputTwoValue,
            setId,
          },
          config: apiConfig,
        });

        alert(res.data.msg);
        dispatch({ type: 'RESET', payload: {} });

        const termInput = document.querySelector('#term') as HTMLInputElement;

        if (termInput) {
          termInput.focus();
        }
      } catch (err) {
        console.error(err);
        alert(err);
      }
    },
    [apiConfig, setId, state.inputOneValue, state.inputTwoValue]
  );

  // Edit Card Handler
  const editCardHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const res = await apiRequest({
          method: 'put',
          url: `/api/set/${setId}/card/${cardId}/edit`,
          data: {
            term: state.inputOneValue,
            definition: state.inputTwoValue,
            bg_color: state.bgColor,
            text_color: state.textColor,
            id: cardId,
          },
          config: apiConfig,
        });

        alert(res.data.msg);
      } catch (err) {
        console.error('Set data fetch error:', err);
        alert(err);
      }
    },
    [apiConfig, cardId, setId, state.bgColor, state.inputOneValue, state.inputTwoValue, state.textColor]
  );

  // Delete Card Handler
  const deleteCardHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>, cardId: string, setId: string) => {
      e.preventDefault();

      if (!setId || !cardId) {
        throw new Error('Error: card not delete');
      }
      try {
        const res = await apiRequest({
          method: 'delete',
          url: `/api/set/${setId}/card/${cardId}/delete`,
          config: apiConfig,
        });

        const { msg } = res.data;
        alert(msg);
        getCardData();
      } catch (err) {
        console.error(err);
        alert('Error: card not delete');
      }
    },
    [apiConfig, getCardData]
  );

  // useEffect for edit card functions
  useEffect(() => {
    if (isEditCard) {
      const fetchCardData = async () => {
        try {
          const res = await apiRequest({
            url: `/api/set/${setId}/card/${cardId}/edit`,
            config: apiConfig,
          });

          const { term, definition, bg_color, text_color } = res.data.card;

          dispatch({
            type: 'ON_CARD_RELOAD',
            payload: {
              inputOneValue: term,
              inputTwoValue: definition,
              bgColor: bg_color,
              textColor: text_color,
            },
          });
          return;
        } catch (err) {
          console.error('Failed to fetch card data', err);
          alert('Failed to fetch card data');
        }
      };

      fetchCardData();
    }
  }, [apiConfig, cardId, isEditCard, setId]);

  // useEffect for fetching card functions
  useEffect(() => {
    if (isGetCards) {
      getCardData();
    }
  }, [isGetCards, getCardData, setId, token]);

  return { cards, addCardHandler, editCardHandler, deleteCardHandler, state, dispatch };
};

export default useManageCardData;
