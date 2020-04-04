import React from "react";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";



export default function SearchControl({classes}) {

    return (
        <div className={classes.searchWrapper}>
            <CustomInput
                formControlProps={{
                    className: classes.margin + " " + classes.search
                }}
                inputProps={{
                    placeholder: "Search",
                    inputProps: {
                        "aria-label": "Search"
                    }
                }}
            />
            <Button color="white" aria-label="edit" justIcon round>
                <Search />
            </Button>
        </div>
    )
}