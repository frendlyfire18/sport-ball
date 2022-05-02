import React, {InputHTMLAttributes, useState} from 'react';
import {FormControl, FormErrorMessage, FormLabel} from "@chakra-ui/form-control";
import {useField} from "formik";
import {Select} from "@chakra-ui/react";
import {useGetAllCategoriesQuery} from "../../generated/graphql";

type InputSelectFieldInterface = InputHTMLAttributes<HTMLInputElement> & {
    label:string;
    placeholder:string;
    name:string;
    data:string[];
};

const FixedInputSelectField:React.FC<InputSelectFieldInterface> = (props) => {
    const [field,{error}] = useField(props);
    const [catValue,setCatValue] = useState("")
    return (
        <>
            <FormControl pt={5} isInvalid={!!error}>
                <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
                <Select
                    {...field}
                    id={field.name}
                    placeholder={props.placeholder}
                    my={5}>
                    {
                        props.data?.map((category,value)=>(
                            <option value={category}>{category}</option>
                        ))
                    }
                </Select>
                <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
        </>
    );
};

export default FixedInputSelectField;