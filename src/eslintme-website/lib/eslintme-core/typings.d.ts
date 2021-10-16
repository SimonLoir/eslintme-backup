declare module 'espree' {
    export interface Options {
        range?: boolean;
        loc?: boolean;
        comment?: boolean;
        tokens?: boolean;
        ecmaVersion?:
            | 3
            | 5
            | 6
            | 7
            | 8
            | 9
            | 10
            | 11
            | 12
            | 2015
            | 2016
            | 2017
            | 2018
            | 2019
            | 2021
            | 2022
            | 'latest';
        sourceType?: 'script' | 'module';
        ecmaFeatures?: {
            jsx?: boolean;
            globalReturn?: boolean;
            impliedStrict?: boolean;
        };
    }

    export interface Program {}

    export function parse(code: string, options?: Options): Program;
}