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

export const airbnb = {
    ...airbnb_best_practices.rules,
    ...airbnb_es6.rules,
    ...airbnb_style.rules,
};
console.log(eslint_recommended);
export const google = { ...eslint_recommended.rules, ...google_config.rules };

export const standard = { ...standard_config.rules };

// recommended : https://github.com/eslint/eslint/blob/main/conf/eslint-recommended.js
