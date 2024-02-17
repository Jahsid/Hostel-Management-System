import { useState, useEffect } from "react";
import { Input } from "./Input";
import { Button } from "../Common/PrimaryButton";
import { Loader } from "../Common/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

function AdminRegisterStudent() {
  const registerStudent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let student = {
        name: name,
        admission_no: admission,
        room_no: selectedRoom,
        batch: batch,
        dept: dept,
        course: course,
        email: email,
        father_name: fatherName,
        contact: contact,
        address: address,
        dob: dob,
        aadhar_card: aadhar_card,
        hostel: hostel,
        password: password,
      };
      const res = await fetch(
        "http://localhost:3000/api/student/register-student",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(student),
        }
      );
      console.log(student);
      const data = await res.json();

      if (data.success) {
        toast.success(
          "Student " + data.student.name + " Registered Successfully!",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        setAdmission("");
        setName("");
        setRoomNo("");
        setBatch("");
        setDept("");
        setCourse("");
        setEmail("");
        setFatherName("");
        setContact("");
        setAddress("");
        setDob("");
        setAadhar_card("");
        setPassword("");
        setLoading(false);
      } else {
        // console.log(admission);
        data.errors.forEach((err) => {
          toast.error(err.msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        });
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(err, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setLoading(false);
    }
  };

  const hostel = JSON.parse(localStorage.getItem("hostel")).name;
  const [admission, setAdmission] = useState();
  const [name, setName] = useState();
  const [room_no, setRoomNo] = useState();
  const [batch, setBatch] = useState();
  const [dept, setDept] = useState();
  const [course, setCourse] = useState();
  const [email, setEmail] = useState();
  const [fatherName, setFatherName] = useState();
  const [contact, setContact] = useState();
  const [address, setAddress] = useState();
  const [dob, setDob] = useState(null);
  const [aadhar_card, setAadhar_card] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [isValidAge, setIsValidAge] = useState(true);

  const [occupancy, setOccupancy] = useState(false);

  const handleOccupancyChange = (e) => {
    // Update the occupancy state when the input changes
    setOccupancy(e.target.value === "true");
  };

  const handleRoomNoChange = (e) => {
    console.log(e.target);
    setSelectedRoom(e.target.value);
  };

  // Add these states at the beginning of your component
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/room/getAvailableRoom"); // Adjust the endpoint
        const data = await response.json();
          setAvailableRooms(data);
          setSelectedRoom(data[0].roomNumber)
      } catch (error) {
        console.error("Error fetching available rooms:", error);
      }
    };

    fetchAvailableRooms();
  }, []);

  let min = new Date();

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };
  const handleDobChange = (newDob) => {
    const selectedDate = new Date(newDob.target.value);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      setIsValidAge(false);
      return;
    }

    const age = calculateAge(selectedDate);
    if (age < 12 || age > 40) {
      setIsValidAge(false);
    } else {
      const parsedDate = moment(selectedDate, "DD/MM/YYYY");

      // Format the date to "YYYY-MM-DD"
      const formattedDate = parsedDate.format("YYYY-MM-DD");
      setIsValidAge(true);
      setDob(formattedDate);
    }

    return { dob, isValidAge, handleDobChange };
  };
  return (
    <div className="w-full max-h-screen pt-20 flex flex-col items-center justify-center">
      <h1 className="text-white font-bold text-5xl mt-10 mb-5">
        Register Student
      </h1>
      <div className="md:w-[60vw] w-full p-10 bg-neutral-950 rounded-lg shadow-xl mb-10 overflow-auto">
        <form
          method="post"
          onSubmit={registerStudent}
          className="flex flex-col gap-3"
        >
          <div className="flex gap-5 flex-wrap justify-center md:w-full sw-[100vw]">
            <Input
              field={{
                name: "name",
                placeholder: "Student Name",
                type: "text",
                req: true,
                value: name,
                onChange: (e) => setName(e.target.value),
              }}
            />
            <Input
              field={{
                name: "admission",
                placeholder: "6 digit",
                type: "number",
                req: true,
                value: admission,
                onChange: (e) => setAdmission(e.target.value),
              }}
            />
            <Input
              field={{
                name: "dob",
                placeholder: "Student dob",
                type: "date",
                req: true,
                value: dob,
                onChange: handleDobChange,
                min: { min },
              }}
            />{" "}
            {!isValidAge && (
              <p style={{ color: "red" }}>
                Error: Age should be between 12 and 40.
              </p>
            )}
          </div>
          <div className="flex gap-5 w-full flex-wrap justify-center">
            <Input
              field={{
                name: "email",
                placeholder: "Student Email",
                type: "email",
                req: true,
                value: email,
                onChange: (e) => setEmail(e.target.value),
              }}
            />
            <Input
              field={{
                name: "contact",
                placeholder: "Student Contact",
                type: "text",
                req: true,
                value: contact,
                onChange: (e) => setContact(e.target.value),
              }}
            />
            <Input
              field={{
                name: "father name",
                placeholder: "Student's Father Name",
                type: "text",
                req: true,
                value: fatherName,
                onChange: (e) => setFatherName(e.target.value),
              }}
            />
          </div>

          <div className="flex flex-wrap gap-5 justify-center">
            <div>
              <label
                htmlFor="roomDropdown"
                className="block mb-2 text-sm font-medium text-white"
              >
                Select Room:
              </label>
              <select
                id="roomDropdown"
                name="room"
                className="bg-neutral-700 border-neutral-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 p-2.5 rounded-lg"
                value={selectedRoom}
                onChange={(e) => handleRoomNoChange(e)}
              >
                <option disabled>
                  -- Select Room --
                </option>
                {availableRooms.map((room) => (
                  <option key={room.roomNumber} value={room.roomNumber}>
                    {room.roomNumber}
                  </option>
                ))}
              </select>
            </div>
            <Input
              field={{
                name: "hostel",
                placeholder: "Student Hostel",
                type: "text",
                req: true,
                value: hostel,
                disabled: true,
                onChange: () => {}, 
              }}
            />
            <Input
              field={{
                name: "dept",
                placeholder: "Student Department",
                type: "text",
                req: true,
                value: dept,
                onChange: (e) => setDept(e.target.value),
              }}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            <Input
              field={{
                name: "course",
                placeholder: "Student Course",
                type: "text",
                req: true,
                value: course,
                onChange: (e) => setCourse(e.target.value),
              }}
            />
            <Input
              field={{
                name: "batch",
                placeholder: "Student Batch",
                type: "number",
                req: true,
                value: batch,
                onChange: (e) => setBatch(e.target.value),
              }}
            />
            <Input
              field={{
                name: "aadhar card",
                placeholder: "12 digit",
                type: "text",
                req: true,
                value: aadhar_card,
                onChange: (e) => setAadhar_card(e.target.value),
              }}
            />
          </div>
          <div className="mx-12">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-white"
            >
              Address
            </label>
            <textarea
              name="address"
              placeholder="Student Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border flex-grow sm:text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="mx-12">
            <Input
              field={{
                name: "password",
                placeholder: "Student Password",
                type: "password",
                req: true,
                value: password,
                onChange: (e) => setPassword(e.target.value),
              }}
            />
          </div>
          <div className="mt-5">
            <Button>
              {loading ? (
                <>
                  <Loader /> Registering...
                </>
              ) : (
                <span>Register Student</span>
              )}
            </Button>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
export default AdminRegisterStudent;
