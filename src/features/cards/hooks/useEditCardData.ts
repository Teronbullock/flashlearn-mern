import { useReducer, useEffect } from 'react';
import apiRequest from '../../../lib/api';
import { useAuthContext } from '../../../context/hooks/useAuthContext';

interface CardState {
  inputOneValue?: string;
  inputTwoValue?: string;
  bgColor?: string;
  textColor?: string;
}

type CardAction =
  | {
      type:
        | 'ON_INPUT_ONE_CHANGE'
        | 'ON_INPUT_TWO_CHANGE'
        | 'ON_BG_COLOR_CHANGE'
        | 'ON_TEXT_COLOR_CHANGE';
      payload: {
        inputOneValue?: string;
        inputTwoValue?: string;
        bgColor?: string;
        textColor?: string;
      };
    }
  | { type: 'RESET_COLORS' }
  | {
      type: 'ON_CARD_RELOAD';
      payload: CardState;
    };

const CardReducer = (state: CardState, action: CardAction) => {
  switch (action.type) {
    case 'ON_INPUT_ONE_CHANGE':
      return {
        ...state,
        inputOneValue: action.payload.inputOneValue,
      };
    case 'ON_INPUT_TWO_CHANGE':
      return {
        ...state,
        inputTwoValue: action.payload.inputTwoValue,
      };
    case 'ON_BG_COLOR_CHANGE':
      return {
        ...state,
        bgColor: action.payload.bgColor,
      };
    case 'ON_TEXT_COLOR_CHANGE':
      return {
        ...state,
        textColor: action.payload.textColor,
      };
    case 'ON_CARD_RELOAD':
      return {
        ...state,
        inputOneValue: action.payload.inputOneValue,
        inputTwoValue: action.payload.inputTwoValue,
        bgColor: action.payload.bgColor,
        textColor: action.payload.textColor,
      };
    case 'RESET_COLORS':
      return {
        ...state,
        bgColor: '#ffffff',
        textColor: '#000000',
      };
    default:
      return state;
  }
};

const useEditCardData = (
  cardId: string | undefined,
  setId: string | undefined
) => {
  const { token } = useAuthContext();

  const [state, dispatch] = useReducer(CardReducer, {
    inputOneValue: '',
    inputTwoValue: '',
    bgColor: '',
    textColor: '',
  });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
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
        config: {
          headers: { authorization: `Bearer ${token}` },
        },
        src: 'cardDataFetch - onSubmit',
      });

      if (res.data && res.status === 200) {
        const { msg } = res.data;
        alert(msg);
        console.log('Set data fetch');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Set data fetch error:', error.message, error);
      } else {
        console.error('Set data fetch error:', error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await apiRequest({
          url: `/api/set/${setId}/card/${cardId}/edit`,
          src: 'SetDataFetch - useEffect',
          config: { headers: { Authorization: `Bearer ${token}` } },
        });

        if (res.status >= 200 && res.status < 300 && res && res.data) {
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
        } else {
          throw new Error(
            'Failed to fetch card data' + res.status + res.data.msg
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Failed to fetch card data', {
            cause: error.message,
            error,
          });
        } else {
          console.error('Failed to fetch card data' + error);
        }
      }
    })();
  }, [token, cardId, setId]);

  return { state, submitHandler, dispatch };
};

export default useEditCardData;
