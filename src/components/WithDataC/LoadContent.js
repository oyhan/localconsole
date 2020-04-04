


const useStyles = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(2),
    },
}));

const Loader = ({ Component, dataSource, ...rest }) => {
    const [loading, setLoader] = useState(true);
    const [data, setData] = useState([]);


   

    const classes = useStyles();
    useEffect(() => {

        if (typeof dataSource == 'function')
            dataSource().then((r) => {

                setData(r);

                setLoader(false);
            })
        else
            dataSource.then((r) => {

                setData(r);

                setLoader(false);
            })
    }, [])


    return (
        (loading && <CircularProgress className={classes.progress} color="secondary" />
        ) ||
        <Component data={data} onSubmit={submit} {...rest} />

    )

}


export default Loader;
