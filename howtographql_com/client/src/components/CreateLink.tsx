import { useState } from "react";

import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import type { LinkType } from "../utils/types";
import { FEED_QUERY } from "./LinkList";

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

type FeedQueryResult = {
  feed: {
    links: LinkType[];
  };
};

export const CreateLink = () => {
  const [formState, setFormState] = useState({
    description: "",
    url: "",
  });

  const navigate = useNavigate();

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url,
    },
    update: (cache, { data: { post } }) => {
      const data = cache.readQuery<FeedQueryResult>({
        query: FEED_QUERY,
      });

      if (!data) return;

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: [post, ...data.feed.links],
          },
        },
      });
    },

    onCompleted: () => navigate("/"),
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.description}
            onChange={(e) => {
              setFormState({
                ...formState,
                description: e.target.value,
              });
            }}
            type="text"
            placeholder="A description for the link"
          />
        </div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.url}
            onChange={(e) => {
              setFormState({
                ...formState,
                url: e.target.value,
              });
            }}
            type="text"
            placeholder="A url for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
