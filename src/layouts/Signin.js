import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions';


class Signin extends Component {

    onSubmit = (formProps) => {
        this.props.signin(formProps, () => {
            this.props.getMyself(() => {
                this.props.history.push('/admin/dashboard');
            });
        });
    };

    render() {
        const {handleSubmit} = this.props;
        return (
            <div>
                <section className="fdb-block py-0">
                    <div className="container py-5 my-5" style={{backgroundImage: 'url(/assets/shapes/5.svg)'}}>
                        <div className=" row justify-content-end">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5 text-left">
                                <div className="fdb-box">
                                    <div className="row">
                                        <div className="col">
                                            <h1>Se connecter</h1>
                                            <p className="lead">Connectez vous avec votre email et mot-de-passe</p>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit(this.onSubmit)}>
                                        <div className="row">
                                            <div className="col mt-4">
                                                <fieldset>
                                                    <Field name='username'
                                                           type='text'
                                                           component='input'
                                                           autoComplete='off'
                                                           className="form-control"
                                                           placeholder="Email"/>
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col">
                                                <fieldset>
                                                    <Field
                                                        name='password'
                                                        type='password'
                                                        component='input'
                                                        autoComplete='off'
                                                        className='form-control'
                                                        placeholder='Mot de Passe'
                                                    />
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div>
                                            {this.props.errorMessage}
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col">
                                                <button name="btnSubmit" className="btn btn-secondary" type="submit">Submit</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessage,
        myself: state.myself
    }
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({form: 'signin'})
)(Signin);
