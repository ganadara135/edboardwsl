import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {  GetYearQuery, GetYearQueryVariables, YearGoalInput } from '../../schemaTypes';

const GETYEAR_QUERY = gql`
    query GetYearQuery($y_id: ID!) {
      getYearQuery(y_id:$y_id){
        id
        year
        goal
        description
      }
    }
`;


export interface WithGetYear {
  getData: YearGoalInput | null;
  loading: boolean;
}

interface Props {
  y_id: string;
  children: (data: WithGetYear) => JSX.Element | null;
}

export class GetYearController extends React.PureComponent<Props> {
  render() {
    const { children, y_id } = this.props;
    return (
      <Query<GetYearQuery, GetYearQueryVariables>
        query={GETYEAR_QUERY}
        variables={{ y_id }}
        fetchPolicy="no-cache"
      >
        {({ data, loading }) => {
          let getData: YearGoalInput | null = null;

          if (data && data.getYearQuery) {
            getData = data.getYearQuery;
          }

          return children({
            getData,
            loading
          });
        }}
      </Query>
    );
  }
}