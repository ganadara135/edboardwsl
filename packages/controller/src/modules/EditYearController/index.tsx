import * as React from 'react';
import {graphql, ChildMutateProps} from 'react-apollo';
import gql from 'graphql-tag';
import { EditYearMutation, EditYearMutationVariables } from '../../schemaTypes';
import { normalizeErrors } from '../../utils/normalizeErrors';
import { NormalizedErrorMap } from '../../types/NormalizedErrorMap';

interface Props {
    children: 
        (data: {submit: (values: EditYearMutationVariables) => Promise<NormalizedErrorMap | null>})
     => JSX.Element | null;
}

class C extends React.PureComponent<
 ChildMutateProps<Props, any, EditYearMutationVariables>
> {

    submit = async (values: EditYearMutationVariables) => {
        console.log("cont: ", values);
        const {data: {editYear}} = await this.props.mutate({
            variables: values,
            // variables: {insertGoal: values} as any 
            fetchPolicy: "no-cache"
        })
        console.log('response : ', editYear);

        if (!editYear.ok) {
            return normalizeErrors(editYear );
        } 
        console.log('response2222 : ', editYear.ok);
        return null;
    };

    render() {
        return this.props.children({ submit: this.submit });
    }
}

const EDITYEAR_MUTATION = gql`
    mutation EditYearMutation($y_id: ID!, $year: Int, $goal: Int, $description: String
    ){
        editYear(y_id: $y_id, year: $year, goal: $goal, description: $description){
            ok
            message
            path
        }
    }
`;

export const EditYearController = graphql<
    Props,
    EditYearMutation,
    EditYearMutationVariables
>(EDITYEAR_MUTATION)(C);