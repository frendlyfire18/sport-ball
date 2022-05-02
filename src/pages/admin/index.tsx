import React from 'react';
import {SimpleGrid, Box, Center, Heading, Badge,Button,Spinner} from "@chakra-ui/react"
import NextLink from "next/link"
import Main from "../../layouts/Main";
import {useGetAllProductsQuery} from "../../generated/graphql";
import {withUrqlClient} from "next-urql";
import {CreateURQLClient} from "../../utils/CreateURQLClient";
import {useRouter} from "next/router";
import AdminCard from "../../component/AdminCard";
import Head from "next/head";

function AdminPanel(props) {
    const router = useRouter()
    const [{data,fetching}] = useGetAllProductsQuery()
    if(fetching||!data){
        return(
            <div>
                <Main>
                    <Center py="150px">
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </Center>
                </Main>
            </div>
        )
    }
    return (
        <div>
            <Head>
                <title>Админ панель</title>
            </Head>
            <Main>
                <Box>
                    <Center>
                        <Box py={10} width={"55%"}>
                            <Heading>
                                Все товары <Badge rounded="full" px="4" fontSize="0.8em" bg={"black"} color={"white"}>
                                {data?.getProducts.records.length}
                            </Badge>
                            </Heading>
                        </Box>
                    </Center>
                    <Center>
                        <SimpleGrid columns={[1, null, 3]} spacingX='40px'>
                            <Center>
                                <Button colorScheme={"green"}
                                    onClick={()=>{
                                        router.push("/admin/create-product")
                                    }}>
                                    Добавить товар
                                </Button>
                            </Center>
                            {
                                data?.getProducts.records.map((product,value)=>(
                                    <Box key={value}>
                                        <AdminCard key={value} data={product}/>
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

export default withUrqlClient(CreateURQLClient,{ssr:false})(AdminPanel);