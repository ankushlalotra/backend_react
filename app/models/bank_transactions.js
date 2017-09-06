"use strict";

import crypto from "crypto";
import CheckIt from "checkit";

import Bookshelf from "../db";
import { sanitize, isName, isID, isExist } from '../helpers/validate';

import { Users } from './users';
import { Currencies } from './currencies';
import { Ledger } from './Ledger';

//Users Table Relation to get Data
var Ledger = Bookshelf.Model.extend({
  tableName: 'bank_transactions',
  idAttribute: 'btid'
});


module.exports={
    Ledger : Ledger
}
