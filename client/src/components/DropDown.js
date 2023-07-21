import Select from 'react-select';

function DropDown(props) {
    return (
        <Select
            // className="basic-single"
            // classNamePrefix="select"
            defaultValue={props.data[0]}
            onChange={(e) => { props.updSrchd && props.updSrchd(props.name, e.value) }}
            // isDisabled={isDisabled}
            // isLoading={isLoading}
            // isClearable={isClearable}
            // isRtl={isRtl}
            // isSearchable={isSearchable}
            name="color"
            options={props.data}

        // styles={{ marginLeft: '1rem' }}
        />
    );
}

export default DropDown;