import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from 'axios';
import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  description:{
    textAlign:'left'
  },
  label:{
    textAlign:'right'
  }
};

const useStyles = makeStyles(styles);



export default function UserProfile(props) {
  const [addingAddress, setAddingAddress] = React.useState(false)
  const [fullName,setFullName] = React.useState(props.userAddress.fullName ? props.userAddress.fullName : "")
  const [Address,setAddress] = React.useState(props.userAddress.Address ? props.userAddress.Address : "")
  const [City,setCity] = React.useState(props.userAddress.City ? props.userAddress.City : "")
  const [State,setState] = React.useState(props.userAddress.State ? props.userAddress.State : "")
  const [ZipCode,setZipCode] = React.useState(props.userAddress.ZipCode ? props.userAddress.ZipCode : "")
  const classes = useStyles();
  React.useEffect(()=>{
    setFullName(fullName)
  },[fullName]);


const handleCancel=()=>{
  setFullName(props.userAddress.fullName ? props.userAddress.fullName : "")
  setAddress(props.userAddress.Address ? props.userAddress.Address : "")
  setCity(props.userAddress.City ? props.userAddress.City : "")
  setState(props.userAddress.State ? props.userAddress.State : "")
  setZipCode(props.userAddress.ZipCode ? props.userAddress.ZipCode : "")
  setAddingAddress(false);
}


  const handleSave=(e)=>{
e.preventDefault();
    let data={
      email: props.user.email,
      fullName,
      Address,
      City,
      State,
      ZipCode
    }
    if (Object.keys(props.userAddress).length ===0 ){
    axios.post('http://localhost:8080/adduseraddress',data)
    .then(res => {
      if (res.data.affectedRows === 1){
      props.setUserAddress(data)
      setAddingAddress(false)
    }})
    .catch(err => console.log(err))
  } else{
    axios.post('http://localhost:8080/updateuseraddress',data)
    .then(res => {
      if (res.data.affectedRows === 1){
      props.setUserAddress(data)
      setAddingAddress(false)
    }})
    .catch(err => console.log(err))
  }
  }
 
  return (
    <div>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>{props.user.firstName?props.user.firstName.toUpperCase(): "" } {props.user.lastName?props.user.lastName.toUpperCase(): "" }</h4>
              {Object.keys(props.userAddress).length ===0 ?
              <p className={classes.description}>
              No Address Added
              </p>:
              <div>
                 <GridContainer>
                 <GridItem xs={12} sm={12} md={6}>
                 <p className={classes.label}>Shipping Name:</p>
                 <p className={classes.label}>Address:</p>
                 <p className={classes.label}>City:</p>
                 <p className={classes.label}>State:</p>
                 <p className={classes.label}>ZipCode:</p>
                 </GridItem>
                 <GridItem xs={12} sm={12} md={6}>
                 <p className={classes.description}>
              {props.userAddress.fullName}
              </p>
              <p className={classes.description}>
              {props.userAddress.Address}
              </p>
              <p className={classes.description}>
              {props.userAddress.City}
              </p>
              <p className={classes.description}>
              {props.userAddress.State}
              </p>
              <p className={classes.description}>
              {props.userAddress.ZipCode}
              </p>
                 </GridItem>
                 </GridContainer>
                
              </div>
              }

              <Button color="primary" round onClick={()=>setAddingAddress(true)}>
                Edit
              </Button>
            </CardBody>
          </Card>
          {addingAddress &&
          <form onSubmit={handleSave}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Address</h4>
              <p className={classes.cardCategoryWhite}>Complete your address</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Full name*"
                    id="fullname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={fullName}
                    onChange={setFullName}
                    required
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Address*"
                    id="address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={Address}
                    onChange={setAddress}
                    required
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="City*"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={City}
                    onChange={setCity}
                    required
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="State*"
                    id="state"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={State}
                    onChange={setState}
                    required
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code*"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={ZipCode}
                    onChange={setZipCode}
                    required
                  />
                </GridItem>
              </GridContainer>
             
            </CardBody>
            <CardFooter>
              <Button color="info" onClick={handleCancel}>Cancel</Button>
              <Button color="primary" type="submit">Save</Button>
            </CardFooter>
          </Card>
          </form>}
    </div>
  );
}
