import { Button, ButtonLink } from "@components/ui/button";
import type { BaseListCard } from "./types";

export const ListCardSetActions = ({ id }: BaseListCard) => {
  return (
    <div className="flex flex-wrap justify-between">
      <div className="mb-2 flex">
        <ButtonLink
          variants={{
            style: "btn",
            color: "primary",
            size: "sm",
          }}
          className="mr-2 p-0 md:mr-6 md:p-2"
          to={`/set/${id}`}
        >
          View Set
        </ButtonLink>

        <ButtonLink
          variants={{
            style: "btn",
            color: "outline-primary",
            size: "sm",
          }}
          className="p-0 md:mr-6 md:p-2"
          to={`/set/${id}/edit`}
        >
          Edit Set
        </ButtonLink>
      </div>

      <Button type="submit" className="min-w-9.75! justify-end! p-0!">
        <img
          src="/assets/img/Vector.png"
          alt="icon of trash can"
          className="mx-auto"
        />
      </Button>
    </div>
  );
};
