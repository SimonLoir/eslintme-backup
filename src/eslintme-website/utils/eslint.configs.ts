//@ts-ignore
import * as airbnb_best_practices from 'eslint-config-airbnb-base/rules/best-practices';
//@ts-ignore
import * as airbnb_es6 from 'eslint-config-airbnb-base/rules/es6';
//@ts-ignore
import * as airbnb_style from 'eslint-config-airbnb-base/rules/style';
//@ts-ignore
import * as google_config from 'eslint-config-google';
//@ts-ignore
import * as standard_config from 'eslint-config-standard';
//@ts-ignore
import * as eslint_recommended from 'eslint/conf/eslint-recommended';

//@ts-ignore
import * as eslint_all from 'eslint/conf/eslint-all';

//@ts-ignore
import * as rules_data from 'eslint/lib/rules';

//@ts-ignore
import * as env from '@eslint/eslintrc/conf/environments';

export const eslint_environnements = [...env.keys()];

export let rules_meta_data: {
    [key: string]: {
        category: string;
        description: string;
        url: string;
        recommended: boolean;
        schema: any;
    };
} = {};

rules_data.forEach((data, key) => {
    rules_meta_data[key] = data.meta.docs;
    rules_meta_data[key].schema = data.meta.schema;
});

export const airbnb = {
    ...airbnb_best_practices.rules,
    ...airbnb_es6.rules,
    ...airbnb_style.rules,
};

export const google = { ...eslint_recommended.rules, ...google_config.rules };

export const standard = { ...standard_config.rules };

export const eslint_rules = { ...eslint_all.rules };

export const recommended_rules = { ...eslint_recommended.rules };

// recommended : https://github.com/eslint/eslint/blob/main/conf/eslint-recommended.js
