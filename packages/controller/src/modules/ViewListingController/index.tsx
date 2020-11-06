// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { ViewListingQuery_viewListing, ViewListingQuery, ViewListingQueryVariables } from '../../schemaTypes';

// const VEIWLISTING_QUERY = gql`
//   query ViewListingQuery($yearName: Int!) {
//     viewListing(yearName:$yearName){
//       ordered
//     }
//   }
// `;
const VEIWLISTING_QUERY = gql`
  query ViewListingQuery($yearName: Int!,$boardName: String!) {
    viewListing(yearName:$yearName, boardName:$boardName){
      ordered
    }
  }
`;


export interface WithViewListingRaw {
  listing: ViewListingQuery_viewListing | null;
  loading: boolean;
}

interface Props {
  yearName: number;
  boardName: string;
  children: (data: WithViewListingRaw) => JSX.Element | null;
}

export class ViewListingController extends React.PureComponent<Props> {
  render() {
    console.log("0000000000000000000000000000")
    const { children, yearName, boardName } = this.props;
    console.log("yearName in controller : ", yearName);
    console.log("boardName in controller : ", boardName);
    return (
      (boardName === undefined || yearName === undefined) ? [] :      // undefined 의 넘겨줄시에 내부적으로 Graphql internal-server 에러 발생
      <Query<ViewListingQuery, ViewListingQueryVariables>
        query={VEIWLISTING_QUERY}
        variables={{ yearName: yearName, boardName: boardName }}
        fetchPolicy="no-cache"
      >
        {({ data, loading }) => {
          let listing: ViewListingQuery_viewListing | null = null;

          if (data && data.viewListing) {
            listing = data.viewListing;
          }

         
          // data.viewListing !== undefined ? console.log("data : ", data.viewListing) : []

          console.log("loading in controller : ", loading)
          // console.log("data.viewListing?.ordered in controller : ", data?.viewListing?.ordered)
          console.log("listing in controller : ", listing)

          return children({
            listing,
            loading
          });
        }}
      </Query>
    );
  }
}