import React from 'react'
import {makeStyles } from "@material-ui/core/";
import styles from "../../../../../Styles";
import { useHistory } from 'react-router-dom';
import {TextField,Button,Box,Divider} from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import swal from "sweetalert";
import { useSelector, useDispatch } from 'react-redux'
import { addCategory } from '../../../../../../actions/inventory';
const useStyles = makeStyles(styles);
function AddCategoryTab() {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [state, setState] = React.useState({});
    const [enable, setEnable] = React.useState(true);
    // const isCategoryAdd = useSelector(state => state.inventory.isCategoryAdd)
    const handleChange = (event)=>{
      if(event.target.id =="name"){
        if(event.target.value) setEnable(false)
        else setEnable(true)
      }
      setState({...state, [event.target.id]:event.target.value})
    }
    const handleSubmitBtn = ()=>{
      dispatch(addCategory(state))
        swal({
          title: "Thank You",
          text: "Category Add Successfully",
          icon: "success",
        }).then((value) => {
          history.goBack()
        });
    }
    return (
        <>
        <div mt={2}>
            <Card >
             <Box className={classes.headerText} >Add Category</Box>
             <CardContent>
             <form noValidate id="searchForm">
                  <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        marginBottom:"1%",
                      }}
                  >
                    <Box  className={classes.customBox} >
                      <TextField
                        required
                        id="name"
                        name="Name"
                        label="Name"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={handleChange}
                        />
                    <Divider />
                   <TextField
                        multiline
                        minRows={4}                   
                        id="description"
                        name="description"
                        label="Description"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={handleChange}
                        />
                    <Divider />
                       <Button disabled={enable} variant="contained" color="primary" size="small" className={classes.customBTN} style={{marginTop:15}} onClick={handleSubmitBtn}>
                          Submit
                        </Button> 
                       <Button variant="contained" size="small" style={{marginLeft:60, marginTop:15, padding:14}}  onClick={history.goBack}>
                          Cancel
                        </Button> 
                    </Box>
                  </div>
                </form>
             </CardContent>
       </Card>
      </div>
      </>  
   )
}
export default AddCategoryTab