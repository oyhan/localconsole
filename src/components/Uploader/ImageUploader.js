import React, { Fragment } from "react";
import axios from 'axios'
import { ProgressBar, Button, FileInput } from "@blueprintjs/core";
import PropTypes from "prop-types";

import { IconButton, CircularProgress, Fab, Tooltip } from "@material-ui/core";
import { PhotoCamera, Check } from "@material-ui/icons";
import classNames from "classnames";
import { withStyles } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";
import tooltipStyle from "assets/jss/material-dashboard-react/tooltipStyle.js";
import { authentication } from "services/UserService";

const classes = (theme) => ({
    ...tooltipStyle,
    root: {
        display: 'flex',
        alignItems: 'center',
        margin: '15px 0'
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    thumbBox: {
        margin: '0 27px',
        ' & img': {
            borderRadius: '50%'
        }
    },
    thumbnailContainer: {

        display: 'flex'
    }
});
class ImageUploader extends React.Component {


    constructor(props) {

        super(props);

        this.handleselectedFile = this.handleselectedFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.state = { selectedFile: null, loaded: 0, files: null, thumbnails: this.props.thumbs || [] }

        this.classes = props.classes;
    }


    createThumbnails = (files) => {
        var thum = [];
        files.map(f => {
            var reader = new FileReader();
            reader.onload = () => {


                thum.push({
                    name: f.name,
                    src: reader.result,
                    size: f.size / 1000
                });
                this.setState({ thumbnails: thum });
            };

            reader.readAsDataURL(f);

        })
    }

    handleselectedFile = event => {

        var files = [...event.target.files];

        this.createThumbnails(files);
        this.state.selectedFile = event.target.files;
        this.setState({
            selectedFile: event.target.files,
            loaded: 0,
            intent: 'primary',
            files: files.map(f => f.name),
        })

        // if (!this.props.multiple) {
        this.handleUpload();
        // }
    }

    handleUpload = () => {
        const data = new FormData()

        for (var i = 0, len = this.state.selectedFile.length; i < len; i++) {
            data.append('file', this.state.selectedFile[i], this.state.selectedFile[i].name)
        }

        axios
            .post(this.props.endpoint, data, {
                onUploadProgress: ProgressEvent => {

                    


                    if ((ProgressEvent.loaded / ProgressEvent.total) < 1)
                        this.setState({
                            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,



                        })
                    else this.setState({
                        loaded: 95
                    })



                }
                ,
                headers :{...authentication()},

            })
            .then((response => {
                this.setState({
                    loaded: 100
                })

                this.setState({ value: response.data.fileNames[0] })
                this.props.handleUploadResponse && this.props.handleUploadResponse(response)
                this.props.handleChange && this.props.handleChange()
            })

            ).then(() => {
                this.setState({ intent: "success" })
            })

    }

    render() {

        return (

            <div className={this.classes.root}>
                {/* <input type="file" name="file" id="" multiple={this.props.multiple} onChange={this.handleselectedFile} /> */}
                {/* <Button onClick={this.handleUpload}>Upload</Button> */}

                <input multiple={this.props.multiple} onChange={this.handleselectedFile} style={{ display: 'none' }} id="icon-button-file" type="file" />
                {/* <input accept="image/*" multiple={this.props.multiple} onChange={this.handleselectedFile} style={{ display: 'none' }} id="icon-button-file" type="file" /> */}
                <input type='hidden' onChange={this.props.handelChange} name={this.props.name} value={this.state.value} />

                <div
                    className={this.classes.wrapper}
                >

                    <Tooltip
                        id="tooltip-top-start"
                        title="اضافه کردن تصویر"
                        placement="top"
                        classes={{ tooltip: this.classes.tooltip }}
                    >
                        <Fab
                            aria-label="save"
                            color="primary"
                            component='label'
                            htmlFor="icon-button-file"
                        // className={buttonClassname}
                        // onClick={handleButtonClick}
                        >

                            {this.state.loaded == 100 ? <Check /> : <PhotoCamera />}
                        </Fab>
                    </Tooltip>
                    {this.state.loaded == 100 && <CircularProgress variant='determinate' value={this.state.loaded} size={68} className={this.classes.fabProgress} />}
                </div>
                {/* <FileInput onInputChange={this.handleselectedFile} text={this.state.files == null ? "انتخاب تصویر" : this.state.files} inputProps={{ multiple: this.props.multiple }} /> */}
                {/* {this.state.files && this.props.multiple && <Button onClick={this.handleUpload} text="ارسال" icon={"upload"} />} */}
                <div className={this.classes.thumbnailContainer}> {

                    this.state.thumbnails !== undefined ?

                        this.state.thumbnails.map((t, key) =>
                            <Tooltip
                                id="tooltip-top-start"
                                title={`${t.size} کیلوبایت`}
                                placement="top"
                                classes={{ tooltip: this.classes.tooltip }}
                                key={key}
                            >
                                <div className={this.classes.thumbBox}>
                                    <img src={t.src}
                                        width={this.props.thumbnailSize === undefined ? 50 : this.props.thumbnailSize}
                                        height={this.props.thumbnailSize === undefined ? 50 : this.props.thumbnailSize}
                                        className="thumbnail"
                                        alt={t.name} />
                                    {/* <span> <span>{t.name}</span></span> */}
                                    {/* <span> <span>{t.size}</span> KB</span> */}
                                </div>
                            </Tooltip>

                        ) : null


                }
                </div>
                {/* <ProgressBar value={this.state.loaded} intent={this.state.intent} animate={false} /> */}
                {/* <CircularProgress variant="determinate" value={this.state.loaded} color="secondary" /> */}

            </div>
        )
    }


}

// ImageUploader.prototype = {
//     endpoint : PropTypes.string,
//     thumbnailSize : PropTypes.number,
//     multiple : PropTypes.bool,
//     handleUploadResponse : PropTypes.func
// }

export default withStyles(classes)(ImageUploader);