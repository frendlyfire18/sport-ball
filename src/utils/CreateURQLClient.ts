import {dedupExchange, fetchExchange, gql} from "urql";
import {cacheExchange, Resolver,Cache} from "@urql/exchange-graphcache";
import {DeleteProductMutationVariables} from "../generated/graphql";

const categoryPagination=():Resolver=> {
    return (_parent, fieldArgs, cache, info) => {
        const {parentKey: entityKey, fieldName} = info;
        const allFields = cache.inspectFields(entityKey);
        const fieldInfos = allFields.filter(info => info.fieldName === fieldName);
        const size = fieldInfos.length;
        if (size === 0) {
            return undefined;
        }
        info.partial = true;
        let result: string[] = [];
        let hasMore = true;
        fieldInfos.forEach((fi, value) => {
            const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string;
            const res = cache.resolve(key, "records") as string[];
            const _hasMore = cache.resolve(key, "hasMore");
            if (!_hasMore)
                hasMore = _hasMore as boolean;
            if(fi.fieldKey.indexOf(info.variables.categoryId as string) !== -1){
                result.push(...res);
            }
        })
        const obj = {
            __typename: "ProductResponse",
            records: result,
            hasMore
        }
        return obj;
    }
}

const idPagination = ():Resolver=> {
    return (_parent, fieldArgs, cache, info) => {
        const { parentKey: entityKey, fieldName } = info;
        const allFields = cache.inspectFields(entityKey);
        const fieldInfos = allFields.filter(info => info.fieldName === fieldName);
        const size = fieldInfos.length;
        if (size === 0) {
            return undefined;
        }
        info.partial = true;
        let result:string[] = [];
        let hasMore = true;

        if(info.variables.priceRange !== undefined && info.variables.secondRange !== undefined){
            fieldInfos.forEach((fi,value)=>{
                const key = cache.resolveFieldByKey(entityKey,fi.fieldKey) as string;
                const res = cache.resolve(key,"records") as string[];
                const _hasMore = cache.resolve(key,"hasMore");
                if(!_hasMore)
                    hasMore = _hasMore as boolean;
                if(fi.fieldKey.indexOf(info.variables.priceRange as string) !== -1 && fi.fieldKey.indexOf(info.variables.secondRange as string) !== -1){
                    result = []
                    result.push(...res);
                }
            })
        }else if(info.variables.country && info.variables.subcategory ){
            fieldInfos.forEach((fi,value)=>{
                const key = cache.resolveFieldByKey(entityKey,fi.fieldKey) as string;
                const res = cache.resolve(key,"records") as string[];
                const _hasMore = cache.resolve(key,"hasMore");
                if(!_hasMore)
                    hasMore = _hasMore as boolean;
                if(fi.fieldKey.indexOf(info.variables.country as string) !== -1 && fi.fieldKey.indexOf(info.variables.subcategory as string) !== -1){
                    result = []
                    result.push(...res);
                }
            })
        }else if(info.variables.country === undefined && info.variables.subcategory === undefined){
            const key = cache.resolveFieldByKey(entityKey,"getProducts") as string;
            const res = cache.resolve(key,"records") as string[];
            const _hasMore = cache.resolve(key,"hasMore");
            if(!_hasMore)
                hasMore = _hasMore as boolean;
            result.push(...res);
        }else if(info.variables.country === undefined){
            fieldInfos.forEach((fi,value)=>{
                const key = cache.resolveFieldByKey(entityKey,fi.fieldKey) as string;
                const res = cache.resolve(key,"records") as string[];
                const _hasMore = cache.resolve(key,"hasMore");
                if(!_hasMore)
                    hasMore = _hasMore as boolean;
                if(fi.fieldKey.indexOf(info.variables.subcategory as string) !== -1){
                    result = []
                    result.push(...res);
                }
            })
        }else if(info.variables.subcategory === undefined){
            fieldInfos.forEach((fi,value)=>{
                const key = cache.resolveFieldByKey(entityKey,fi.fieldKey) as string;
                const res = cache.resolve(key,"records") as string[];
                const _hasMore = cache.resolve(key,"hasMore");
                if(!_hasMore)
                    hasMore = _hasMore as boolean;
                if(fi.fieldKey.indexOf(info.variables.country as string) !== -1){
                    result = []
                    result.push(...res);
                }
            })
        }
        const obj = {
            __typename:"ProductResponse",
            records:result,
            hasMore
        }
        return obj;
    }};

const Collision = ():Resolver=> {
    return (_parent, fieldArgs, cache, info) => {
        const { parentKey: entityKey, fieldName } = info;
        const allFields = cache.inspectFields(entityKey);
        const fieldInfos = allFields.filter(info => info.fieldName === fieldName);
        const size = fieldInfos.length;
        if (size === 0) {
            return undefined;
        }
        info.partial = true;
        let result:string[] = [];
        let hasMore = true;
        fieldInfos.forEach((fi,value)=>{
            const key = cache.resolveFieldByKey(entityKey,fi.fieldKey) as string;
            const res = cache.resolve(key,"records") as string[];
            const _hasMore = cache.resolve(key,"hasMore");
            if(!_hasMore)
                hasMore = _hasMore as boolean;
            if(value === fieldInfos.length-1){
                result = []
                result.push(...res);
            }
        })
        const obj = {
            __typename:"ProductResponse",
            records:result,
            hasMore
        }
        return obj;
    }};

export const CreateURQLClient = (ssrExchange:any,ctx:any)=>{
    let cookie = '';
    if(typeof window === 'undefined'){
        cookie = ctx?.req?.headers?.cookie;
    }
    return {
        url: 'https://sprot-ball-server.herokuapp.com/graphql',//url of graphql server
        fetchOptions:{
            credentials:"include" as const,//mode need for sending and working cookie
            headers:cookie?{
                cookie
            }:undefined
        },
        exchanges: [dedupExchange, cacheExchange({//exchanges whose can make urql with cache, need for updating cache, because page didn't update without this
            keys:{
                ProductsResponse:()=>null,
            },
            resolvers: {
                Query: {
                    getProducts: idPagination(),
                    getAllCollision: Collision(),
                    getProductsByCategory:categoryPagination()
                },
            },
            updates: {
                Mutation:{
                    createProduct:(_result,args,cache,info)=>{
                        const allFields = cache.inspectFields("Query");
                        const fieldsInfo = allFields.filter(
                            (info)=>info.fieldName==="getProducts"
                        );
                        fieldsInfo.forEach(
                            (fi)=>{
                                cache.invalidate("Query","getProducts",fi.arguments||{})
                            }
                        )
                    },
                    deleteProduct:(_result,args,cache,info)=>{
                        cache.invalidate({__typename:"Products",id:(args as DeleteProductMutationVariables)._id} )
                    },
                }
            },
        }),ssrExchange, fetchExchange],
    }
}