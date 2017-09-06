"use strict";

import crypto from "crypto";
import CheckIt from "checkit";

import Bookshelf from "../db";
import { sanitize, isName, isID, isExist } from '../helpers/validate';
	

//Users Table Relation to get Data
var Currencies = Bookshelf.Model.extend({
  tableName: 'currencies',
  idAttribute: 'ccyid'
  
});


module.exports={
    Currencies : Currencies
}
