// @ts-nocheck
"use client";

import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true });

const JsonEditor = ({
    initialValue = '{}',
    onChange,
    jsonSchema = null,
    readOnly = false,
    height = "calc(100vh - 380px)"
}) => {
    const [editorValue, setEditorValue] = useState(initialValue);
    const [errors, setErrors] = useState([]);
    const [isValid, setIsValid] = useState(true);
    const [isDirty, setIsDirty] = useState(false);
    const validator = jsonSchema ? ajv.compile(jsonSchema) : null;

    const validateJson = (jsonString) => {
        const newErrors = [];
        let isJsonValid = true;

        try {
            const parsedJson = JSON.parse(jsonString);

            if (validator) {
                const isSchemaValid = validator(parsedJson);

                if (!isSchemaValid && validator.errors) {
                    validator.errors.forEach(error => {
                        newErrors.push({
                            type: 'schema',
                            message: `${error.instancePath} ${error.message}`,
                            path: error.instancePath
                        });
                    });
                    isJsonValid = false;
                }
            }
        } catch (err) {
            newErrors.push({
                type: 'syntax',
                message: err.message,
                path: null
            });
            isJsonValid = false;
        }

        setErrors(newErrors);
        setIsValid(isJsonValid);
        return isJsonValid;
    };

    const formatJson = () => {
        try {
            const parsedJson = JSON.parse(editorValue);
            const formattedJson = JSON.stringify(parsedJson, null, 2);
            setEditorValue(formattedJson);
            onChange(formattedJson);
        } catch (err) {
            console.log(err)
        }
    };

    const handleChange = (value) => {
        setEditorValue(value);
        setIsDirty(true);
        validateJson(value);

        // Call parent's onChange handler
        if (onChange) {
            onChange(value);
        }
    };

    // Initial validation
    useEffect(() => {
        validateJson(initialValue);
        setEditorValue(initialValue);
    }, [initialValue, jsonSchema]);

    // Reset editor to initial value
    const handleReset = () => {
        setEditorValue(initialValue);
        validateJson(initialValue);
        setIsDirty(false);
        if (onChange) {
            onChange(initialValue);
        }
    };

    return (
        <div className="border border-gray-300 rounded overflow-hidden font-sans">
            <div className="relative">
                <CodeMirror
                    value={editorValue}
                    height={height}
                    extensions={[json()]}
                    onChange={handleChange}
                    theme="light"
                    readOnly={readOnly}
                    basicSetup={{
                        lineNumbers: true,
                        foldGutter: true,
                        highlightActiveLine: true,
                        highlightSelectionMatches: true,
                    }}
                />
            </div>
            {!readOnly && editorValue && (
                <div className="flex items-center px-3 py-2 bg-gray-50 border-t border-gray-300">
                    {errors.length > 0 && <ul >
                        {errors.map((error, index) => (
                            <li key={index} className={error.type === 'schema' ? 'text-amber-800' : 'text-red-800 mb-1'}>
                                {error.message}
                            </li>
                        ))}
                    </ul>}
                    <div className="ml-auto text-sm">
                        {isValid ? (
                            <span className="text-green-600 font-medium">✓ Valid JSON</span>
                        ) : (
                            <span className="text-red-600 font-medium">✗ Invalid JSON</span>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default JsonEditor;