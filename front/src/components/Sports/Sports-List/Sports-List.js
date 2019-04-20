import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteSport } from '../../../actions/sports';

const styles = {
    borderBottom: '2px solid #eee',
    background: '#fafafa',
    margin: '.75rem auto',
    padding: '.6rem 1rem',
    maxWidth: '500px',
    borderRadius: '15px'
};

class SportsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sports: []
        };
        // this.handleDelete = this.handleDelete.bind(this);
    }
    componentDidMount() {
        this.setState({
            sports: this.props.sports
        });
        console.log(this.props.sports.sportName)
    };
    handleDelete = (id) => {
        console.log("Hello Delo")
        this.props.onDelete(id)
    }
    renderSports = (sports) => {
        return (
            <table style={styles} key={sports._id}>
                <tbody>
                    <tr>
                        <td> {sports.sportName}</td>
                        <td>
                            <button className="btn btn-danger" type="button" onClick={() =>this.handleDelete(sports._id)}>
                                Remove
                        </button>
                        </td>

                    </tr>
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div style={styles}>
                <h1>Sports</h1>
                {this.props.sports.map(this.renderSports)}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        sports: state.sports
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDelete: id => {
            dispatch(deleteSport(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SportsList);