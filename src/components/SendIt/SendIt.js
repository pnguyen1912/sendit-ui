import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
// import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomSelect from "components/CustomInput/CustomeSelect.js";
import Search from "@material-ui/icons/Search";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from "components/CustomButtons/Button.js";
import FormControl from '@material-ui/core/FormControl';
import Cards from 'react-credit-cards';
import axios from 'axios';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import avatar from "assets/img/faces/marc.jpg";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import 'react-credit-cards/es/styles-compiled.css';



const styles = {
  middle:{
    textAlign: 'center'
  },
  adjustWidth:{
    width: '50%'
  },
  marginTop20:{
    marginTop:'20%'
  },
  marginTop10:{
    marginTop: '10%'
  }
};

const useStyles = makeStyles(styles);

export default function SendIt(props){
    const [search,setSearch] = React.useState('')
    const [foundIt, setFoundIt] = React.useState(false)
    const [receiver, setReceiver] = React.useState({})
    const [sending, setSending] = React.useState(false)
    const [seller, setSeller] = React.useState('Amazon')
    const [productLink,setProductLink] = React.useState('')
    const [paying, setPaying] =React.useState(false)
    const classes = useStyles();

    //credit card
    const [name,setName] = React.useState('');
    const [number,setNumber] = React.useState('');
    const [expiry,setExpiry] = React.useState('');
    const [focus,setFocus] = React.useState('');
    const [cvc,setCvc] = React.useState('');


const handleSend=(e)=>{
e.preventDefault();
setPaying(true)
setSending(false)
}

const handleCancel =()=>{
  setSending(false)
  setProductLink('')
  setSeller('')
}

const handleBack =()=>{
  setPaying(false)
  setSending(true)
}

const handlePayment =(e)=>{
  e.preventDefault();
}

const searchEmail = (e)=>{
  e.preventDefault();
  if (search !== ""){
  axios.post('http://localhost:8080/getuseraddress',{email: search})
          .then(res => {
            if (res.data !== 'No address found'){
              axios.post('http://localhost:8080/getuserinfo',{email:res.data.emailAddress})
                .then(resp => {
                  setReceiver(resp.data)
                  setFoundIt(true)
                  setSearch('')
                })
                .catch(err=> console.log(err))
            } else{
              setFoundIt(false)
              setSending(false)
              setPaying(false)
            }
          })
        }}

    return(
        <div className={classes.middle}>
          <form onSubmit={searchEmail}>
        <CustomInput
          formControlProps={{
            className: classes.adjustWidth
          }}
          inputProps={{
            placeholder: "Search By Email",
            inputProps: {
              "aria-label": "Search"
            }
          }}
          fullWidth
          value={search}
          onChange={setSearch}
        />
        <Button color="white" aria-label="edit" justIcon round type="submit" onClick={searchEmail}>
          <Search />
        </Button>
        </form>

          {foundIt &&
          <div>
        <Card className={sending || paying? classes.marginTop10 :classes.marginTop20} profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>{receiver.FirstName?receiver.FirstName.toUpperCase(): "" } {receiver.LastName?receiver.LastName.toUpperCase(): "" }</h4>
          
              <p className={classes.description}>
              {receiver.emailAddress}
              </p>

              <Button color="primary" onClick={()=>{setSending(!sending);setPaying(false)}}>
                SendIt
              </Button>
            </CardBody>
          </Card>
          
          {sending &&
          <form onSubmit={handleSend}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Link your gift</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                  <CustomInput
                    labelText="Product Link*"
                    id="productlink"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={productLink}
                    onChange={setProductLink}
                    required
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
            
<CustomSelect 
                    labelText="Seller*"
                    formControlProps={{
                      fullWidth: true
                    }}
                    values={['Amazon']}
                    value={seller}
                    onChange={setSeller}
                    required
/>
{/* <CustomInput
                    labelText="City*"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                  /> */}
               
                </GridItem>
              </GridContainer>
           
            
            </CardBody>
            <CardFooter>
              <Button color="info" onClick={handleCancel}>Cancel</Button>
              <Button color="primary" type="submit">Go to Payment</Button>
            </CardFooter>
          </Card>
          </form>}
          
          {paying &&
          <form onSubmit={handlePayment}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Payment</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem  xs={12} sm={12} md={6}>
                  <div className={classes.marginTop10}>
                <Cards
                 
          cvc={cvc}
          expiry={expiry}
          focused={focus}
          name={name}
          number={number}
        /></div>
                </GridItem>
                <GridItem  xs={12} sm={12} md={6}>
                
                <CustomInput
                    labelText="Number*"
                    id="number"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={number}
                    onChange={setNumber}
                    onFocus={setFocus}
                    required
                  />
          <CustomInput
                    labelText="Name*"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={name}
                    onChange={setName}
                    onFocus={setFocus}
                    required
                  />
                  
                   <CustomInput
                    labelText="Valid Through*"
                    id="expiry"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={expiry}
                    onChange={setExpiry}
                    onFocus={setFocus}
                    required
                  />
                   <CustomInput
                    labelText="CVC*"
                    id="cvc"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={cvc}
                    onChange={setCvc}
                    onFocus={setFocus}
                    required
                  />
                </GridItem>
              </GridContainer>
        
       
           
            
            </CardBody>
            <CardFooter>
              <Button color="info" onClick={handleBack}>Back</Button>
              <Button color="primary" type="submit">Submit</Button>
            </CardFooter>
          </Card>
          </form>}


          </div>
          }
      </div>
    )
}