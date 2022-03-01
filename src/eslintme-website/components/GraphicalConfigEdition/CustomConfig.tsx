import Rule from '@core/Rule';
import { useEffect, useState } from 'react';
import { validate } from 'jsonschema';
import { rules_meta_data } from 'utils/eslint.configs';

function testJSON(data: string) {
    try {
        JSON.parse(data);
        return true;
    } catch (error) {
        return false;
    }
}

function testValidity(value: any, schema: any[] = []) {
    value = !Array.isArray(value) ? Rule.normalize(value) : value;
    schema = [{ type: 'number' }, ...schema];
    console.log(value, schema);
    for (let index = 0; index < value.length; index++) {
        const e = value[index];
        const s = schema[index];
        if (s == undefined) return [];
        const v = validate(e, s);
        console.log(v);
        if (!v.valid) return v.errors;
    }
    return [];
}

export default function CustomConfig({
    current_config,
    name,
    validate,
}: {
    current_config: string;
    name: string;
    validate: (data: any) => void;
}) {
    const [data, setData] = useState('');
    const valid_json = testJSON(data);
    const schema = rules_meta_data[name]?.schema;
    const validityErrors = valid_json
        ? testValidity(JSON.parse(data), schema)
        : [];

    const valid_schema =
        validityErrors.length == 0
            ? ''
            : validityErrors.map((e, i) => (
                  <p key={i} style={{ color: 'crimson' }}>
                      {e.toString()}
                  </p>
              ));

    const schema_found =
        schema == undefined ? (
            <p style={{ color: 'orange' }}>
                No schema was found for this rule : can't verify its integrity.
            </p>
        ) : (
            valid_schema
        );

    const text = valid_json ? (
        schema_found
    ) : (
        <p style={{ color: 'crimson' }}>The provided JSON is not valid.</p>
    );

    useEffect(() => {
        setData(JSON.stringify(Rule.normalize(current_config)));
    }, []);

    return (
        <>
            <textarea
                value={data}
                onChange={(e) => setData(e.target.value)}
            ></textarea>
            {text}
            {valid_json && validityErrors.length == 0 ? (
                <button onClick={() => validate(JSON.parse(data))}>
                    Apply{' '}
                </button>
            ) : (
                ''
            )}
        </>
    );
}
