import * as React from 'react';
import {graphql, ChildMutateProps} from 'react-apollo';
import gql from 'graphql-tag';
import { CreateEDBoardMutation, CreateEDBoardMutationVariables } from '../../schemaTypes';
import { normalizeErrors } from '../../utils/normalizeErrors';
import { NormalizedErrorMap } from '../../types/NormalizedErrorMap';

interface Props {
    children: 
        (data: {submit: (values: CreateEDBoardMutationVariables) => Promise<NormalizedErrorMap | null>})
     => JSX.Element | null;
}

class C extends React.PureComponent<
 ChildMutateProps<Props, any, CreateEDBoardMutationVariables>
> {

    submit = async (values: CreateEDBoardMutationVariables) => {
        console.log("cont: ", values);
        const {data: {createEDBoard}} = await this.props.mutate({
        // const data  = await this.props.mutate({
            variables: values
            // variables: {insertGoal: values} as any 
        })        
        // console.log('data : ', data)
        console.log('response : ', createEDBoard);

        if (!createEDBoard.ok) {
            return normalizeErrors(createEDBoard );
        }
        return null;
    };

    render() {
        return this.props.children({ submit: this.submit });
    }
}

const CREATEEDBOARD_MUTATION = gql`
    mutation CreateEDBoardMutation($name: String!, $description: String!) {
        createEDBoard(name: $name, description: $description){
            ok
            message
            path
        }
    }
`;

export const CreateEDBoardController = graphql<
    Props,
    CreateEDBoardMutation,
    CreateEDBoardMutationVariables
>(CREATEEDBOARD_MUTATION)(C);