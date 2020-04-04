import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ShowSnack } from 'infrastructure/Helper/Showsnack';
import AppLoader from 'components/AppLoader/AppLoader';


export default function WithData({ Component, dataSource, onSubmit }) {
    return class extends React.Component {

        state = {
            loading: true,
            data: []

        }
      

        submit(e) {
            this.setState({ loading: true });

            return onSubmit(e).then(r => {
                this.setState({ loading: false });
                ShowSnack.Success("اطلاعات با موفقیت ثبت شد")

                return Promise.resolve("ok");
            }, (error) => {
                this.setState({ loading: false });

                ShowSnack.Error(error)
                return Promise.reject("error");
            })

        }
        componentDidMount() {
            if (typeof dataSource == 'function')
                dataSource().then((r) => {

                    this.setState({ data: r, loading: false });


                })
            else
                dataSource.then((r) => {

                    this.setState({ data: r, loading: false });

                })

        }

        render() {
            return (
                (this.state.loading &&
                    <AppLoader />
                ) ||
                <Component data={this.state.data} onSubmit={this.submit.bind(this)} {...this.props} />

            )
        }
    }
}



// const WithData = ({ Component, dataSource, onSubmit, ...rest }) => {


//     const useStyles = makeStyles(theme => ({
//         progress: {
//             margin: theme.spacing(2),
//         },
//     }));

//     const X = () => {
//         const [loading, setLoader] = useState(true);
//         const [data, setData] = useState([]);


//         const submit = (e) => {
//             setLoader(true);

//             onSubmit(e).then(r => {
//                 setLoader(false);
//                 ShowSnack.Success("Data submited successfully")


//             }, (error) => {
//                 setLoader(false);
//                 ShowSnack.Error(error)
//             })

//         }

//         const classes = useStyles();
//         useEffect(() => {

//             if (typeof dataSource == 'function')
//                 dataSource().then((r) => {

//                     setData(r);

//                     setLoader(false);
//                 })
//             else
//                 dataSource.then((r) => {

//                     setData(r);

//                     setLoader(false);
//                 })
//         }, [])


//         return (
//             (loading && <CircularProgress className={classes.progress} color="secondary" />
//             ) ||
//             <Component data={data} onSubmit={submit} {...rest} />

//         )

//     }

//     return X;
// }
// export default WithData;




