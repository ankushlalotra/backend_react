"use strict";

import Base from "./base";
import cors from "cors";

module.exports = (router, middlewares) => {

    // middleware for this route only
    router.use('/users',cors(), (req, res, next) => next() );

    // all the routes related to '/users'

    const base = new Base();
    router.route('/users')
        .all(base.all) // open route
        .get(base.get) // fetch all users
        .post(base.post); // create new user

    //filter User
    router.route('/users/filter')
        .post(base.filter) 

     //filter User
    router.route('/user/:id')
        .get(base.getUser) 
        
    //Holding User Detail
    router.route('/user/holdings/:id')
        .get(base.getHolding) 
    
    //Transaction History    
    router.route('/user/transactions/:id')
        .get(base.getTransactions) 
     
    //Update Users Detail
    router.route('/user/update')
        .post(base.updateUser) 

};
