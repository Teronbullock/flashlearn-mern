import { type SetSelectType, type CardSelectType } from "@flashlearn/schema-db";

interface Sets extends SetSelectType {
  cardCount?: number;
}

interface ResourceFeedProps<T> {
  resourceInfo: T[];
  renderActions: (resource: T) => React.ReactNode;
}

export const ResourceFeed = <T extends Sets | CardSelectType>({
  resourceInfo,
  renderActions,
}: ResourceFeedProps<T>) => {
  return (
    <section className="max-h-187.5 overflow-auto">
      {resourceInfo && resourceInfo.length > 0
        ? resourceInfo.map((resource) => renderActions(resource))
        : null}
    </section>
  );
};
