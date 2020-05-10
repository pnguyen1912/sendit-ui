const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');
const bodyParser = require('body-parser');
const { Builder, By, Key, until } = require('selenium-webdriver');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.listen(3000)
console.log(process.env.NODE_ENV)

async function example() {

  let driver = await new Builder().forBrowser('firefox').build();
  try {
    // Navigate to Url

    driver.get('https://www.amazon.com/gp/product/B01D8KOZF4/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1');


    //log in
    const actions = driver.actions({ bridge: true });

    await actions.click(driver.findElement(By.id("nav-link-accountList"))).perform();

    await driver.wait(until.elementLocated(By.name('email'))).sendKeys(username, Key.ENTER)

    // driver.findElement(By.id('continue')).click();

    await driver.wait(until.elementLocated(By.id('ap_password'))).sendKeys(password, Key.ENTER)

    await driver.wait(until.elementLocated(By.id('buy-now-button'))).click();

    await driver.wait(until.elementLocated(By.id('addressChangeLinkId'))).click();

    await driver.wait(until.elementLocated(By.id('add-new-address-popover-link'))).click();

    await driver.wait(until.elementLocated(By.id('address-ui-widgets-enterAddressFullName'))).sendKeys('Patton Nguyen');

    await driver.wait(until.elementLocated(By.id('address-ui-widgets-enterAddressLine1'))).sendKeys('4666 Skylark ln');

    await driver.wait(until.elementLocated(By.id('address-ui-widgets-enterAddressCity'))).sendKeys('Greendale');

    await driver.wait(until.elementLocated(By.id('address-ui-widgets-enterAddressStateOrRegion'))).sendKeys('Wisconsin');

    await driver.wait(until.elementLocated(By.id('address-ui-widgets-enterAddressPostalCode'))).sendKeys('53129');

    await driver.wait(until.elementLocated(By.id('address-ui-widgets-enterAddressPhoneNumber'))).sendKeys('4143062025', Key.ENTER);



    // await driver.findElement(By.id('address-ui-checkout-submit-button-announce')).click();



    // this to hover
    // await actions.move({ origin: elem, x: 0, y: 0 }).perform();





    //if not signed in
    //click accoutn and lists. wait for login page to laod
    //fill email box with server amazon email
    //click continue, wait next page
    //fill password box with server amazon email
    //click signin, wait product page to load

    //if at any step sign in fails, error out and pass data through to email or db
    //multi factor

    //if quantity parameter exists && not equal 1
    //click quantity box and change it to the desired quantity

    //click add to cart wait for next page
    //click proceed to checkout wait for checkout page

    //**if mfa site comes up (G fuckin G) some suggestions -- hire helpdesk or maybe get a phonenumber and a text parser on the server
    //fill in server's amazon account password
    //wait for mfa token 2 mins. and pass the token to the selenium server

    //click the change next to shipping address wait for modal to load
    //click add a new shipping address

    // Full name: and type
    // Address line 1: and type
    // Address line 2: and type
    // City: and type
    // State/Province/Region: and type
    // ZIP: and type
    // Country/Region: and type
    // Phone number:  and type
    // click Deliver to this address when done. wait for page to load
    //click add a card -- wait for boxes to drop down
    //click Name on card box and type
    //click Card Number box and type
    //click month to make it dropdown then click on the month
    //click year to amke it dropdown then click on year
    //uncheck Set as default payment method
    //click add your card button load next page
    //entering new billing address

    // Full name:
    // Address line 1:
    // Address line 2:
    // City:
    // State/Province/Region:
    // ZIP:
    // Country/Region:
    // Phone number:

    //click use this address

    //can enter a code here if we cna get referaal code/ discount code

    //select free prime delivery and record the delivery date text

    //click place your order wait for page to load

    //**product should be bought and shipped */
    //**now we have to clean up and remove addresses from the account */

    //hover over account & lists
    //clikc your account
    //clikc your addresses
    //loop here:
    //click remove address
    //hover over account & lists
    //clikc your account
    //click payment options
    //click dropdown arrow
    //click remove wait for modal to come up
    //click confirm remove
    //hover over account & lists
    //clikc your orders
    //copy and return order details to order database
    //close window



    // //then
    // // Enter text "cheese" and perform keyboard action "Enter"
    // let thing =  await driver.findElement(By.id('hplogo')).sendKeys('cheese', Key.ENTER);

    // let firstResult = await driver.wait(until.elementLocated(By.css('h3>div')), 10000);

    // console.log(await firstResult.getAttribute('textContent'));
  }
  finally {
    // driver.quit();
  }
};

let username = 'pnguyen1912@gmail.com'
let password = 'tanphat'


















const connection = mysql.createConnection({
  host: "aa1lra2lijiu110.cmzwhhc2xh1e.us-east-2.rds.amazonaws.com",
  user: "username",
  password: "password",
  port: 3306
})

connection.connect(err => {
  if (err) {
    console.error(err)
  } else {
    console.log('Connected!!! YAHOOO!!!!')
  }
})


    app.post('/createuser', (req, res) => {
      console.log(req.body)
      connection.query(fs.readFileSync('./sql/createUser.sql').toString(), [req.body.email, req.body.password1,req.body.firstName,req.body.lastName, 'no'], (err, resp) => {
        if (err) {
          res.json(err)
        }
        res.json(resp)
      })
    })

    app.post('/getuserdata', (req, res) => {
      console.log(req.body)
      connection.query(fs.readFileSync('./sql/getUser.sql').toString(), [req.body.email], (err, resp) => {
        if (err) {
          res.json(err)
        }
        if (resp[0] === undefined){
          res.json('No email found')
        } else{
        if (req.body.password === resp[0].password) {
          res.json({firstName: resp[0].FirstName, 
            lastName: resp[0].LastName,
            email: resp[0].emailAddress,
            withAddress: resp[0].WithAddress})
        } else {
          res.json('Not Corrected')
        }
      }
      })
    })

    app.post('/getuserinfo', (req, res) => {
      console.log(req.body)
      connection.query(fs.readFileSync('./sql/getUser.sql').toString(), [req.body.email], (err, resp) => {
        if (err) {
          res.json(err)
        }
        if (resp[0] === undefined){
          res.json('No email found')
        } else{
     res.json(resp[0])
      }
      })
    })

    app.post('/getuseraddress', (req, res) => {
      console.log(req.body)
      connection.query(fs.readFileSync('./sql/getUserAddress.sql').toString(), [req.body.email], (err, resp) => {
        if (err) {
          res.json(err)
        }
        if (resp[0] === undefined){
          res.json('No address found')
        } else{
          res.json(resp[0])
      }
      })
    })

    app.post('/adduseraddress',(req,res)=>{
      console.log(req.body)
      connection.query(fs.readFileSync('./sql/AddNewUserAddress.sql').toString(),[
        req.body.email,req.body.fullName, req.body.Address, req.body.City, req.body.State, req.body.ZipCode
      ],(err,resp)=>{
        if (err) {
          res.json(err)
        }
        res.json(resp)
      })
    })

    app.post('/updateuseraddress',(req,res)=>{
      console.log(req.body)
      connection.query(fs.readFileSync('./sql/UpdateUserAddress.sql').toString(),[
        req.body.fullName, req.body.Address, req.body.City, req.body.State, req.body.ZipCode,req.body.email
      ],(err,resp)=>{
        if (err) {
          res.json(err)
        }
        res.json(resp)
      })
    })