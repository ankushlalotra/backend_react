"use strict";

import crypto from "crypto";
import CheckIt from "checkit";

import Bookshelf from "../db";
import { sanitize, isName, isID, isExist } from '../helpers/validate';

import { Users } from './users';
import { Currencies } from './currencies';

//Users Table Relation to get Data
var Ledger = Bookshelf.Model.extend({
  tableName: 'ledger',
  idAttribute: 'lid',
  withUser: function() {
    return this.belongsTo(Users,'uid','uid');
  },
  ledgerWithCurrencies: function() {
    return this.hasOne(Currencies,'ccyid','ccyid');
  }
});


module.exports={
    Ledger : Ledger
}
