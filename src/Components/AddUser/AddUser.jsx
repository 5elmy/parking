import { Button, Input, Radio, RadioGroup, Spinner } from "@nextui-org/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { notify } from "../../utils/OnSuccess/notify";
import logo from "../assests/مركز التاهيل.jpg"
export function AddUser() {
  const [selected, setSelected] = useState('');
  let [Loading, setLoading] = useState(false)
console.log(selected);
  let AddUser = useFormik({
    initialValues:{
          username:"",
          password:"",
          role:"",
          block:false
    },
    onSubmit:async(values)=>{
      values.role = selected
      setLoading(true)
      console.log(values);
      await axios.post(`http://128.16.66.98:9090/api/users/AddUser`, values).then(res=>{
        console.log(res);
        if(res.status == 201){
          setLoading(false)
          notify({msg:"User Add SuccessFully",type:"success"})

        }
      }).catch(err=>{
        console.log(err);
        setLoading(false)
        notify({msg:"Add User Rejected",type:"error"})


      })
    }
  })

  return (<>
  <form action="" onSubmit={AddUser.handleSubmit}>

  <div className="bg-white flex justify-center items-center h-[100vh]">
    <div className="py-5 w-[70%]">
    <div className="flex justify-end items-center">
      <img src={logo} className="w-[90px] h-[90px]" alt="" />
    </div>
        <h1 className="text-center font-sans font-bold text-[30px]"> Add Users</h1>
        <Input onChange={AddUser.handleChange} onBlur={AddUser.handleBlur} placeholder="User Name" name="username" className="my-3" />
        <Input placeholder="Password" name="password" className="my-3" onChange={AddUser.handleChange} onBlur={AddUser.handleBlur} />
        <RadioGroup
        value={selected}
        onValueChange={setSelected}
      label="Select Role"
      orientation="horizontal"
      
    >
      <Radio value="admin">Admin</Radio>
      

      <Radio value="user">User</Radio>
    
    </RadioGroup>
        
        
        <div className="flex justify-end items-center my-3">
        <Button type="submit"  className="bg-blue-400 w-[150px] text-white">{Loading ? <Spinner className="w-[30px] h-[30px]"/> : "اضافة"}</Button>

        </div>
    </div>
  </div>
  </form>
  
  </>);
}