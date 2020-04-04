import React from 'react';
import * as resources from "Resources";
import { InputRenderer } from 'infrastructure/FormMaker/InputRenderer';
import ValidationTextField from 'infrastructure/FormMaker/ValidationTextField';
import { PropType } from 'models/Types';
import { useStateValue } from 'store/appState';

export default function ChangeLanguage() {


    const dispatch = useStateValue()[1];

    const languages = Object.keys(resources).map(p=> ({
        text:p,
        value:p
    })); 
    
    const handleChange = (event) => {
        const val = event.target.value;

        dispatch({
            type : val
        });
    }
    return (
        <InputRenderer Type={PropType.Select}  DisplayName="انتخاب زبان" size='small' onChange={handleChange} DataSource={languages} />
    )


}





