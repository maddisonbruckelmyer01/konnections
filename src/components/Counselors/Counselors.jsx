import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import UserPage from '../UserPage/UserPage';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        margin: '0px 100px 0px 100px'
    },
    card: {
        maxWidth: '260px',
        maxLength: '150px',
        marginLeft: '24px',
        marginBottom: '24px',
    },
    content: {
        marginLeft: '5px'
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: '12px'
    },
    table: {
        minWidth: 650,
    },
    button: {
        margin: theme.spacing.unit
    },
    input: {
        display: 'none'
    }
});

class Counselors extends Component {

    componentDidMount() {
        this.getCounselors()
    }//end componentDidMount

    getCounselors = () => {
        this.props.dispatch({
            type: 'FETCH_COUNSELORS'
        })
    }//end getCounselors

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <UserPage />
                </Grid>
                {this.props.counselorReducer.map((couselor) => {
                    return (
                        <>
                        <Card className={classes.card}>
                        <CardContent className={classes.content}>
                        <Typography variant="h6" component="h3">
                            {couselor.name}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {couselor.description}
                        </Typography>
                        <Typography>
                            Phone Number: {couselor.phone_number}
                        </Typography>
                        <Button
                            href={couselor.website}
                            target="_blank"
                            rel="noreferrer"
                            className={classes.button}
                            color="secondary"
                        >
                            Go To Website
                        </Button>
                        </CardContent>
                        </Card>
                        </>
                    )
                })}
            </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
    counselorReducer: state.counselorReducer
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Counselors));