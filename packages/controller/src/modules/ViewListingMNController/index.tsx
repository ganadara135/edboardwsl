// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { ViewListingMNQuery_viewListingMN, ViewListingMNQuery, ViewListingMNQueryVariables } from '../../schemaTypes';

const VEIWLISTINGMN_QUERY = gql`
    query ViewListingMNQuery($yearName: Int!) {
        viewListingMN(yearName:$yearName){
            mnInfo{
                id
                mgid{
                    id
                    month
                    ymmns{
                        id
                        description
                        mgid{
                            id
                        }
                    }
                }
                ygid{
                    id
                    year
                    ymmns{
                        id
                        description
                        mgid{
                            id
                        }
                    }
                }
            }
            monthInfo{
                id
            }
            yearInfo{
                id
            }
        }
    }
`;


export interface WithViewListing {
  listing: ViewListingMNQuery_viewListingMN | null;
  loading: boolean;
}

interface Props {
  yearName: number;
  children: (data: WithViewListing) => JSX.Element | null;
}

export class ViewListingMNController extends React.PureComponent<Props> {
  render() {
    const { children, yearName } = this.props;
    return (
      <Query<ViewListingMNQuery, ViewListingMNQueryVariables>
        query={VEIWLISTINGMN_QUERY}
        variables={{ yearName }}
      >
        {({ data, loading }) => {
          let listing: ViewListingMNQuery_viewListingMN | null = null;

          if (data && data.viewListingMN) {
            listing = data.viewListingMN;
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