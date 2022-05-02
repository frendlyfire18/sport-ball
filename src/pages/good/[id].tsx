import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    VisuallyHidden,
    List,
    ListItem, Center, Spinner, Badge,
} from '@chakra-ui/react';
import { MdLocalShipping } from 'react-icons/md';
import Main from "../../layouts/Main";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import client from "../../lib/Commerce";
import {withUrqlClient} from "next-urql";
import {CreateURQLClient} from "../../utils/CreateURQLClient";
import {useGetOneProductQuery} from "../../generated/graphql";
import Head from "next/head";
import {
    addToCart,
} from '../../redux/feature/counter/counterSlice';
import {useAppDispatch} from "../../redux/hooks";

const Good=()=>{
    const router = useRouter();
    const [variables,setVariables] = useState({_id:router.query.id as string})
    const [{data,fetching}] = useGetOneProductQuery({
        variables
    })
    const dispatch = useAppDispatch()
    useEffect(() => {
        setVariables({_id:router.query.id as string})
    },[router.query.id])

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
        <Main>
            <Head>
                <title>{data.getOneProduct.name}</title>
            </Head>
            <Container maxW={'7xl'}>
                <SimpleGrid
                    columns={{ base: 1, lg: 2 }}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 18, md: 24 }}>
                    <Flex>
                        <Image
                            rounded={'md'}
                            alt={'product image'}
                            src={
                                data.getOneProduct.image
                            }
                            fit={'cover'}
                            align={'center'}
                            w={'100%'}
                            h={{ base: '100%', sm: '400px', lg: '500px' }}
                        />
                    </Flex>
                    <Stack spacing={{ base: 6, md: 10 }}>
                        <Box as={'header'}>
                            <Heading
                                lineHeight={1.1}
                                fontWeight={600}
                                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                                {data.getOneProduct.name}
                            </Heading>
                            <Text
                                color={useColorModeValue('gray.900', 'gray.400')}
                                fontWeight={300}
                                fontSize={'2xl'}>
                                {data.getOneProduct.price}₽
                            </Text>
                        </Box>

                        <Stack
                            spacing={{ base: 4, sm: 6 }}
                            direction={'column'}
                            divider={
                                <StackDivider
                                    borderColor={useColorModeValue('gray.200', 'gray.600')}
                                />
                            }>
                            <VStack spacing={{ base: 4, sm: 6 }}>
                                <Text color={useColorModeValue('gray.600', 'gray.400')}
                                      fontSize={'2xl'}
                                      fontWeight={'300'}>
                                    Описание
                                </Text>
                                <Text color={useColorModeValue('gray.500', 'gray.400')}
                                      fontSize={'2xl'}
                                      fontWeight={'300'}>
                                    <div dangerouslySetInnerHTML={{ __html: data.getOneProduct.description }} />
                                </Text>
                            </VStack>
                            <Box>
                                <Text
                                    fontSize={{ base: '16px', lg: '18px' }}
                                    color={useColorModeValue('yellow.500', 'yellow.300')}
                                    fontWeight={'500'}
                                    textTransform={'uppercase'}
                                    py={'4'}>
                                    Характеристики
                                </Text>
                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                                    <Box><Badge mr={2} variant='solid' colorScheme='green'>
                                        Вес
                                    </Badge>{data.getOneProduct.weight}</Box>
                                    <Box><Badge mr={2} variant='solid' colorScheme='green'>
                                        Для кого
                                    </Badge>{data.getOneProduct.subcategory}</Box>
                                    <Box><Badge mr={2} variant='solid' colorScheme='green'>
                                        Для чего
                                    </Badge>{data.getOneProduct.purpose}</Box>
                                    <Box><Badge mr={2} variant='solid' colorScheme='green'>
                                        Срок годности
                                    </Badge>{data.getOneProduct.dateOfEnd}</Box>
                                    <Box><Badge mr={2} variant='solid' colorScheme='green'>
                                        Страна производитель
                                    </Badge>{data.getOneProduct.madeCountry}</Box>
                                    <Box><Badge mr={2} variant='solid' colorScheme='green'>
                                        Количество
                                    </Badge>{data.getOneProduct.value}</Box>
                                    <Box><Badge mr={2} variant='solid' colorScheme='green'>
                                        Бренд
                                    </Badge>{data.getOneProduct.brand}</Box>
                                </SimpleGrid>
                                <Box><Badge mr={2} variant='solid' colorScheme='green'>
                                    Описание бренда
                                </Badge><Text color={useColorModeValue('gray.500', 'gray.400')}
                                              fontSize={'2xl'}
                                              fontWeight={'300'}>
                                    <div dangerouslySetInnerHTML={{ __html: data.getOneProduct.brandDesc }} />
                                </Text></Box>
                            </Box>
                        </Stack>

                        <Button
                            rounded={'none'}
                            w={'full'}
                            mt={8}
                            size={'lg'}
                            py={'7'}
                            bg={useColorModeValue('green.500', 'green.900')}
                            color={useColorModeValue('white', 'green.900')}
                            textTransform={'uppercase'}
                            _hover={{
                                transform: 'translateY(2px)',
                                boxShadow: 'lg',
                            }}
                            onClick={()=>{
                                dispatch(addToCart({id:data.getOneProduct._id,num:1}))
                            }}
                        >
                            Добавить в корзину
                        </Button>

                        <Stack direction="row" alignItems="center" justifyContent={'center'}>
                            <MdLocalShipping />
                            <Text>2-3 business days delivery</Text>
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Container>
        </Main>
    );
}

export default withUrqlClient(CreateURQLClient,{ssr:false})(Good);