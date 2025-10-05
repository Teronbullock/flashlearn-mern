import { Card } from "@components/Card";
import { FormLayout } from "@components/Forms/FormLayout";

interface ListCardFormProps {
  title: string;
  description?: string;
  cardCount?: number;
  isSetFeed?: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  hasDescription?: boolean;
}

/**
 *
 * @param children - type form
 * @returns
 */
export const ListCardForm = ({
  title,
  description,
  cardCount = 0,
  onSubmit,
  children,
  hasDescription = false,
  isSetFeed = false,
}: ListCardFormProps) => {
  return (
    <Card
      spacing={false}
      className="border-primary mb-5 border bg-white p-4 text-black"
    >
      <FormLayout onSubmit={onSubmit}>
        <div className="flex flex-wrap justify-between">
          <h3 className="mb-6 text-base">{title}</h3>
          {isSetFeed &&
            (cardCount || cardCount === 0 ? (
              <p className="card__body-info-title my-0">Terms: {cardCount}</p>
            ) : null)}
        </div>
        {hasDescription && (
          <div className="mb-6">
            <p className="line-clamp line-clamp--2 mb-0 text-base">
              {description}
            </p>
          </div>
        )}
        <div>{children}</div>
        <input type="hidden" name="_method" value="DELETE" />
      </FormLayout>
    </Card>
  );
};
