import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type Attribute = {
  __typename?: 'Attribute';
  displayValue?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type AttributeSet = {
  __typename?: 'AttributeSet';
  id: Scalars['String'];
  items?: Maybe<Array<Maybe<Attribute>>>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Category = {
  __typename?: 'Category';
  name?: Maybe<Scalars['String']>;
  products: Array<Maybe<Product>>;
};

export type CategoryInput = {
  title: Scalars['String'];
};

export type Currency = {
  __typename?: 'Currency';
  label: Scalars['String'];
  symbol: Scalars['String'];
};

export type Price = {
  __typename?: 'Price';
  amount: Scalars['Float'];
  currency: Currency;
};

export type Product = {
  __typename?: 'Product';
  attributes?: Maybe<Array<Maybe<AttributeSet>>>;
  brand: Scalars['String'];
  category: Scalars['String'];
  description: Scalars['String'];
  gallery?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  inStock?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  prices: Array<Price>;
};

export type Query = {
  __typename?: 'Query';
  categories?: Maybe<Array<Maybe<Category>>>;
  category?: Maybe<Category>;
  currencies?: Maybe<Array<Maybe<Currency>>>;
  product?: Maybe<Product>;
};


export type QueryCategoryArgs = {
  input?: InputMaybe<CategoryInput>;
};


export type QueryProductArgs = {
  id: Scalars['String'];
};

export type GetProductsByCategoryQueryVariables = Exact<{
  category?: InputMaybe<Scalars['String']>;
}>;


export type GetProductsByCategoryQuery = { __typename?: 'Query', category?: { __typename?: 'Category', products: Array<{ __typename?: 'Product', id: string, name: string, prices: Array<{ __typename?: 'Price', amount: number, currency: { __typename?: 'Currency', label: string, symbol: string } }> } | null> } | null };


export const GetProductsByCategoryDocument = gql`
    query GetProductsByCategory($category: String = "all") {
  category(input: {title: $category}) {
    products {
      id
      name
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
}
    `;

/**
 * __useGetProductsByCategoryQuery__
 *
 * To run a query within a React component, call `useGetProductsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsByCategoryQuery({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useGetProductsByCategoryQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsByCategoryQuery, GetProductsByCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsByCategoryQuery, GetProductsByCategoryQueryVariables>(GetProductsByCategoryDocument, options);
      }
export function useGetProductsByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsByCategoryQuery, GetProductsByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsByCategoryQuery, GetProductsByCategoryQueryVariables>(GetProductsByCategoryDocument, options);
        }
export type GetProductsByCategoryQueryHookResult = ReturnType<typeof useGetProductsByCategoryQuery>;
export type GetProductsByCategoryLazyQueryHookResult = ReturnType<typeof useGetProductsByCategoryLazyQuery>;
export type GetProductsByCategoryQueryResult = Apollo.QueryResult<GetProductsByCategoryQuery, GetProductsByCategoryQueryVariables>;