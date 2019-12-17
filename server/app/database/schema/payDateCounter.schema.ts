// schema for invoice
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export let payDateCounterSchema = new Schema({
    date: {type: Date},
    invoice_id: [String],
    amount: Number
});
