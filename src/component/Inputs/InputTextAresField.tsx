import React, {InputHTMLAttributes} from 'react';
import {FormControl, FormErrorMessage, FormLabel} from "@chakra-ui/form-control";
import {Input} from "@chakra-ui/input";
import {useField} from "formik";
import {Textarea} from "@chakra-ui/react";

type InputFieldInterface = InputHTMLAttributes<HTMLInputElement> & {
    type:string;
    label:string;
    placeholder:string;
    name:string;
};

const InputTextAreaField:React.FC<InputFieldInterface> = (props) => {
    const [field,{error}] = useField(props);
    return (
        <>
            <FormControl pt={5} isInvalid={!!error}>
                <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
                <Textarea {...field} id={field.name} placeholder={props.placeholder} />
                <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
        </>
    );
};

export default InputTextAreaField;