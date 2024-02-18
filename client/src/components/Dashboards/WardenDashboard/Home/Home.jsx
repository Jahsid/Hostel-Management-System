import { ShortCard } from "./ShortCard";
import { List } from "./List";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";


function Home() {
  const [loading, setLoading] = useState(false);
  const [studentCount, setStudentCount] = useState(0);
  const getCount = async () => {
    try {
    // setLoading(true);
      const res = await fetch("http://localhost:3000/api/student/studentCount", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      const data = await res.json();
      console.log('data',data);
      if (data.success) {
       
        setStudentCount(data.totalCount)
        setLoading(false);
      } else {
        // console.log(admission);
        data.errors.forEach((err) => {
          toast.error(
            err.msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          })
        })
        setLoading(false);

      }
    } catch (err) {
      console.log(err);
      toast.error(
        err, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      }
      )
      setLoading(false);
    }
  };
useEffect (()=>{
  getCount();
},[])
  const warden = JSON.parse(localStorage.getItem("warden"));
  const hostel = JSON.parse(localStorage.getItem("hostel"));

  const getRequests = async () => {
    const hostel = JSON.parse(localStorage.getItem("hostel"));
    console.log(hostel);
    const res = await fetch("http://localhost:3000/api/messoff/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostel: hostel._id }),
    });
    const data = await res.json();
    if (data.success) {
      data.list.map((req) => {
        req.id = req._id;
        req.from = new Date(req.leaving_date).toDateString().slice(4, 10);
        req.to = new Date(req.return_date).toDateString().slice(4, 10);
        req._id = req.student._id;
        req.student.name = req.student.name;
        req.student.room_no = req.student.room_no;
        req.status = req.status;
        req.title = `${req.student.name} [ Room: ${req.student.room_no}]`,
        req.desc = `${req.from} to ${req.to}`
      });
      setMessReqs(data.list);
    }
  };

  useEffect(()=> {
    getRequests();
  }, [])

  const [messReqs, setMessReqs] = useState([]);
  console.log(messReqs)
  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      title: "AbdulAhad [ Room: 368 ]",
      desc: "from 28-5-2023 to 29-5-2023",
    },
    {
      id: 1,
      title: "AbdulAhad [ Room: 368 ]",
      desc: "from 28-5-2023 to 29-5-2023",
    },
  ]);

  const messIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
      />
    </svg>
  );

  const suggestionIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const data = [
    {
      name: "",
      DailyComplaints: 20,
    },
    {
      name: "",
      DailyComplaints: 40,
    },
    {
      name: "",
      DailyComplaints: 15,
    },
    {
      name: "",
      DailyComplaints: 90,
    },
    {
      name: "",
      DailyComplaints: 3,
    },
    {
      name: "",
      DailyComplaints: 50,
    },
    {
      name: "",
      DailyComplaints: 20,
    },
  ];

  const graph = (
    <ResponsiveContainer
      width="100%"
      height="85%"
      className={
        "bg-neutral-950 px-7 py-5 rounded-xl shadow-xl w-full max-w-[350px] max-h-96"
      }
    >
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 50,
          bottom: 15,
          left: -25,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <Legend verticalAlign="top" height={36} />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="DailyComplaints"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  const [complaintCount, setComplaintCount] = useState(0);
  const getCountComplaints = async () => {
    try {
    // setLoading(true);
      const res = await fetch("http://localhost:3000/api/complaint/complaintCount", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      const data = await res.json();
      console.log('data',data);
      if (data.success) {
       
        setComplaintCount(data.complaintTotal)
        setLoading(false);
      } else {
        // console.log(admission);
        data.errors.forEach((err) => {
          toast.error(
            err.msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          })
        })
        setLoading(false);

      }
    } catch (err) {
      console.log(err);
      toast.error(
        err, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      }
      )
      setLoading(false);
    }
  };
useEffect (()=>{
  getCountComplaints();
},[])


const [suggestionCount, setSuggestionCount] = useState(0);
  const getCountSuggestions = async () => {
    try {
    // setLoading(true);
      const res = await fetch("http://localhost:3000/api/suggestion/suggestionCount", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      const data = await res.json();
      console.log('data',data);
      if (data.success) {
       
        setSuggestionCount(data.suggestionTotal)
        setLoading(false);
      } else {
        // console.log(admission);
        data.errors.forEach((err) => {
          toast.error(
            err.msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          })
        })
        setLoading(false);

      }
    } catch (err) {
      console.log(err);
      toast.error(
        err, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      }
      )
      setLoading(false);
    }
  };
useEffect (()=>{
  getCountSuggestions();
},[])

  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center max-h-screen overflow-x-hidden overflow-y-auto pt-[400px] sm:pt-96 md:pt-96 lg:pt-80 xl:pt-20">
      <h1 className="text-white font-bold text-5xl text-center">
        Welcome <span className="text-blue-500">{warden.name || "warden"}!</span>
      </h1>
      <h1 className="text-white text-xl">Warden, {hostel.name || "hostel"}</h1>
      <div className="flex w-full gap-5 sm:px-20 pt-5 flex-wrap items-center justify-center">
        <ShortCard title="Total Students" number={studentCount} />
        <ShortCard title="Total Complaints" number={complaintCount} />
        <ShortCard title="Total Suggestions" number={suggestionCount} />
      </div>
      <div className="w-full flex gap-5 sm:px-20 h-80 flex-wrap items-center justify-center">
        <List list={messReqs} title="mess" icon={messIcon} />
        {graph}
        {/* <List list={suggestions} title="suggestions" icon={suggestionIcon} /> */}
      </div>
    </div>
  );
}

export default Home;