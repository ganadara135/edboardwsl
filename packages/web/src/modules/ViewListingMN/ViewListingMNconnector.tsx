import * as React from "react";
import { ViewListingMNController  } from "@abb/controller";
import { RouteComponentProps, Link } from "react-router-dom";


import { Card } from 'antd';
// const { Meta } = Card;

export class ViewListingMNConnector extends React.PureComponent<
  RouteComponentProps<{   // RouteComponentProps 는  string 타입만 파라미터로 받음
    yearName: any
  }>
> {
  render() {
    // const {
    //   match: {
    //     params: { yearName }
    //   }
    // } = this.props;
    return (
      <ViewListingMNController yearName={2020}>
        {(data) => {
          console.log(data);
          if (data.loading) {
            return <div >...loading</div>
          }

          return (
            <div>
              {data.listing?.mnInfo?.map(l => (
                <Card
                  key={`${l?.id}-card`}
                  hoverable={true}
                  // style={{ marginLeft: 500, display: "flex", justifyContent: "center" }}
                  // cover={ }
                >
                  <Link to={`/listing/${l?.id}-mm`}>
                    <Card.Meta title={l?.ygid?.year + '년'}  description={l?.id} >
                    {l?.id}
                      {/* {l.} */}
                    </Card.Meta>

                  </Link>
                </Card>
              ))}
            </div>
          );
        }}
      </ViewListingMNController>
    );
  }
}