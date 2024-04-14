import { Button, Input, Spinner } from "@nextui-org/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { notify } from "../../utils/OnSuccess/notify";

export function FormForSlotsNumber({ ele }) {

  let [loading, setLoading] = useState(false)

  let updateSlotsNumber = useFormik({
    initialValues: {
      slots_number: 0

    },
    onSubmit: async (values) => {
      console.log(
        { values }
      );
        setLoading(true)
      await axios.put(`http://128.16.66.98:9090/api/Configs/slot-num`,values).then(res=>{
        console.log({res});
        setLoading(false)
        notify({msg:"update Slots Number Successfully", type:"success"})


      }).catch(err=>{
        console.log(err);
        setLoading(false)

      })
    }
  })

  return (
    <>


      <form onSubmit={updateSlotsNumber.handleSubmit} className="flex justify-between items-center  gap-5 w-[90%] my-3">

        <Input name="slots_number" defaultValue={ele.slots_number} placeholder="Slots Number"
          onChange={updateSlotsNumber.handleChange} onBlur={updateSlotsNumber.handleBlur}
          className="" />

        <Button type="submit" className="bg-[#09c] text-white">
        {loading?  <Spinner color="current" /> :"Save"}
        </Button>


      </form>


    </>
  );
}