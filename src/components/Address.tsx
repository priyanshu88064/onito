import { Autocomplete, Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm,Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { addAddressInfo, countryAdd, isSubmit } from "../slices/FormSlice";
import { useNavigate } from "react-router-dom";

interface IFormInput {
    Address?:string;
    State?:string;
    City?:string;
    Pincode?:number|null;
}

const schema = yup.object({
    Address:yup.string(),
    State:yup.string(),
    City:yup.string(),
    Pincode:yup.number().typeError("Enter a number").nullable(),
});

function Address(){

    const [country,setCountry] = useState([]);

    const fetchCountry = (input:string)=>{
        fetch(`https://restcountries.com/v3.1/name/${input}`)
            .then((response)=>response.json())
            .then(data=>{
                setCountry(data.map((element: any) => ({
                    label: element.name.common,
                  })));
            })
            .catch(error=>{
                console.log(error);
            })
    }

    const resolver = yupResolver<IFormInput>(schema);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {control,handleSubmit,formState:{errors}} = useForm<IFormInput>({
        defaultValues:{
            Address:"",
            State:"",
            City:"",
            Pincode:null
        },
        resolver
    });

    const submit:SubmitHandler<IFormInput> = (data)=>{
        dispatch(isSubmit(true));
        dispatch(addAddressInfo(data));
        navigate("/");
    }

    return (
       <form onSubmit={handleSubmit(submit)}>

            <Box
                sx={{
                    textAlign:"center",
                    marginBottom:"20px"
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Address Details
                </Typography>
            </Box>

            <Box
                sx={{
                    display:"flex",
                    justifyContent:"center"
                }}
            >
                <Box
                    sx={{
                        display:"flex",
                        flexDirection:"column"
                    }}
                >
                    <Box
                        sx={{
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"space-between"
                        }}
                    >
                        <InputLabel sx={{fontSize:"20px",mr:"20px"}}>Address</InputLabel>
                        <Controller
                            control={control}
                            name="Address"
                            render={({field})=>(
                                <TextField
                                    size="small"
                                    placeholder="Enter Address"
                                    {...field}
                                />
                            )}
                        />
                    </Box>
                    <Box
                        sx={{
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"space-between",
                            mt:"20px"
                        }}
                    >
                        <InputLabel sx={{fontSize:"20px",mr:"20px"}}>Country</InputLabel>
                        <Autocomplete
                            size="small"
                            disablePortal
                            options={country}
                            onInputChange={(e,input)=>{
                                fetchCountry(input);
                                dispatch(countryAdd(input));
                            }}
                            sx={{ width: 230 }}
                            renderInput={(params) => <TextField
                                    {...params}
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete:'new-password'
                                }}
                            />}
                        />
                    </Box>
                </Box>

                <Box
                    sx={{
                        display:"flex",
                        flexDirection:"column"
                    }}
                >
                    <Box
                        sx={{
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"space-between"
                        }}
                    >
                        <InputLabel sx={{fontSize:"20px",mr:"20px",ml:"40px"}}>State</InputLabel>
                        <Controller
                            control={control}
                            name="State"
                            render={({field})=>(
                                <TextField 
                                    size="small" 
                                    placeholder="Enter State" 
                                    {...field}
                                />
                            )}
                        />
                    </Box>
                    <Box
                        sx={{
                            display:"flex",
                            alignItems:"center",
                            // justifyContent:"space-between",
                            mt:"20px"
                        }}
                    >

                        <InputLabel sx={{fontSize:"20px",mr:"20px",ml:"40px"}}>Pincode</InputLabel>
                        <Controller
                            control={control}
                            name="Pincode"
                            render={({field})=>(
                                <TextField
                                    error={errors.Pincode?.message?true:false}
                                    helperText={errors.Pincode?.message}
                                    {...field}
                                    size="small"
                                    placeholder="Enter pincode"
                                />
                            )}
                            />
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    display:"flex",
                    mt:"20px",
                    justifyContent:"center",
                    alignItems:"center"
                }}
            >
                <InputLabel sx={{fontSize:"20px",mr:"20px",ml:"40px"}}>City</InputLabel>
                <Controller
                    control={control}
                    name="City"
                    render={({field})=>(
                        <TextField size="small" placeholder="Enter ID" {...field}/>
                    )}
                />
            </Box>
            <Box
                sx={{
                    textAlign:"center",
                    marginTop:"20px"
                }}
            >
                <Button
                    type="submit"
                    variant="contained"
                >
                    Submit
                </Button>
            </Box>
       </form>
    );
}

export default Address;