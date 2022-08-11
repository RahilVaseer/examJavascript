import React from 'react'
import Header from '../components/Header';
import Main from '../components/Main';

export default function AppLayout(props) {
    return (
        <div className="row no-gutters app-main">
            <Header
            />
            <div className="row no-gutters m-0 p-0">
                <div className="col col-sm-12 col-md-12 col-lg-11 col-11 m-0 ">
                    <Main > {props.children}</Main>
                </div>
            </div>
        </div>
    )
}