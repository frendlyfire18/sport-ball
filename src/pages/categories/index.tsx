import React from "react"
import Main from "../../layouts/Main";
import {SimpleGrid, Box, Heading, Center, Badge} from '@chakra-ui/react'


import client from "../../lib/Commerce";
import Category from "../../component/Category";
import {useGetAllCategoriesQuery} from "../../generated/graphql";
import LoadingCard from "../../component/LoadingCard";
import {withUrqlClient} from "next-urql";
import {CreateURQLClient} from "../../utils/CreateURQLClient";
import Head from "next/head";

const Index = () => {
    const [{data:categories,fetching}] = useGetAllCategoriesQuery();
    if(!categories||fetching){
        return (
            <>
                <Main>
                    <Box>
                        <Center>
                            <Box my={10} pt={10} width={"65%"}>
                                <Heading>
                                    Все категории <Badge rounded="full" px="4" fontSize="0.8em" colorScheme={"green"}>
                                </Badge>
                                </Heading>
                            </Box>
                        </Center>
                        <Center py={10}>
                            <SimpleGrid columns={[1, null, 3]} spacingX='120px'>
                                <LoadingCard/>
                                <LoadingCard/>
                                <LoadingCard/>
                                <LoadingCard/>
                                <LoadingCard/>
                            </SimpleGrid>
                        </Center>
                    </Box>
                </Main>
            </>
        )
    }
    return (
        <>
            <>
                <Head>
                    <title>Категории</title>
                </Head>
                <Main>
                    <Box>
                        <Center>
                            <Box my={10} pt={10} width={"55%"}>
                                <Heading>
                                    Все категории <Badge rounded="full" px="4" fontSize="0.8em" colorScheme={"green"}>
                                    {categories.getAllCategories.length}
                                </Badge>
                                </Heading>
                            </Box>
                        </Center>
                        <Center>
                            <SimpleGrid columns={[1, null, 2]} spacingX='120px'>
                                {
                                    categories.getAllCategories.map((category,value)=>(
                                        <Box>
                                            <Category id={category._id} image={category.imageURL} name={category.title}/>
                                        </Box>
                                    ))
                                }
                            </SimpleGrid>
                        </Center>
                    </Box>
                </Main>
            </>
        </>
    )
}

export default withUrqlClient(CreateURQLClient,{ssr:false})(Index);