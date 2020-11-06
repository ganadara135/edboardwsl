// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {  ListEDboardQuery, ListYearQuery } from '../../schemaTypes';

const LISTBOARDYEAR_QUERY = gql`
  query ($yearName: Int!, $boardName: String) {
    listEDboardQuery
    listYearQuery(yearName: $yearName, boardName: $boardName)
  }
`;


export interface WithListBoardYear {
  listingBoard: (string | null)[] | null;
  listingYear: (number | null)[] | null;
  loading: boolean;
}

interface Props {
  yearName: number;
  boardName: string;
  children: (data: WithListBoardYear) => JSX.Element | null;
}

export class ListBoardYearController extends React.PureComponent<Props> {
  render() {
    const { children, yearName, boardName } = this.props;
    return (
      <Query<ListEDboardQuery & ListYearQuery>
        query={LISTBOARDYEAR_QUERY}
        variables={{ yearName: yearName, boardName: boardName }}
        fetchPolicy="no-cache"
      >
        {({ data, loading }) => {
          let listingBoard: (string | null)[] | null = null;
          let listingYear: (number | null)[] | null = null;

          if (data && data.listEDboardQuery) {
            listingBoard = data.listEDboardQuery;
          }
          if (data && data.listYearQuery) {
            listingYear = data.listYearQuery;
          }
          console.log("listingBoard : ", listingBoard)
          console.log("listingYear : ", listingYear)

          return children({
            listingBoard,
            listingYear,
            loading
          });
        }}
      </Query>
    );
  }
}