import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {  GetMonthQuery, GetMonthQueryVariables, EditMonthMutationVariables } from '../../schemaTypes';

const GETMONTH_QUERY = gql`
    query GetMonthQuery($m_id: ID!) {
      getMonthQuery(m_id:$m_id){
        id
        month
        goal
        description
      }
    }
`;

export interface WithGetMonth {
  getData: EditMonthMutationVariables | null;
  loading: boolean;
}

interface Props {
  m_id: string;
  children: (data: WithGetMonth) => JSX.Element | null;
}

export class GetMonthController extends React.PureComponent<Props> {
  render() {
    const { children, m_id } = this.props;
    return (
      <Query<GetMonthQuery, GetMonthQueryVariables>
        query={GETMONTH_QUERY}
        variables={{ m_id }}
        fetchPolicy="no-cache"
      >
        {({ data, loading }) => {
          let getData: EditMonthMutationVariables | null = null;

          if (data && data.getMonthQuery) {
            getData = data.getMonthQuery as unknown as EditMonthMutationVariables;
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