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

export var airbnb = {
    ...airbnb_best_practices.rules,
    ...airbnb_es6.rules,
    ...airbnb_style.rules,
};

export var google = { ...google_config.rules };

export var standadr = { ...standard_config.rules };
