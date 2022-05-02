import React, {useEffect, useState} from 'react';
import {
    SimpleGrid,
    Box,
    Center,
    Heading,
    Badge,
    Button,
    Radio,
    RadioGroup,
    Spinner,
    MenuDivider,
    MenuList,
    Stack,
    MenuItemOption, MenuButton, Menu, MenuOptionGroup
} from "@chakra-ui/react"
import Main from "../../layouts/Main";
import {
    useGetAllByNameQuery,
    useGetAllCollisionQuery
} from "../../generated/graphql";
import {withUrqlClient} from "next-urql";
import {CreateURQLClient} from "../../utils/CreateURQLClient";
import Head from "next/head"
import Card from "../../component/Card";
import LoadingCard from "../../component/LoadingCard";
import {useRouter} from "next/router";

const FindByName =(props)=> {
    const router = useRouter();
    const [variables,setV] = useState({name:router.query.name as string})
    const [{data,fetching}] = useGetAllByNameQuery(
        {
            variables,
        }
    )
    useEffect(() => {
        setV({name:router.query.name as string})
    },[router.query.name])
    if(fetching||!data){
        return(
            <div>
                <Head>
                    <title>Добро пожаловать на сайт зоо-магазина Zoo Love</title>
                </Head>
                <Main>
                    <Box>
                        <Center>
                            <Box py={10} width={"55%"}>
                                <Heading>
                                    Все товары <Badge rounded="full" px="4" fontSize="0.8em" bg={"black"} color={"white"}>
                                </Badge>
                                </Heading>
                            </Box>
                        </Center>
                        <Center>
                            <SimpleGrid columns={[1, null, 3]} spacingX='40px'>
                                <LoadingCard/>
                                <LoadingCard/>
                                <LoadingCard/>
                                <LoadingCard/>
                            </SimpleGrid>
                        </Center>
                    </Box>
                </Main>
            </div>
        )
    }
    return (
        <div>
            <Head>
                <title>Добро пожаловать на сайт зоо-магазина Zoo Love</title>
            </Head>
            <Main>
                <Box>
                    <Center>
                        <Box py={10} width={"55%"}>
                            <Heading>
                                Все товары <Badge rounded="full" px="4" fontSize="0.8em" bg={"black"} color={"white"}>
                                {data?.getByName.records.length}
                            </Badge>
                            </Heading>
                        </Box>
                    </Center>
                    <Center>
                        <SimpleGrid columns={[1, null, 3]} spacingX='40px'>
                            {
                                data?.getByName.records.map((product,value)=>(
                                    <Box key={value}>
                                        <Card key={value} data={product}/>
                                    </Box>
                                ))
                            }
                        </SimpleGrid>
                    </Center>
                </Box>
            </Main>
        </div>
    );
}

export default withUrqlClient(CreateURQLClient,{ssr:false})(FindByName);