/*
 * API endpoints are defined here
 * all routes start with /api
 */
express = require('express');
import {CustomerController} from '../controllers/customer.controller';
import {ProductController} from '../controllers/product.controller';
import {AreaController} from '../controllers/area.controller';
import {InvoiceController} from '../controllers/invoice.controller';
import {PayDateCounterController} from '../controllers/payDateCounter.controller';
import {ReportController} from '../controllers/report.controller';

const router = express.Router();

const multer = require('multer');
const upload = multer();
let type = upload.single('csvFile');


router.get('/', (req, res) => {
    res.send("Welcome to API routes");
});

//customer file upload
router.post('/customer/create', (req, res) => {
    CustomerController.createNewCustomer(res, req.body);
});

//all customers
router.get('/customer/all/page=:paginator', (req, res) => {
    CustomerController.getAllCustomers(res, req.params.paginator);
});

//set active/inactive status
router.put('/customer/status_change', (req, res) => {
    CustomerController.changeStatus(res, req.body);
});

//get details of specific customer by id
router.get('/customer/details/:id', (req, res) => {
    CustomerController.getCustomerDetails(res, req.params.id);
});

//update customer details
router.put('/customer/details/update', (req, res) => {
    CustomerController.updateCustomerDetails(res, req.body);
});

// create new product
router.post('/product/create', (req, res) => {
    ProductController.create(res, req.body);
});

// get all product
router.get('/product/all', (req, res) => {
    ProductController.getAllProduct(res);
});

//get product by id
router.get('/product/id/:id', (req, res) => {
    ProductController.getProductById(res, req.params.id);
});

//set active/inactive status
router.put('/product/status_change', (req, res) => {
    ProductController.changeStatus(res, req.body);
});

//update product
router.put('/product/update', (req, res) => {
    ProductController.update(res, req.body);
});


//create a new area
router.post('/area/create', (req, res) => {
    AreaController.create(res, req.body);
});

//get all areas
router.get('/area/all', (req, res) => {
    AreaController.getAllArea(res);
});

//set active/inactive status
router.put('/area/status_change', (req, res) => {
    AreaController.changeStatus(res, req.body);
});

//get area by id
router.get('/area/id/:id', (req, res) => {
    AreaController.getAreaById(res, req.params.id);
});

//update area
router.put('/area/update', (req, res) => {
    AreaController.update(res, req.body);
});

//search all customers data by username
router.post('/customer/search/username', (req, res) => {
    CustomerController.searchByUsername(res, req.body);
});

//search all customers data by mobile number
router.post('/customer/search/mobile_number', (req, res) => {
    CustomerController.searchByMobileNumber(res, req.body);
});

//search all customers data by area
router.post('/customer/search/area', (req, res) => {
    CustomerController.searchByArea(res, req.body);
});

//search all customers data by area id
router.post('/customer/search/customerByArea', (req, res) => {
    CustomerController.customerByArea(res, req.body);
});

router.get('/customer/id/username=:username', (req, res) => {
    CustomerController.getIdByUsername(res, req.params.username);
});

//get recent invoices (this month)
router.get('/invoice/recent/customers', (req, res) => {
    InvoiceController.getRecentInvoiceCustomers(res);
});

//search all products data by name
router.post('/product/search/name', (req, res) => {
    ProductController.searchByName(res, req.body);
});

// post invoice
router.post('/invoice/create', (req, res) => {
    InvoiceController.storeInvoice(res, req.body);
});

// generate invoice as PDF
router.post('/invoice/generate/pdf', (req, res) => {
    InvoiceController.generateInvoice(res, req.body);
});

// get invoice by id
router.get('/invoice/:type/id/:id', (req, res) => {
    InvoiceController.getInvoiceById(res, req.params.type, req.params.id);
});

//search all customers data by username
router.post('/invoice/search/username', (req, res) => {
    InvoiceController.searchByUsername(res, req.body);
});

// insert recent invoice into DB
router.post('/invoice/recent/save', (req, res) => {
    InvoiceController.saveRecentInvoice(res, req.body);
});

//drop all recent invoices
router.get('/invoice/drop/recent/all', (req, res) => {
    InvoiceController.dropRecentInvoiceAll(res);
});

//check if recent invoices exists
router.get('/invoice/recent_invoice/exists', (req, res) => {
    InvoiceController.checkRecentInvoiceExists(res);
});

// get invoice from db
router.get('/invoice/recent_invoice_db/paginator=:paginator', (req, res) => {
    InvoiceController.getRecentInvoiceDB(res, req.params.paginator);
});

// clean and nuke recent invoices
router.get('/invoice/clean_invoice', (req, res) => {
    InvoiceController.cleanInvoice(res);
});

router.put('/invoice/change_status', (req, res) => {
    InvoiceController.changeStatus(res, req.body);
});

router.post('/invoice/product_list/total', (req, res) => {
    ProductController.getTotal(res, req.body);
});

router.get('/invoice/recent/build_and_save', (req, res) => {
    InvoiceController.buildAndSaveRecentInvoice(res);
});

router.post('/invoice/recent/partial_pay/save', (req, res) => {
    InvoiceController.savePartialPay(res, req.body);
});

router.post('/invoice/pre_generate_update', (req, res) => {
    InvoiceController.preGenerateUpdate(res, req.body);
});

router.post('/invoice/delete', (req, res) => {
    InvoiceController.deleteInvoice(res, req.body);
});

// get all invoices
router.get('/invoice/all/page=:paginator', (req, res) => {
    InvoiceController.getAllInvoices(res, req.params.paginator);
});

// create new invoice
router.post('/invoice/create/new', (req, res) => {
    InvoiceController.createNewInvoice(res, req.body);
});

//pay date coounter clean
router.get('/home/pay-date-counter/clean-build', (req, res) => {
    PayDateCounterController.checkAndCleanPayDateCounter(res);
});

//set pay date counter
router.post('/invoice/set_paid_date_counter', (req, res) => {
    PayDateCounterController.setPayDateCounter(res, req.body);
});

// get pay date counter
router.get('/invoice/get_paid_date_counter', (req, res) => {
    PayDateCounterController.getPayDateCounter(res);
});

// get all invoice count
router.get('/invoice/all_invoice_count', (req, res) => {
    InvoiceController.getAllInvoiceCount(res);
});

// save auto invoive
router.post('/invoice/save-auto-invoice', (req, res) => {
    InvoiceController.saveAutoInvoice(res, req);
});

// global invoice search by customer
router.get('/invoice/global-search-by-customer/:query', (req, res) => {
    InvoiceController.globalSearchByCustomer(res, req.params.query);
});

//get invoice by customer id
router.get('/invoice/by-customer-id/:id', (req, res) => {
    InvoiceController.getInvoiceByCustomerId(res, req.params.id);
})


// remove Invoice
router.post('/invoice/remove-invoice', (req, res) => {
    InvoiceController.removeInvoice(res, req.body);
})


//get customer by area
router.get('/report/customer_by_area/:id', (req, res) => {
    ReportController.getCustomerByArea(res, req.params.id);
});

// generate report for a list of customers
router.get('/report/report_for_customers/:id', (req, res) => {
    ReportController.getReportForCustomers(res, req.params.id);
});

// check status change for generate invoice monthly
router.post('/customer/check_change_generate_invoice_monthly', (req, res) => {
    CustomerController.setCheckGenerateInvoice(res, req.body);
});

router.post('/upload-file', (req, res) => {
    CustomerController.uploadFile(res, req.body);
});

router.post('/customer/upload-file-contents', type, (req, res, next) => {
    CustomerController.getFileContents(res, req);
});

router.get('/customer/customer-count', (req, res) => {
    CustomerController.getTotalCustomerCount(res);
});

router.get('/customer/generate-auto-invoice/:id', (req, res) => {
    CustomerController.generateAutoInvoice(res, req.params.id);
});

router.get('/customer/global-search/:query', (req, res) => {
    CustomerController.searchAllCustomer(res, req.params.query);
});

router.get('/customer/get-auto-generate-list', (req, res) => {
    CustomerController.getAutoGenerateCustomerList(res);
});


module.exports = ApiRoute;
