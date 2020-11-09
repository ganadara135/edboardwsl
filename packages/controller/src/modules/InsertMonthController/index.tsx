import * as React from 'react';
import {graphql, ChildMutateProps} from 'react-apollo';
import gql from 'graphql-tag';
import { InsertMonthMutation, InsertMonthMutationVariables } from '../../schemaTypes';
import { normalizeErrors } from '../../utils/normalizeErrors';
import { NormalizedErrorMap } from '../../types/NormalizedErrorMap';

interface Props {
    children: 
    // (submit: (values: InsertMonthMutationVariables) => Promise<NormalizedErrorMap | null>)
       (data: {submit: (values: InsertMonthMutationVariables) => Promise<NormalizedErrorMap | null>})
     => JSX.Element | null;
}

class C extends React.PureComponent<
 ChildMutateProps<Props, any, InsertMonthMutationVariables>
> {

    submit = async (values: InsertMonthMutationVariables) => {
        console.log("controller : ", values);
        const {data: {insertMonth}} = await this.props.mutate({
            variables: values
            // variables: {insertGoal: values} as any 
        })
        // console.log('response : ', insertMonth);
        if (!insertMonth.ok) {
            return normalizeErrors(insertMonth);
        } 
        return null;
    }

    render() {
        return this.props.children({ submit: this.submit });
    }
}

const INSERTMONTH_MUTATION = gql`
    mutation InsertMonthMutation($edboardName: String!, $month: Int!, $goal: Int!, $yearName: Int!, $description: String
    ){
        insertMonth(edboardName: $edboardName, month: $month, goal: $goal, yearName: $yearName, description: $description){
            ok
            message
            path
        }
    }
`;

export const InsertMonthController = graphql<
    Props,
    InsertMonthMutation,
    InsertMonthMutationVariables
>(INSERTMONTH_MUTATION)(C);