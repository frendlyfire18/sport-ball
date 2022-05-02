import { FiShoppingCart } from 'react-icons/fi';
import NextLink from "next/link"
import {
    Box,
    Center,
    Heading,
    Text,
    Flex,
    Image, Badge, Button,  Icon, SimpleGrid,Link
} from '@chakra-ui/react';
import React from "react";
import {Skeleton,Stack,Spinner} from "@chakra-ui/react";

function LoadingCard() {
    return (
        <Center py={12}>
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={0} width={"330px"}>
                <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'230px'}
                    _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        background:'url(/loading_img.jpg)',
                        top: 5,
                        left: 0,
                        filter: 'blur(15px)',
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                            filter: 'blur(20px)',
                        },
                    }}>
                </Box>
                <Badge color={'green'} fontSize={'sm'} textTransform={'uppercase'}>
                    <Skeleton height='20px' />
                </Badge>
                <Box height='40px'>

                </Box>
                <Box>
                    <Skeleton my={2} height='20px' />
                    <Skeleton my={2} height='20px' />
                    <Skeleton my={2} height='20px' />
                    <Skeleton my={2} height='20px' />
                </Box>
            </Box>
        </Center>
    );
}

export default LoadingCard;