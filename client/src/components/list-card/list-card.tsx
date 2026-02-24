import { Card } from "@components/ui/card/Card";

interface ListCardProps {
  children: React.ReactNode;
  id?: number | undefined;
}

/**
 *
 * @param children - type form
 * @returns
 */
export const ListCard = ({ children, id }: ListCardProps) => {
  return (
    <Card
      spacing={false}
      className="border-primary mb-5 border bg-white p-2.5 text-black md:p-4"
      keyDataType={id}
    >
      <div>{children}</div>
    </Card>
  );
};
