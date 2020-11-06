// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {  ListYearQuery, ListYearQueryVariables } from '../../schemaTypes';

const LISTYEAR_QUERY = gql`
    query ListYearQuery($yearName: Int!, $boardName: String) {
      listYearQuery(yearName: $yearName, boardName: $boardName)
    }
`;


export interface WithListYear {
  listing: (number | null)[] | null;
  loading: boolean;
}

interface Props {
  yearName: number;
  boardName: string;
  children: (data: WithListYear) => JSX.Element | null;
}

export class ListYearController extends React.PureComponent<Props> {
  render() {
    const { children, yearName, boardName } = this.props;
    return (
      <Query<ListYearQuery, ListYearQueryVariables>
        query={LISTYEAR_QUERY}
        variables={{ yearName: yearName, boardName: boardName }}
        fetchPolicy="no-cache"
      >
        {({ data, loading }) => {
          let listing: (number | null)[] | null = null;

          if (data && data.listYearQuery) {
            listing = data.listYearQuery;
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