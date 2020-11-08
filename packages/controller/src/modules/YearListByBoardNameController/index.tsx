// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
// import {  ListEDboardQuery, ListYearQuery } from '../../schemaTypes';
import { YearListByBoardNameQeury } from '../../schemaTypes';

// const LISTBOARDYEAR_QUERY = gql`
//   query ($yearName: Int!, $boardName: String) {
//     listEDboardQuery
//     listYearQuery(yearName: $yearName, boardName: $boardName)
//   }
// `;
const YEARLISTBYBOARDNAME_QUERY = gql`
  query YearListByBoardNameQeury($boardName: String) {
    yearListByBoardNameQeury(boardName: $boardName)
  }
`;

export interface WithYearList {
  // listingBoard: (string | null)[] | null;
  listingYear: (number | null)[] | null;
  loading: boolean;
}

interface Props {
  boardName: string;
  children: (data: WithYearList) => JSX.Element | null;
}

export class YearListByBoardNameController extends React.PureComponent<Props> {
  render() {
    const { children,  boardName } = this.props;
    return (
      <Query<YearListByBoardNameQeury>
        query={YEARLISTBYBOARDNAME_QUERY}
        variables={{ boardName: boardName }}
        fetchPolicy="no-cache"
      >
        {({ data, loading }) => {
          // let listingBoard: (string | null)[] | null = null;
          let listingYear: (number | null)[] | null = null;

          // if (data && data.listEDboardQuery) {
          //   listingBoard = data.listEDboardQuery;
          // }
          if (data && data.yearListByBoardNameQeury) {
            listingYear = data.yearListByBoardNameQeury;
          }
          // console.log("listingBoard : ", listingBoard)
          console.log("listingYear in Controller: ", listingYear)

          return children({
            // listingBoard,
            listingYear,
            loading
          });
        }}
      </Query>
    );
  }
}