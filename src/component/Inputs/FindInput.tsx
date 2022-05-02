import React, {useState} from 'react';
import {Input, InputGroup, InputLeftElement, InputRightElement} from "@chakra-ui/input";
import {Search2Icon} from "@chakra-ui/icons"
import {Button, Box,Text} from "@chakra-ui/react";
import {useGetAllCollisionQuery} from "../../generated/graphql";
import {useRouter} from "next/router";

function FindInput(props) {
    const router = useRouter();
    const [variables,setV] = useState({word:""});
    const [{data,fetching}] = useGetAllCollisionQuery({
        variables
    })
    if(!data||fetching){
        return(
            <>
                Пусто
            </>
        )
    }
    return (
        <div>
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    children={<Search2Icon color='gray.300' />}
                />
                <Input
                    onChange={(e)=>{
                        setV({word:e.target.value})
                    }}
                    value={variables.word}
                    pr='4.5rem'
                    placeholder='Введите название товара'
                />
                <InputRightElement width='4.5rem'>
                    <Button onClick={()=>{
                        router.push("/findbyname/"+variables.word)
                    }} colorScheme={"green"} h='1.75rem' size='sm'>
                        Поиск
                    </Button>
                </InputRightElement>
            </InputGroup>
            { data && <Box width={"100%"} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                {
                    data.getAllCollision.records.map(product=>(
                        <Box px={10} color={"gray.400"}>
                            <Text p={1} onClick={()=>{
                                setV({word:product.name})
                                router.push("/good/"+product._id)
                            }} _hover={{
                                background:"gray.400",
                                color:"white",
                                cursor:"pointer"
                            }}>{product.name}</Text>
                        </Box>
                    ))
                }
            </Box>
            }
        </div>
    );
}

export default FindInput;