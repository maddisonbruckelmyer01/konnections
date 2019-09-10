import React, {Component} from 'react';
import {connect} from 'react-redux';

class Counselors extends Component {

    componentDidMount() {
        this.getCounselors()
    }//end componentDidMount

    getCounselors = () => {
        this.props.dispatch({
            type: 'FETCH_COUSELORS'
        })
    }//end getCounselors

    render() {
        return (
            <div>
                {
                    this.props.counselorReducer.map((counselor) => {
                        return (<><div key={counselor.id}><h3>{counselor.name}</h3>
                                <a href={counselor.website}>Website</a>
                                <p>Phone Number: {counselor.phone_number}</p> 
                                <p>{counselor.description}</p>
                                </div></>)
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
    counselorReducer: state.counselorReducer
    }
}

export default connect(mapStateToProps)(Counselors);