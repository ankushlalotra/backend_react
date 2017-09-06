"use strict";

import HTTP from "../helpers/httpcodes";

module.exports = (router, middlewares) => {

    router.route('/')
        // .all(middlewares.authenticate) // will be run for all type of request on '/'

        .get( (req, res, next) => {
            res.status(HTTP.OK).json("Welcome To CoinSquare API!");
        } )

        .post( (req, res, next) => {
            res.status(HTTP.OK).json("So, you know there are more than one type of request");
        } );

};
