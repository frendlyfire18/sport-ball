import { FiTrash } from 'react-icons/fi';
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
import {useDeleteProductMutation} from "../generated/graphql";
import {useRouter} from "next/router";

function AdminCard({data}) {
    const [,deleteProduct] = useDeleteProductMutation()
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
                zIndex={1}>
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
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${data.image?.url})`,
                        filter: 'blur(15px)',
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                            filter: 'blur(20px)',
                        },
                    }}>
                    <Image
                        rounded={'lg'}
                        height={230}
                        width={282}
                        objectFit={'cover'}
                        src={data.image}
                    />
                </Box>
                <Badge color={'green'} fontSize={'sm'} textTransform={'uppercase'}>
                    {data.sku}
                </Badge>
                <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                    <NextLink href={"/good/[id]"} as={`/good/${data._id}`}>
                        <Link>
                            {data.name}
                        </Link>
                    </NextLink>
                </Heading>
                <SimpleGrid columns={[1,null,4]} >
                    <Text fontSize={"lg"} py={5}>
                        <Flex>
                            {data.price}
                            <Badge rounded="full" mx={2} px="2" fontSize="0.8em" colorScheme={"green"}>
                                Кол-во:{data?.value}
                            </Badge>
                        </Flex>
                    </Text>
                    <Box>

                    </Box>
                    <Box>

                    </Box>
                    <Button colorScheme={"green"}
                        onClick={async ()=>{
                            await deleteProduct({_id:data._id})
                        }}
                    >
                        <Icon as={FiTrash} h={7} w={7} alignSelf={'center'} />
                    </Button>
                </SimpleGrid>
            </Box>
        </Center>
    );
}

export default AdminCard;