import * as React from "react";
import {InsertYearController} from '@abb/controller';
import { InsertYearView } from "./ui/InsertYearView";
import { RouteComponentProps } from "react-router-dom";


interface DestructureParams {
    match : {
        params : {
            boardName : string;
        }
    }
}

export class InsertYearConnector extends React.PureComponent<
    RouteComponentProps<{}>
> {
    onFinish = () => {
        this.props.history.push('/donemsg', {
            message: "등록이 완료 됐습니다."
        });
    }

    dummySubmit = async (values: any) => {
        console.log(values);
        return null;
    };
    // location: {state: {message}} 
    render() {   
        console.log("boardName in InsertYearConnector : ", this.props.match.params);
        const {
            match : { params : { boardName }}
        } = this.props as unknown as DestructureParams; // or as any;
        console.log(boardName)
        return (
            <InsertYearController >
            {({ submit } : any) => 
            <InsertYearView 
                        onFinish={this.onFinish} 
                        submit={submit} 
                        boardName={boardName}
            />} 
            </InsertYearController>
        );
    }
}