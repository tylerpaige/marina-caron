import { Post } from "./Post";
import { formatDateRange } from "../utilities";

export function Exhibition({ exhibition }) {
  return (
    <Post
      title={exhibition.title}
      additionalInfo={() => {
        if (!exhibition.location && !exhibition.startDate && !exhibition.endDate) {
          return null;
        } else if (exhibition.location && !exhibition.startDate && !exhibition.endDate) {
          return <>{exhibition.location}</>;
        } else {
          return <>{`${exhibition.location} ${formatDateRange(exhibition.startDate, exhibition.endDate)}`} </>;
        }
      }}
      description={exhibition.description}
      media={exhibition.media}
      externalUrl={exhibition.externalUrl}
    />
  );
}
