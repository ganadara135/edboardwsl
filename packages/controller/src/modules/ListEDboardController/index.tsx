// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {  ListEDboardQuery } from '../../schemaTypes';

const LISTEDBOARD_QUERY = gql`
    query ListEDboardQuery {
      listEDboardQuery
    }
`;


export interface WithListEDboard {
  listing: (string | null)[] | null;
  loading: boolean;
}

interface Props {
  children: (data: WithListEDboard) => JSX.Element | null;
}

export class ListEDboardController extends React.PureComponent<Props> {
  render() {
    const { children, } = this.props;
    return (
      <Query<ListEDboardQuery>
        query={LISTEDBOARD_QUERY}
        // variables={ }
        fetchPolicy="no-cache"
      >
        {({ data, loading }) => {
          let listing: (string | null)[] | null = null;

          if (data && data.listEDboardQuery) {
            listing = data.listEDboardQuery;
          }

          return children({
            listing,
            loading
          });
        }}
      </Query>
    );
  }
}