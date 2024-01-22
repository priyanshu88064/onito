import { Box, Button, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import { SubmitHandler, useForm,Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { addPersonalInfo, isSubmit } from "../slices/FormSlice";
import { useNavigate } from "react-router-dom";

const phoneRegex = /(^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9})$/;

const dateOrAgeValidator = (data: string | undefined)=>{
    
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    if(data === undefined){
        return true;
    }

    if (dateRegex.test(data)) {
        const date = new Date(data);
        if (!isNaN(date.getTime())) {
            return true;
        }
    }

    const age = parseInt(data);
    if (!isNaN(age) && age > 0 && /^\d+$/.test(data)) {
      return true;
    }

    return false;
}

const aadharPanValidator = (data:string|undefined)=>{
    
    if(data === undefined || data === "" || data.length===0){
        console.log("here")
        return true;
    }

    const aadharRegex = /^[2-9]\d{11}$/;
    const PANregex = /^[a-zA-Z0-9]{10}$/;

    if(aadharRegex.test(data) || PANregex.test(data)){
        return true;
    }
    return false;
}

interface IFormInput {
    name:string;
    number?:string;
    dobOrAge:string;
    sex:string;
    idType?:string;
    id?:string;
}

const schema = yup.object({
    name:yup.string().min(3,"Minimum length should be 3").required("Name is Required"),
    number:yup.string().matches(phoneRegex,"Enter a valid indian number"),
    dobOrAge:yup.string().test('dateOrAge','Enter a valid date or age',dateOrAgeValidator).required(),
    sex:yup.string().matches(/(Male|Female)/).required(),
    idType:yup.string().matches(/(Aadhar|PAN)?/),
    id:yup.string().test('id','Enter valid aadhar or PAN',aadharPanValidator)
});

function Personal(){

    const {control,handleSubmit,formState:{errors}} = useForm<IFormInput>({
        defaultValues:{
            name:"",
            number:"",
            dobOrAge:"",
            sex:"None",
            idType:"None",
            id:""
        },
        resolver:yupResolver(schema)
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit:SubmitHandler<IFormInput> = (data)=>{
        dispatch(isSubmit(false));
        dispatch(addPersonalInfo(data));
        navigate("/address");
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
                    Personal Details
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
                        <InputLabel sx={{fontSize:"20px",mr:"20px"}}>Name</InputLabel>
                        <Controller
                            control={control}
                            name="name"
                            render={({field})=>(
                                <TextField
                                    size="small"
                                    placeholder="Enter Name"
                                    {...field} 
                                    error={errors.name?.message?true:false}
                                    helperText={errors.name?.message}    
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
                        <InputLabel sx={{fontSize:"20px",mr:"20px"}}>Mobile</InputLabel>
                        <Controller
                            control={control}
                            name="number"
                            render={({field})=>(
                                <TextField 
                                    size="small" 
                                    placeholder="Enter Mobile" 
                                    {...field}
                                    error={errors.number?.message?true:false}
                                    helperText={errors.number?.message}
                                />
                            )}
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
                        <InputLabel sx={{fontSize:"20px",mr:"20px",ml:"40px"}}>Date of Birth or Age</InputLabel>
                        <Controller
                            control={control}
                            name="dobOrAge"
                            render={({field})=>(
                                <TextField 
                                    size="small" 
                                    placeholder="DD/MM/YY or Age" 
                                    {...field}
                                    error={errors.dobOrAge?.message?true:false}
                                    helperText={errors.dobOrAge?.message}
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

                        <InputLabel sx={{fontSize:"20px",mr:"20px",ml:"40px"}}>Sex</InputLabel>
                        <Controller
                            control={control}
                            name="sex"
                            render={({field})=>(
                                <Select
                                    size="small"
                                    {...field}
                                    error={errors.sex?.message?true:false}
                                >
                                    <MenuItem value={"None"}>Enter Sex</MenuItem>
                                    <MenuItem value={"Male"}>Male</MenuItem>
                                    <MenuItem value={"Female"}>Female</MenuItem>
                                </Select>
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
                <InputLabel sx={{fontSize:"20px",mr:"20px",ml:"40px"}}>Govt Issued ID</InputLabel>
                <Controller
                    control={control}
                    name="idType"
                    render={({field})=>(
                        <Select
                            size="small"
                            {...field}
                            error={errors.idType?.message?true:false}
                        >
                            <MenuItem value={"None"}>ID Type</MenuItem>
                            <MenuItem value={"Aadhar"}>Aadhar</MenuItem>
                            <MenuItem value={"PAN"}>PAN</MenuItem>
                        </Select>
                    )}
                />
                <Controller
                    control={control}
                    name="id"
                    render={({field})=>(
                        <TextField 
                        size="small" 
                        placeholder="Enter ID" 
                        {...field}
                        error={errors.id?.message?true:false}
                        helperText={errors.id?.message}    
                    />
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
                    Next
                </Button>
            </Box>

       </form>
    );
}

export default Personal;