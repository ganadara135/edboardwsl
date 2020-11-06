import * as React from 'react';
import {graphql, ChildMutateProps} from 'react-apollo';
import gql from 'graphql-tag';
import { EditMonthMutation, EditMonthMutationVariables } from '../../schemaTypes';
import { normalizeErrors } from '../../utils/normalizeErrors';
import { NormalizedErrorMap } from '../../types/NormalizedErrorMap';

interface Props {
    children: 
        (data: {submit: (values: EditMonthMutationVariables) => Promise<NormalizedErrorMap | null>})
     => JSX.Element | null;
}

class C extends React.PureComponent<
 ChildMutateProps<Props, any, EditMonthMutationVariables>
> {

    submit = async (values: EditMonthMutationVariables) => {
        console.log("cont: ", values);
        const {data: {editMonth}} = await this.props.mutate({
            variables: values
            // variables: {insertGoal: values} as any 
        })
        console.log('response : ', editMonth);

        if (!editMonth.ok) {
            return normalizeErrors(editMonth );
        } 
        console.log('response2222 : ', editMonth.ok);
        return null;
    };

    render() {
        return this.props.children({ submit: this.submit });
    }
}

const EDITMONTH_MUTATION = gql`
    mutation EditMonthMutation($m_id: ID!, $month: Int, $goal: Int, $description: String, $y_id: ID, $year: Int ){
        editMonth(m_id: $m_id, month: $month, goal: $goal, description: $description, y_id: $y_id, year: $year){
            ok
            message
            path
        }
    }
`;

export const EditMonthController = graphql<
    Props,
    EditMonthMutation,
    EditMonthMutationVariables
>(EDITMONTH_MUTATION)(C);