import React from 'react';
import Select from 'react-select';
export default function SelectComponent(props) {
    return (
        <>
            <Select
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: "none",
                        outline: "none",
                        boxShadow: "none",
                        color: "black",
                        width: "100%",
                        "&:hover": {
                            borderColor: "none",
                            outline: "none",
                            boxShadow: "none",
                        },
                    }),
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    width: "100%",
                    color: "black",
                    colors: {
                        ...theme.colors,
                        primary25: "rgb(242, 242, 242)",
                        primary: "rgb(242, 242, 242)",
                    },
                })}
                defaultValue={
                    props.value
                }
                classNamePrefix="select"
                isClearable={false}
                onChange={props.onChange}
                isSearchable={true}
                isMulti={props.isMulti}
                name="color"
                placeholder={props.placeholder}
                options={props.options}
            />
        </>
    )
}