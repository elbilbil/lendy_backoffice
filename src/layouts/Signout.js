import React , {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Link} from "react-router-dom";

class Signout extends Component {
    componentDidMount(){
        this.props.signout();
    }

    render(){
        return (
            <section className="fdb-block py-0">
                <div className="container py-5 my-5" style={{backgroundImage: 'url(assets/shapes/2.svg)'}}>
                    <div className="row justify-content-center py-5">
                        <div className="col-12 col-md-10 col-lg-8 text-center">
                            <div className="fdb-box">
                                <h1>A bientôt sur Lendy</h1>
                                <p className="lead">
                                    Vous etes déconnecté !
                                </p>
                                <p className="mt-4">
                                    <Link className="btn btn-primary" to='/'>Retour à l'accueil</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default connect(null, actions)(Signout);
