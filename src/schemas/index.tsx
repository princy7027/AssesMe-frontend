import {z} from "zod";

export const formSchema =z.object({
    email : z.string().min(2,{
        message : "Please enter email",
    }),
    password : z.string().min(2,{
        message : "Please enter Password",
    }),
});

export const regiSchema=z.object({
    name : z.string().min(2,{
        message : "Please enter Name",
    }),
    email:z.string().min(2,{
        message:"Please enter email"
    }),
    password : z.string().min(2,{
        message : "Please enter Password",
    }),

})