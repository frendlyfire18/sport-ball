import React, {useEffect, useState} from "react"
import Main from "../../layouts/Main";
import Cart from "../../component/Card"
import {SimpleGrid, Box, Heading, Center, Badge} from '@chakra-ui/react'
import {useRouter} from "next/router";
import {useGetProductsByCategoryQuery} from "../../generated/graphql";
import {withUrqlClient} from "next-urql";
import {CreateURQLClient} from "../../utils/CreateURQLClient";
import Head from "next/head";
import LoadingCard from "../../component/LoadingCard";
import Card from "../../component/Card";

const GoodsByCategory = () => {
    const router=useRouter();
    const [variables,setV] = useState({categoryId:router.query.id as string})
    const [{data,fetching}] = useGetProductsByCategoryQuery({
        variables,
    })
    useEffect(() => {
        setV({categoryId:router.query.id as string})
    },[router.query.id])
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
                <title>Товары по категории "{data?.getProductsByCategory.records[0]?.category}"</title>
            </Head>
            <Main>
                <Box>
                    <Center>
                        <Box py={10} width={"55%"}>
                            <Heading>
                                Все товары по категории "{data?.getProductsByCategory.records[0]?.category}"<Badge rounded="full" px="4" fontSize="0.8em" bg={"black"} color={"white"}>
                                {data?.getProductsByCategory.records.length}
                            </Badge>
                            </Heading>
                        </Box>
                    </Center>
                    <Center>
                        <SimpleGrid columns={[1, null, 3]} spacingX='40px'>
                            {
                                data?.getProductsByCategory.records.map((product,value)=>(
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


export default withUrqlClient(CreateURQLClient,{ssr:false})(GoodsByCategory);