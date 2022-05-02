import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Categories = {
  __typename?: 'Categories';
  _id: Scalars['String'];
  imageURL: Scalars['String'];
  title: Scalars['String'];
};

export type CountryResponse = {
  __typename?: 'CountryResponse';
  countries: Array<Scalars['String']>;
  hasMore: Scalars['Boolean'];
};

export type ForWhoResponse = {
  __typename?: 'ForWhoResponse';
  hasMore: Scalars['Boolean'];
  subcategory: Array<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewCategory: Categories;
  createProduct: Products;
  deleteProduct: Scalars['Boolean'];
  updateProducts: ProductResponse;
};


export type MutationCreateNewCategoryArgs = {
  imageURL: Scalars['String'];
  title: Scalars['String'];
};


export type MutationCreateProductArgs = {
  brand: Scalars['String'];
  brandDesc: Scalars['String'];
  categoryId: Scalars['String'];
  dateOfEnd: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  madeCountry: Scalars['String'];
  name: Scalars['String'];
  numberOfItemsInBox: Scalars['Float'];
  price: Scalars['String'];
  purpose: Scalars['String'];
  sku: Scalars['String'];
  subcategory: Scalars['String'];
  value: Scalars['Float'];
  weight: Scalars['String'];
};


export type MutationDeleteProductArgs = {
  _id: Scalars['String'];
};


export type MutationUpdateProductsArgs = {
  country?: InputMaybe<Scalars['String']>;
};

export type ProductResponse = {
  __typename?: 'ProductResponse';
  hasMore: Scalars['Boolean'];
  records: Array<Products>;
};

export type Products = {
  __typename?: 'Products';
  _id: Scalars['String'];
  brand: Scalars['String'];
  brandDesc: Scalars['String'];
  category: Scalars['String'];
  categoryId: Scalars['String'];
  dateOfEnd: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  madeCountry: Scalars['String'];
  name: Scalars['String'];
  numberOfItemsInBox: Scalars['Float'];
  price: Scalars['String'];
  purpose: Scalars['String'];
  sku: Scalars['String'];
  subcategory: Scalars['String'];
  value: Scalars['Float'];
  weight: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllAnimals: ForWhoResponse;
  getAllCategories: Array<Categories>;
  getAllCollision?: Maybe<ProductResponse>;
  getAllCountries: CountryResponse;
  getByName?: Maybe<ProductResponse>;
  getMaxPrice: Scalars['Float'];
  getOneProduct?: Maybe<Products>;
  getProducts: ProductResponse;
  getProductsByCategory: ProductResponse;
};


export type QueryGetAllCollisionArgs = {
  word?: InputMaybe<Scalars['String']>;
};


export type QueryGetByNameArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryGetOneProductArgs = {
  _id: Scalars['String'];
};


export type QueryGetProductsArgs = {
  country?: InputMaybe<Scalars['String']>;
  priceRange?: InputMaybe<Scalars['Float']>;
  secondRange?: InputMaybe<Scalars['Float']>;
  subcategory?: InputMaybe<Scalars['String']>;
};


export type QueryGetProductsByCategoryArgs = {
  categoryId?: InputMaybe<Scalars['String']>;
};

export type CreateProductMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['String'];
  sku: Scalars['String'];
  value: Scalars['Float'];
  image: Scalars['String'];
  madeCountry: Scalars['String'];
  weight: Scalars['String'];
  purpose: Scalars['String'];
  subcategory: Scalars['String'];
  dateOfEnd: Scalars['String'];
  brand: Scalars['String'];
  brandDesc: Scalars['String'];
  numberOfItemsInBox: Scalars['Float'];
  categoryId: Scalars['String'];
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Products', _id: string, name: string, price: string, image: string, value: number, subcategory: string, madeCountry: string } };

export type DeleteProductMutationVariables = Exact<{
  _id: Scalars['String'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: boolean };

export type UpdateProductsMutationVariables = Exact<{
  country: Scalars['String'];
}>;


export type UpdateProductsMutation = { __typename?: 'Mutation', updateProducts: { __typename?: 'ProductResponse', hasMore: boolean, records: Array<{ __typename?: 'Products', _id: string, name: string, price: string, image: string, value: number }> } };

export type GetAllAnimalsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAnimalsQuery = { __typename?: 'Query', getAllAnimals: { __typename?: 'ForWhoResponse', subcategory: Array<string> } };

export type GetProductsByCategoryQueryVariables = Exact<{
  categoryId?: InputMaybe<Scalars['String']>;
}>;


export type GetProductsByCategoryQuery = { __typename?: 'Query', getProductsByCategory: { __typename?: 'ProductResponse', hasMore: boolean, records: Array<{ __typename?: 'Products', _id: string, name: string, price: string, image: string, value: number, subcategory: string, description: string, madeCountry: string, category: string }> } };

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', getAllCategories: Array<{ __typename?: 'Categories', _id: string, title: string, imageURL: string }> };

export type GetAllCollisionQueryVariables = Exact<{
  word?: InputMaybe<Scalars['String']>;
}>;


export type GetAllCollisionQuery = { __typename?: 'Query', getAllCollision?: { __typename?: 'ProductResponse', records: Array<{ __typename?: 'Products', _id: string, name: string, price: string, image: string, value: number, subcategory: string, madeCountry: string }> } | null };

export type GetAllCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCountriesQuery = { __typename?: 'Query', getAllCountries: { __typename?: 'CountryResponse', countries: Array<string> } };

export type GetAllByNameQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
}>;


export type GetAllByNameQuery = { __typename?: 'Query', getByName?: { __typename?: 'ProductResponse', records: Array<{ __typename?: 'Products', _id: string, name: string, price: string, description: string, sku: string, image: string, value: number }> } | null };

export type GetMaxPriceFromAllProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMaxPriceFromAllProductsQuery = { __typename?: 'Query', getMaxPrice: number };

export type GetOneProductQueryVariables = Exact<{
  _id: Scalars['String'];
}>;


export type GetOneProductQuery = { __typename?: 'Query', getOneProduct?: { __typename?: 'Products', _id: string, name: string, description: string, price: string, sku: string, value: number, image: string, madeCountry: string, weight: string, purpose: string, subcategory: string, brand: string, brandDesc: string, dateOfEnd: string, numberOfItemsInBox: number } | null };

export type GetAllProductsQueryVariables = Exact<{
  country?: InputMaybe<Scalars['String']>;
  subcategory?: InputMaybe<Scalars['String']>;
  priceRange?: InputMaybe<Scalars['Float']>;
  secondRange?: InputMaybe<Scalars['Float']>;
}>;


export type GetAllProductsQuery = { __typename?: 'Query', getProducts: { __typename?: 'ProductResponse', hasMore: boolean, records: Array<{ __typename?: 'Products', _id: string, name: string, description: string, sku: string, price: string, image: string, value: number, subcategory: string, madeCountry: string }> } };


export const CreateProductDocument = gql`
    mutation CreateProduct($name: String!, $description: String!, $price: String!, $sku: String!, $value: Float!, $image: String!, $madeCountry: String!, $weight: String!, $purpose: String!, $subcategory: String!, $dateOfEnd: String!, $brand: String!, $brandDesc: String!, $numberOfItemsInBox: Float!, $categoryId: String!) {
  createProduct(
    name: $name
    description: $description
    price: $price
    sku: $sku
    value: $value
    image: $image
    madeCountry: $madeCountry
    weight: $weight
    purpose: $purpose
    subcategory: $subcategory
    brand: $brand
    brandDesc: $brandDesc
    dateOfEnd: $dateOfEnd
    numberOfItemsInBox: $numberOfItemsInBox
    categoryId: $categoryId
  ) {
    _id
    name
    price
    image
    value
    subcategory
    madeCountry
  }
}
    `;

export function useCreateProductMutation() {
  return Urql.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument);
};
export const DeleteProductDocument = gql`
    mutation DeleteProduct($_id: String!) {
  deleteProduct(_id: $_id)
}
    `;

export function useDeleteProductMutation() {
  return Urql.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument);
};
export const UpdateProductsDocument = gql`
    mutation UpdateProducts($country: String!) {
  updateProducts(country: $country) {
    records {
      _id
      name
      price
      image
      value
    }
    hasMore
  }
}
    `;

export function useUpdateProductsMutation() {
  return Urql.useMutation<UpdateProductsMutation, UpdateProductsMutationVariables>(UpdateProductsDocument);
};
export const GetAllAnimalsDocument = gql`
    query GetAllAnimals {
  getAllAnimals {
    subcategory
  }
}
    `;

export function useGetAllAnimalsQuery(options?: Omit<Urql.UseQueryArgs<GetAllAnimalsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllAnimalsQuery>({ query: GetAllAnimalsDocument, ...options });
};
export const GetProductsByCategoryDocument = gql`
    query GetProductsByCategory($categoryId: String) {
  getProductsByCategory(categoryId: $categoryId) {
    records {
      _id
      name
      price
      image
      value
      subcategory
      description
      madeCountry
      category
    }
    hasMore
  }
}
    `;

export function useGetProductsByCategoryQuery(options?: Omit<Urql.UseQueryArgs<GetProductsByCategoryQueryVariables>, 'query'>) {
  return Urql.useQuery<GetProductsByCategoryQuery>({ query: GetProductsByCategoryDocument, ...options });
};
export const GetAllCategoriesDocument = gql`
    query GetAllCategories {
  getAllCategories {
    _id
    title
    imageURL
  }
}
    `;

export function useGetAllCategoriesQuery(options?: Omit<Urql.UseQueryArgs<GetAllCategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllCategoriesQuery>({ query: GetAllCategoriesDocument, ...options });
};
export const GetAllCollisionDocument = gql`
    query GetAllCollision($word: String) {
  getAllCollision(word: $word) {
    records {
      _id
      name
      price
      image
      value
      subcategory
      madeCountry
    }
  }
}
    `;

export function useGetAllCollisionQuery(options?: Omit<Urql.UseQueryArgs<GetAllCollisionQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllCollisionQuery>({ query: GetAllCollisionDocument, ...options });
};
export const GetAllCountriesDocument = gql`
    query GetAllCountries {
  getAllCountries {
    countries
  }
}
    `;

export function useGetAllCountriesQuery(options?: Omit<Urql.UseQueryArgs<GetAllCountriesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllCountriesQuery>({ query: GetAllCountriesDocument, ...options });
};
export const GetAllByNameDocument = gql`
    query GetAllByName($name: String) {
  getByName(name: $name) {
    records {
      _id
      name
      price
      description
      sku
      image
      value
    }
  }
}
    `;

export function useGetAllByNameQuery(options?: Omit<Urql.UseQueryArgs<GetAllByNameQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllByNameQuery>({ query: GetAllByNameDocument, ...options });
};
export const GetMaxPriceFromAllProductsDocument = gql`
    query GetMaxPriceFromAllProducts {
  getMaxPrice
}
    `;

export function useGetMaxPriceFromAllProductsQuery(options?: Omit<Urql.UseQueryArgs<GetMaxPriceFromAllProductsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMaxPriceFromAllProductsQuery>({ query: GetMaxPriceFromAllProductsDocument, ...options });
};
export const GetOneProductDocument = gql`
    query GetOneProduct($_id: String!) {
  getOneProduct(_id: $_id) {
    _id
    name
    description
    price
    sku
    value
    image
    madeCountry
    weight
    purpose
    subcategory
    brand
    brandDesc
    dateOfEnd
    numberOfItemsInBox
  }
}
    `;

export function useGetOneProductQuery(options: Omit<Urql.UseQueryArgs<GetOneProductQueryVariables>, 'query'>) {
  return Urql.useQuery<GetOneProductQuery>({ query: GetOneProductDocument, ...options });
};
export const GetAllProductsDocument = gql`
    query GetAllProducts($country: String, $subcategory: String, $priceRange: Float, $secondRange: Float) {
  getProducts(
    country: $country
    subcategory: $subcategory
    priceRange: $priceRange
    secondRange: $secondRange
  ) {
    records {
      _id
      name
      description
      sku
      price
      image
      value
      subcategory
      madeCountry
    }
    hasMore
  }
}
    `;

export function useGetAllProductsQuery(options?: Omit<Urql.UseQueryArgs<GetAllProductsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllProductsQuery>({ query: GetAllProductsDocument, ...options });
};