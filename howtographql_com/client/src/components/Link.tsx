import { gql, useMutation } from "@apollo/client";

import { AUTH_TOKEN } from "../constants";
import type { LinkType } from "../utils/types";
import { timeDifferenceForDate } from "../utils/utils";
import { FEED_QUERY } from "./LinkList";

interface LinkProps {
  link: LinkType;
  index: number;
}

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        voters {
          id
          # user {
          #   id
          # }
        }
      }
      # user {
      #   id
      # }
    }
  }
`;

type FeedQueryResult = {
  feed: {
    links: LinkType[];
  };
};

export const Link = ({ link, index }: LinkProps) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id,
    },
    update: (cache, { data: { vote } }) => {
      const data = cache.readQuery<FeedQueryResult>({
        query: FEED_QUERY,
      });

      if (!data) return;

      const updatedLinks = data.feed.links.map((feedLink: LinkType) => {
        if (feedLink.id === link.id) {
          return {
            ...feedLink,
            votes: [...feedLink.votes, vote],
          };
        }
        return feedLink;
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: updatedLinks,
          },
        },
      });
    },
  });

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <div
            className="ml1 gray f11"
            style={{ cursor: "pointer" }}
            onClick={() => {
              vote();
            }}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        {
          <div className="f6 lh-copy gray">
            {link?.votes?.length} votes | by{" "}
            {link.postedBy ? link.postedBy.name : "Unknown"}{" "}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        }
      </div>
    </div>
  );
};
