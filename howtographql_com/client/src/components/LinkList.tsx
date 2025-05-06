import { gql, useQuery } from "@apollo/client";

import type { LinkType } from "../utils/types";
import { Link } from "./Link";

export const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        voters {
          id
        }
      }
    }
  }
`;

export const LinkList = ({ index }: { index: number }) => {
  const { data } = useQuery(FEED_QUERY);

  return (
    <div>
      {data && (
        <>
          {data.feed.links.map((link: LinkType) => (
            <Link key={link.id} link={link} index={index} />
          ))}
        </>
      )}
    </div>
  );
};
