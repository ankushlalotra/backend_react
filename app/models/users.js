"use strict";

import crypto from "crypto";
import CheckIt from "checkit";

import Bookshelf from "../db";
import { sanitize, isName, isID, isExist } from '../helpers/validate';

import { Identity } from './identity';


//Users Table Relation to get Data
var Users = Bookshelf.Model.extend({
  tableName: 'view_secure_users',
  idAttribute: 'uid',
  withIdentity: function() { // identity table relation with user table
    return this.hasOne(Identity,'uid','uid');
  },

});

module.exports={
    Users:Users
}
