import axios from "axios";
import toast from "react-hot-toast";

export const approve = async (id: string) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/applications/approve`,
      JSON.stringify({
        applicationId: id,
      }),
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status == 200) {
      toast.success("Approved");
    }
  } catch (error: any) {
    if (error.response) {
      console.log(error.response);
    }
  }
};


export const reject = async (id: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/applications/reject`,
        JSON.stringify({
          applicationId: id,
        }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        toast.success("Rejected");
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };
  