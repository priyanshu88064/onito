import { Box, Button, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import { SubmitHandler, useForm,Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IFormInput {
    name:string;
    number:string;
    dobOrAge:string;
    sex:"None" | "Male"|"Female"|"Other";
    idType:"None" | "Aadhar" | "PAN";
    id:string;
}

function Personal(){

    const {control,handleSubmit} = useForm<IFormInput>({
        defaultValues:{
            name:"",
            number:"",
            dobOrAge:"",
            sex:"None",
            idType:"None",
            id:""
        }
    });

    const submit:SubmitHandler<IFormInput> = (data)=>{
        console.log(data);
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
                                <TextField size="small" placeholder="Enter Name" {...field}/>
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
                                <TextField type="tel" size="small" placeholder="Enter Mobile" {...field}/>
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
                                <TextField size="small" placeholder="DD/MM/YY or Age" {...field}/>
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
                                >
                                    <MenuItem value={"None"}>Enter Sex</MenuItem>
                                    <MenuItem value={"Male"}>Male</MenuItem>
                                    <MenuItem value={"Female"}>Female</MenuItem>
                                    <MenuItem value={"Other"}>Other</MenuItem>
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
                    Next
                </Button>
            </Box>

       </form>
    );
}

export default Personal;

{/* <Controller
    control={control}
    name="id"
    render={({field})=>(
        <TextField size="small" placeholder="Enter ID" {...field}/>
    )}
/> */}