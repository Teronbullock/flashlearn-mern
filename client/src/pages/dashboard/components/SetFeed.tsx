import { Btn, BtnLink } from "@/components/btn";
import { ListCardForm } from "@components/forms";
import { useAuthContext, useSetForm } from "@/hooks/index";

interface Sets {
  id: number;
  user_id?: number;
  title: string;
  description?: string;
  cardCount?: number;
}

interface ItemFeedProps {
  userSlug: string;
  sets: Sets[];
}

export const SetFeed = ({ sets }: ItemFeedProps) => {
  const { userSlug } = useAuthContext();
  const { deleteSet } = useSetForm({});

  return (
    <section className="max-h-[750px] overflow-auto">
      {sets && sets.length > 0
        ? sets.map((item) => {
            const { id } = item;
            const data = {
              ...item,
              listType: "set",
            } as const;

            return (
              <ListCardForm
                onSubmit={() => deleteSet(id)}
                key={id}
                isSetFeed={true}
                {...data}
              >
                <div className="flex flex-wrap justify-between">
                  <div className="mb-2 flex">
                    <BtnLink
                      variants={{ style: "btn", color: "primary", size: "sm" }}
                      className="mr-2 p-0 md:mr-6 md:p-2"
                      to={`/set/${id}`}
                    >
                      View Set
                    </BtnLink>

                    <BtnLink
                      variants={{
                        style: "btn",
                        color: "outline-primary",
                        size: "sm",
                      }}
                      className="p-0 md:mr-6 md:p-2"
                      to={`/set/${id}/edit`}
                    >
                      Edit Set
                    </BtnLink>
                  </div>

                  <Btn
                    type="submit"
                    className="!min-w-[39px] !justify-end !p-0"
                  >
                    <img
                      src="/assets/img/Vector.png"
                      alt="icon of trash can"
                      className="mx-auto"
                    />
                  </Btn>
                </div>
              </ListCardForm>
            );
          })
        : null}
    </section>
  );
};
