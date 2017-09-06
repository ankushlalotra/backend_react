"use strict";

import CheckIt from "checkit";
import Jwt from "jsonwebtoken";

import HTTP from "../../helpers/httpcodes";
import { ModelError, ISE } from "../../helpers/error-handler";

// models used
import { Users } from "../../models/users";
import { Accounts } from "../../models/account";
import { Ledger } from "../../models/ledger";

class Base {

    all (req, res, next) { next() }

    // GET request
    get (req, res) {
        Users.fetchAll({withRelated: ['withIdentity']})
        .then( all_users => {
            if (all_users.length) {
                res.status(HTTP.OK).json({
                    message: "Users found",
                    data: all_users.toJSON()
                });
            }
            else {
                res.status(HTTP.NOT_FOUND).json({ message: "No User found", data:error.message })
            }
        })
        .catch((error) => { ISE(error, res) });
    }

    // POST request
    post (req, res) {

        const user = new Users({
            Phone: req.body.phone,
            Name: req.body.name,
            Email: req.body.email
        });

        user.save()
        .then( model => {

            const token = Jwt.sign(
                { id: model.StringID },
                new Buffer(process.env.JWT_SECRET, "base64"),
                { algorithm: 'HS512', expiresIn: '1d' }
            );

            res.status(HTTP.OK).json({
                message: "User successfully created",
                data: {
                    id: model.StringID,
                    token: token
                }
            });

        })
        .catch((error) => { ModelError(error, res) });

    }
    //filter users
    // filter (req, res) {
    //     var filterArguments = req.body.filter;

    //     Users.query(function(qb) {
    //         filterArguments.forEach(function(data, index, arr){
    //             if(data.tab == 'user'){
    //                 qb.where(data.filterby, data.type, data.value);
    //             }
    //         });

    //     }).fetchAll({withRelated: ['withIdentity', {
    //         'withIdentity': function(qb) {
    //             filterArguments.forEach(function(data, index, arr){
    //                 if(data.tab == 'identity'){
    //                     qb.where(data.filterby, data.type, data.value);
    //                 }
    //             });
    //         }
    //     }]})
    //     .then( all_users => {
    //         if (all_users.length) {
    //             res.status(HTTP.OK).json({
    //                 message: "Users found",
    //                 data: all_users.toJSON()
    //             });
    //         }
    //         else {
    //             res.status(HTTP.NOT_FOUND).json({ message: "No User found", data:error.message })
    //         }
    //     })
    //     .catch((error) => { ISE(error, res) });
    // }

    // Users Filters
    filter (req, res) {
       var filterArguments = req.body;

       Users.forge().query(function(qb) {
         qb.innerJoin('identity', 'view_secure_users.uid', '=', 'identity.uid');
         if(filterArguments.column == 'all'){
            qb.where('view_secure_users.email','like', filterArguments.searchText);
            qb.orWhere('view_secure_users.uid','like',filterArguments.searchText);
            qb.orWhere('view_secure_users.cell_number','like',filterArguments.searchText);
            qb.orWhere('view_secure_users.username','like',filterArguments.searchText);
            qb.orWhere('identity.firstname','like',filterArguments.searchText);
            qb.orWhere('identity.lastname','like',filterArguments.searchText);
            
         }else{
             if(filterArguments.column == 'email' || filterArguments.column == 'user_id' || filterArguments.column == 'phone_number' || filterArguments.column == 'username'  ){
               qb.where('view_secure_users.'+filterArguments.column,filterArguments.option, filterArguments.searchText);
             }else{
               qb.where('identity.'+filterArguments.column,filterArguments.option, filterArguments.searchText);
             }
         }
       })
       .fetchAll({withRelated: 'withIdentity'})
       .then( all_users => {

           if (all_users.length) {

               res.status(HTTP.OK).json({
                   message: "Users found",
                   data: all_users.toJSON()
               });
           }
           else {

               res.status(HTTP.OK).json({ message: "No User found", data:"" })
           }
       })
       .catch((error) => { ISE(error, res) });
    }

    //filter users
    getUser (req, res) {
        var userId = req.params.id;
        console.log(userId,"userID");
        Users.where('uid', '=', userId).fetchAll({withRelated: ['withIdentity']})
        .then( user => {
            if (user.length) {
                res.status(HTTP.OK).json({
                    message: "Users found",
                    data: user.toJSON()
                });
            }
            else {
                res.status(HTTP.NOT_FOUND).json({ message: "No User found", data:error.message })
            }
        })
        .catch((error) => { ISE(error, res) });
    }

    //get User holdings
    getHolding (req, res) {
        var userId = req.params.id;
        console.log(userId,"userID");
        Accounts.where('uid', '=', userId).fetchAll({withRelated: ['withCurrencies']})
        .then( user => {
            if (user.length) {
                res.status(HTTP.OK).json({
                    message: "Users found",
                    data: user.toJSON()
                });
            }
            else {
                res.status(HTTP.NOT_FOUND).json({ message: "No User found", data:error.message })
            }
        })
        .catch((error) => { ISE(error, res) });
    }


    //get Transaction History
    getTransactions (req, res) {
        var userId = req.params.id;


         Ledger.forge().query(function(qb) {
           qb.innerJoin('bank_transactions', 'ledger.refid', '=', 'bank_transactions.btid');

           qb.where('ledger.uid', '=', userId);
         })
         .fetchAll({withRelated: 'ledgerWithCurrencies'})
         .then( all_users => {

             if (all_users.length) {

                 res.status(HTTP.OK).json({
                     message: "Users found",
                     data: all_users.toJSON()
                 });
             }
             else {

                 res.status(HTTP.OK).json({ message: "No User found", data:"" })
             }
         })
         .catch((error) => { ISE(error, res) });


    }

    // Update user Detail
    updateUser (req, res){

        var updateParams = req.body;
        //var Keys=Object.keys(updateParams);
        //    Keys.map(function(value,index){
        //     console.log(updateParams[value]);
        // })


        Users.forge().query(function(qb) {
            console.log(updateParams,"Params");
            qb.where('view_secure_users.uid','=',updateParams.user_id)
            qb.innerJoin('identity', 'view_secure_users.uid', '=', 'identity.uid');
            delete updateParams["user_id"];

            qb.update(updateParams,{
                method:'update',
                patch:true
            })
         })
        .fetchAll({withRelated: 'withIdentity'})
        .then( user => {
            if (user.length) {
                res.status(HTTP.OK).json({
                    message: "Users found",
                    update: true,
                    data: user.toJSON(),

                });
            }
            else {
                res.status(HTTP.NOT_FOUND).json({ message: "No User found", data:error.message })
            }
        })
        .catch((error) => { ISE(error, res) });
    }
}

export default Base;
