import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface DestructureMessage {
    location : {
        state : {
            message : string;
        }
    }
}

export class TextPage extends React.PureComponent<
    RouteComponentProps<{}>> {
    render() {
        console.log("this.props : ", this.props);
        const {
            location: {state: {message}} 
        } = this.props as unknown as DestructureMessage; // or as any;

        console.log("message : ", message)

        return <h2>{message ? message : "hello"}</h2>;
    }
}
