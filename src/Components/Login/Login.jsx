import { Button, Input, Spinner } from '@nextui-org/react';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { notify } from '../../utils/OnSuccess/notify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase, increaseBy10 } from '../../Redux/Slice/CounterSlice';
// import { decrease, increase, increaseBy10 } from '../../Redux/Slice/CounterSlice';
import logo from "../assests/مركز التاهيل.jpg"
export function Login() {
  let navigate = useNavigate()
  let [Loading, setLoading] = useState(false)
  let { count, userName } = useSelector(
    (state) => state.counter
  )
  let dispatch = useDispatch()

  let validate = (values) => {
    let errors = {}
    if (!values.username) {
      errors.username = 'userName is required ';
    } else if (!/^[A-Z0-9._%+-]{3,30}$/i.test(values.username)) {
      errors.username = 'invalid userName';
    }
  
    if (!values.password) {
      errors.password = 'password is required ';
    } else if (!/^[a-zA-Z0-9@]{3,30}$/i.test(values.password)) {
      errors.password = 'invalid password ';
    }
    return errors
  
  }

  let login = useFormik({
    initialValues: {
      username: "",
      password: "",
      role: "",
      block: false
    },validate , 
    onSubmit: async (values) => {
      console.log(values);
      setLoading(true)


      await axios.post(`http://128.16.66.98:9090/
      api/users/login`, values).then(res => {
        console.log(res);
        console.log(res.data.id);
        localStorage.setItem("userId", res.data.id)

        if (res.status === 200) {
          if (res.data.role === "user") {
            navigate("/user/type")
            notify({ msg: "تم تسجيل الدخول بنجاح ", type: "success" })
            localStorage.setItem("userId", res.data.id)
            setLoading(false)
          }
          if (res.data.role === "admin") {
            navigate("/addUser")
            notify({ msg: "Success Login  As  Admin ", type: "success" })
            localStorage.setItem("userId", res.data.id)
            setLoading(false)

          }
        }

      }).catch(err => {
        console.log(err.response);
        setLoading(false)
        notify({msg:err.response.data , type:"error"})

      })
    }
  })

  return (<>
    <form action="" onSubmit={login.handleSubmit}>

      <div className='bg-[#e2e8f0]  flex justify-center items-center h-[100vh]'>

        <div className='bg-[#fff] shadow-lg rounded-[20px] w-[60%]  '>
         <div className='flex   justify-end items-center'>


<div>

<div className='flex justify-center items-center pt-5 px-5'>

          
<img src={logo} className='w-[90px] h-[90px]' />

</div>
<div className='flex justify-center flex-col items-center'>

<p className='px-5'>مركز الطب الطبيعي والتأهيلي </p>
<p className='px-1'>وعلاج الروماتيزم بالقوات المسلحة</p>


</div>

</div>
         </div>
          <div className='  flex justify-center items-center '>


            <div className=''>

              <h1 className='text-center font-[700] text-[20px]'> تسجيل دخول</h1>
              <div>
                <Input className='my-3 w-[400px]' onChange={login.handleChange} name='username' placeholder='userName' />
          {login.errors?.username && login.touched.username ? <div className=" mx-auto text-center bg-green-500 p-3 rounded-[10px] text-white my-3">{login.errors?.username}</div> : null}

                <Input className='my-3 w-[400px]' onChange={login.handleChange} name='password' placeholder='password' type='password' />
                {login.errors?.password && login.touched.password ? <div className=" mx-auto text-center bg-green-500 p-3 rounded-[10px] text-white my-3">{login.errors?.password}</div> : null}
           <div className=' w-full flex justify-center items-center py-5'> <div>
                  <Button disabled={!(login.isValid && login.dirty)} type="submit" className={`${!(login.isValid && login.dirty)?"w-[150px] cursor-not-allowed bg-[#60a5fa] text-white":"w-[150px] bg-[#60a5fa] text-white"}`}>{Loading ? <Spinner color='current' className="w-[30px] h-[30px]" /> : "تسجيل"}</Button>
                </div></div>

              </div>
            </div>


          </div>
        </div>

        {/* <div className=' bg-[#fff] shadow-lg rounded-[20px] w-[60%] h-[60%] flex justify-center items-center '>
          

          <div className=''>

            <h1 className='text-center font-[700] text-[20px]'> تسجيل دخول</h1>
            <div>
              <Input className='my-3 w-[400px]' onChange={login.handleChange} name='username' placeholder='userName' />
              <Input className='my-3 w-[400px]' onChange={login.handleChange} name='password' placeholder='password' type='password' />

              <div className=' w-full flex justify-center items-center '> <div>
                <Button type="submit" className='w-[150px] bg-[#60a5fa] text-white'>{Loading?  <Spinner color='current' className="w-[30px] h-[30px]" />:"تسجيل"}</Button>
              </div></div>

            </div>
          </div>


        </div> */}

      </div>
    </form>
  </>);
}


