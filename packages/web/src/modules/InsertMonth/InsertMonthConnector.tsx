import * as React from "react";
import { InsertMonthController } from '@abb/controller';
// import { InsertMonthController } from '../../../../controller/dist/modules/InsertMonthController';  // '../  /controller/src/index';
// import {InsertYearController} from '@abb/controller';
import { InsertMonthView } from "./ui/InsertMonthView";
import { RouteComponentProps } from "react-router-dom";

interface DestructureParams {
    match : {
        params : {
            boardName : string;
        }
    }
}

export class InsertMonthConnector extends React.PureComponent<
    RouteComponentProps<{}>
> {
    onFinish = () => {
        this.props.history.push("/donemsg", {
            message: "등록이 완료 됐습니다."
        });
    }

    render() {   
        const {
            match : { params : { boardName }}
        } = this.props as unknown as DestructureParams; // or as any;
        console.log(boardName)
           
        return (
            <InsertMonthController >
            {({ submit }: any) => 
                <InsertMonthView 
                    onFinish={this.onFinish} 
                    submit={submit} 
                    boardName={boardName}   
                />} 
            </InsertMonthController>
        );
    }
}