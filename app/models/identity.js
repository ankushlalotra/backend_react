"use strict";

import crypto from "crypto";
import CheckIt from "checkit";

import Bookshelf from "../db";
import { sanitize, isName, isID, isExist } from '../helpers/validate';

import { Users } from './users';


//Identity Table Relation to get Data
var Identity = Bookshelf.Model.extend({
  tableName: 'identity',
  idAttribute: 'uid',
  withUsers: function() {
    return this.belongsTo(Users,'uid','uid');
  }
});


module.exports={
	Identity:Identity
}
